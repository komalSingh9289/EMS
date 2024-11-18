import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); // Set user state from localStorage
    } else {
      setUser(null);
    }
    setLoading(false);
    setIsInitialized(true);
  }, [setUser, setLoading]);

  if (loading || !isInitialized) {
    return <div className="spinner">Loading...</div>; // Add a loader or spinner
  }

  if (!user) {
    // Redirect to login with the current location as state
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
