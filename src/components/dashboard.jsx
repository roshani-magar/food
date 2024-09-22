import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardSidebar from './dashboardSidebar';
import BarChart from './barchart';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate= useNavigate();
  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // Decode token (assuming it's Base64-encoded)
        const userInfo = JSON.parse(atob(token));

        // Check if user is an admin
        if (userInfo.type !== 'admin') {
          navigate('/login-admin'); // Redirect if not an admin
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login-admin'); // Redirect on error
      }
    } else {
      navigate('/login-admin'); // Redirect if no token found
    }
  }, [navigate]);


  const [summaryData, setSummaryData] = useState({
    total_users: null,
    total_orders: null,
    total_food_items: null
  });

  useEffect(() => {
    axios.get('http://localhost/php-rest-api/dashboard-summary.php')
      .then(response => {
        console.log('API Response:', response.data); // Log response for debugging
        if (response.data) {
          setSummaryData(response.data);
        } else {
          console.error('No data returned from the API');
        }
      })
      .catch(error => {
        console.error('Error fetching summary data:', error);
      });
  }, []);

  return (
    <div className="flex h-screen gap-20">
      {/* Left Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content Area */}
      <div className="w-3/5 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to the Dashboard</h1>
        
        {/* Summary Boxes and BarChart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-orange p-4 text-white rounded shadow">
            <p className="text-2xl font-bold">{summaryData.total_users !== null ? summaryData.total_users : 'Loading...'}</p>
            <h2 className="text-sm">Total Users</h2>
          </div>
          <div className="bg-green-500 p-4 text-white rounded shadow">
            <p className="text-2xl font-bold">{summaryData.total_orders !== null ? summaryData.total_orders : 'Loading...'}</p>
            <h2 className="text-sm font-bold">Total Orders</h2>
          </div>
          <div className="bg-blue-500 p-4 text-white rounded shadow">
            <p className="text-2xl font-bold">{summaryData.total_food_items !== null ? summaryData.total_food_items : 'Loading...'}</p>
            <h2 className="text-sm font-bold">Total Food Items</h2>
          </div>
        </div>

        {/* BarChart Component */}
        <div className="bg-white p-4 rounded shadow">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
