import React from 'react';
import { Link } from 'react-router-dom';

function DashboardSidebar() {
  return (
    <div className="bg-[#F37116] min-h-screen">
      <div className="w-64 p-6">
        <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="block py-3 px-5 text-white bg-opacity-0 hover:bg-white hover:bg-opacity-20 rounded transition duration-300"
            >
              Dashboard Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/food"
              className="block py-3 px-5 text-white bg-opacity-0 hover:bg-white hover:bg-opacity-20 rounded transition duration-300"
            >
              Manage Food-Items
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/insertfood"
              className="block py-3 px-5 text-white bg-opacity-0 hover:bg-white hover:bg-opacity-20 rounded transition duration-300"
            >
              Insert Food
            </Link>
          </li>
          <li>
            <Link
              to="/ordertable"
              className="block py-3 px-5 text-white bg-opacity-0 hover:bg-white hover:bg-opacity-20 rounded transition duration-300"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link to="/logout-admin" className="block py-2 px-4 hover:bg-gray-300 rounded">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardSidebar;
