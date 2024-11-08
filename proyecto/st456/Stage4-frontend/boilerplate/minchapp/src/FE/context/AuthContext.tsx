import React, { createContext, useState, useContext, useEffect } from 'react';
import { CognitoToken } from '../types';

interface AuthContextType {
  token: CognitoToken | null;
  setToken: (token: CognitoToken | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<CognitoToken | null>(() => {
    const savedToken = localStorage.getItem('cognitoToken');
    return savedToken ? JSON.parse(savedToken) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('cognitoToken', JSON.stringify(token));
    } else {
      localStorage.removeItem('cognitoToken');
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('cognitoToken');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};