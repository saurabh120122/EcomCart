import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../api'; // Import your main axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get initial state from localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false); // For register/login
  const [error, setError] = useState(null);

  // Effect to set token in localStorage and axios headers
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      // This is the CRITICAL part:
      // Set the auth token on ALL future axios requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token, user]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/users/login', { email, password });
      setUser(data.data);
      setToken(data.data.token);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => { // <-- 1. Add name
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/users/register', { name, email, password }); // <-- 2. Send name
      setUser(data.data);
      setToken(data.data.token);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};