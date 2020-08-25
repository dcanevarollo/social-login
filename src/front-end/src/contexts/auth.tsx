import React, { createContext, useState, useContext, useEffect } from 'react';

import User from '../models/user';
import api from '../services/api';

interface Auth {
  signed: boolean;
  user: User | null;
  signIn(token: string, type: 'google' | 'facebook'): Promise<void>;
  signOut(): Promise<void>;
}

interface Token {
  type: string;
  token: string;
  expires_at: string;
}

const AuthContext = createContext<Auth>({} as Auth);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const accessKey = '@social-login/access-token';
  const userKey = '@social-login/auth-user';

  useEffect(() => {
    const tokenStored = localStorage.getItem(accessKey);
    const userStored = localStorage.getItem(userKey);

    if (tokenStored && userStored) {
      const tokenObj: Token = JSON.parse(tokenStored);
      api.defaults.headers.Authorization = `Bearer ${tokenObj.token}`;

      const userObj: User = JSON.parse(userStored);
      setUser(userObj);
    } else {
      // Just to be sure...
      localStorage.clear();
    }
  }, []);

  async function signIn(token: string, type: 'google' | 'facebook') {
    try {
      const response = await api.post<{ token: Token; user: User }>(
        'auth/login',
        { token, type }
      );

      const { token: tokenObj, user: resUser } = response.data;

      api.defaults.headers.Authorization = `Bearer ${tokenObj.token}`;

      setUser(resUser);

      localStorage.setItem(accessKey, JSON.stringify(tokenObj));
      localStorage.setItem(userKey, JSON.stringify(resUser));
    } catch (error) {
      console.error(error.response?.data);
    }
  }

  async function signOut() {
    try {
      await api.delete('auth/logout');
    } catch (error) {
      console.error(error.response?.data);
    } finally {
      setUser(null);

      localStorage.clear();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
