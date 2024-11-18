import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailData, setEmailData] = useState(null);
  const [delayData, setDelayData] = useState(null);
  const [leadData, setLeadData]= useState(null);
  // Load user data on component mount (if token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios
        .get('http://localhost:5000/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('authToken'); // Invalid token
        });
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = response.data;
  
      // Store token and user data in local storage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user)); // Save user data as a string
  

      setUser(user);
  
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };
  

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        logout,
        loading,
        setLoading,
        emailData,
        delayData,
        setEmailData,
        setDelayData,
        leadData,
        setLeadData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
