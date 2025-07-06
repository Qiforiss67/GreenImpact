import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { state } = useApp();
  
  if (state.loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  return state.user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;