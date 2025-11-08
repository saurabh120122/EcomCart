import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // If user is logged in, show the component (via <Outlet />)
  // Otherwise, redirect them to the /login page
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;