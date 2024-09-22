import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost/php-rest-api/api-fetch-all.php');
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
        toast.error('Failed to fetch food items');
      }
    };

    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('http://localhost/php-rest-api/api-delete.php', { id });
      if (response.data.status) {
        toast.success('Food item deleted successfully');
        setFoods(foods.filter(food => food.id !== id));
      } else {
        toast.error(response.data.message || 'Failed to delete food item');
      }
    } catch (error) {
      console.error('Error deleting food item:', error);
      toast.error('Failed to delete food item');
    }
  };

  return (
    <div className='min-h-screen width-[100%] bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-5xl'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Food Items</h2>
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>ID</th>
              <th className='border px-4 py-2'>Name</th>
              <th className='border px-4 py-2'>Description</th>
              <th className='border px-4 py-2'>Price</th>
              
              <th className='border px-4 py-2'>Ingredients</th>
              <th className='border px-4 py-2'>Image</th>
              <th className='border px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map(food => (
              <tr key={food.id}>
                <td className='border px-4 py-2'>{food.id}</td>
                <td className='border px-4 py-2'>{food.title}</td>
                <td className='border px-4 py-2'>{food.description}</td>
                <td className='border px-4 py-2'>{food.price}</td>
                
                <td className='border px-4 py-2'>{food.ingredients}</td>
                <td className='border px-4 py-2'>
                  {food.image_name ? (
                    <img
                      src={`http://localhost/php-rest-api/${food.image_name}`}
                      alt={food.title}
                      className='w-24 h-16 object-cover'
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className='border px-4 py-2'>
                  <Link to={`/dashboard/editfood/${food.id}`} className='text-blue-500 hover:underline mr-4'>Edit</Link>
                  <button
                    onClick={() => handleDelete(food.id)}
                    className='text-red-500 hover:underline'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodList;
