import React, { createContext, useContext } from 'react';
import { useAuthStore } from './store';
import { api } from './data/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, token, setUser, setToken, logout } = useAuthStore();

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, username, password, firstName, lastName) => {
    try {
      const response = await api.register(email, username, password, firstName, lastName);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.is_admin || false;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
