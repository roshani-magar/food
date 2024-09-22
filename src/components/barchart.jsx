import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BarChart = () => {
  const [data, setData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    axios.get('http://localhost/php-rest-api/get-order-data.php') // Update the URL
      .then(response => {
        const fetchedData = response.data;
        setData(fetchedData);

        // Find the maximum value for scaling the bars
        const max = Math.max(...fetchedData.map(item => item.total_orders));
        setMaxValue(max);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Generate Y-axis labels dynamically
  const yAxisLabels = Array.from({ length: 5 }, (_, i) => Math.ceil((maxValue / 4) * i)).reverse();

  return (
    <div className="max-w-5xl mx-10 py-10 px-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-8 underline">Orders Bar Chart</h2>
      <div className="flex">
        
        <div className="flex flex-col justify-between h-80 pr-4">
          {yAxisLabels.map((label, index) => (
            <div key={index} className="text-gray-700">{label}</div>
          ))}
        </div>

      
        <div className="flex  items-end h-80 space-x-4 w-full">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ height: '100%', justifyContent: 'flex-end' }}
            >
              
              <div
                className="bg-green-400 w-10 rounded-t-lg transition-all duration-300 ease-in-out hover:bg-green-600"
                style={{ height: `${(item.total_orders / maxValue) * 100}%` }}
              >
               
                <span className="block opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs font-semibold rounded py-1 px-2 absolute -top-10 transform -translate-y-full">
                  {item.total_orders} Orders
                </span>
              </div>
             
              <div className="mt-4 text-sm text-gray-700 font-medium">{item.item_name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">Total orders for each item</div>
    </div>
  );
};

export default BarChart;
