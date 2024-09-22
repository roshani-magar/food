import React, { useState, useEffect } from 'react';

import DashboardSidebar from './components/dashboardSidebar';
import DashboardFoodList from './components/dashboardFoodList';

const FoodManagement = () => {

  return (
    <div className="flex">
      <DashboardSidebar />
      <div>

      
       <DashboardFoodList />

      
      </div>

    </div>
  );
};

export default FoodManagement;
