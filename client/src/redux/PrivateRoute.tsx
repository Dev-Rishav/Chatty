import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from './store'; // Adjust the path based on where your store file is

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
