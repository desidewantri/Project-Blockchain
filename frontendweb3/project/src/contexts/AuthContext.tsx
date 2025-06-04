import React, { createContext, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  userType: string;
  isAuthenticated: boolean;
  login: (userData: User, type: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userType: '',
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData: User, type: string) => {
    setUser(userData);
    setUserType(type);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setUserType('');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      userType,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};