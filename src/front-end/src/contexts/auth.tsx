import React, { createContext, useState, useContext } from 'react';

import User from '../models/user';
import api from '../services/api';

interface Auth {
  signed: boolean;
  user: User | null;
  signIn(tokenId: string): Promise<void>;
  signOut(): Promise<void>;
};

interface Token {
  type: string;
  token: string;
  expires_at: string;
};

const AuthContext = createContext<Auth>({} as Auth);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const accessKey = '@social-login/access-token';

  async function signIn(tokenId: string) {
    try {
      const response = await api.post<{ token: Token, user: User }>(
        'auth/login', 
        { token: tokenId }
      );
  
      const { token, user } = response.data;
  
      api.defaults.headers.Authorization = `Bearer ${token.token}`;
  
      setUser(user);
  
      localStorage.setItem(accessKey, JSON.stringify(token));
    } catch (error) {
      console.error(error);
    }
  }

  async function signOut() {
    try {
      await api.delete('auth/logout');
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);

      localStorage.removeItem(accessKey);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      signed: !!user,
      user,
      signIn,
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
