import React, { createContext, useState, useContext } from 'react';

import User from '../models/user';

import api from '../services/api';

interface Auth {
  signed: boolean;
  user: User | null;
  signIn(): Promise<void>;
};

interface Token {
  type: string;
  token: string;
  expires_at: string;
};

const AuthContext = createContext<Auth>({} as Auth);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  async function signIn() {
    const response = await api.get<{ token: Token, user: User }>('login');

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token.token}`;

    setUser(user);

    localStorage.setItem('@social-login/access-token', JSON.stringify(token));
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user: null, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
