// src/components/LogoutButton.jsx
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogoutAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost/php-rest-api/logout-admin.php'); // Adjust URL as needed
      // Clear localStorage
      localStorage.removeItem('authToken');

      toast.success('Logged out successfully');
      navigate('/'); // Redirect to login page
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  useEffect(() => {
    handleLogout();
  }, []); // Empty dependency array means this will only run once, on mount

  return null; // No UI to render
};

export default LogoutAdmin;