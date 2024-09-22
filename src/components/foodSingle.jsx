import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

const FoodSingle = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const fetchFood = async () => {
    try {
      const response = await axios.get('http://localhost/php-rest-api/api-fetch-single.php', {
        params: { id: id },
      });

      if (response.data.status === false) {
        setError(response.data.message);
      } else {
        setFood(response.data.data);
        setError(null);
      }
    } catch (err) {
      setError('Error fetching data: ' + err.message);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('http://localhost/php-rest-api/api-recommendations.php', {
        params: { foodId: id },
      });

      if (response.data.status === true) {
        setRecommendations(response.data.data);
      }
    } catch (error) {
      toast.error('Error fetching recommendations: ' + error.message);
    }
  };

  useEffect(() => {
    fetchFood();
    fetchRecommendations();
  }, [id]);

  const addToCart = async (foodItem) => {
    try {
      const response = await axios.post('http://localhost/php-rest-api/cart.php?action=add', {
        id: foodItem.id,
        name: foodItem.title,
        price: foodItem.price
      });

      if (response.data.status === 'success') {
        toast.success(`${foodItem.title} added to cart successfully!`);
      } else {
        toast.error('Failed to add item to cart.');
      }
    } catch (error) {
      toast.error('Error adding to cart: ' + error.message);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!food) {
    return <div className="text-center">Loading...</div>;
  }
  
  console.log(`Image URL: http://localhost/php-rest-api/${food.image_name}`);

  return (
    <>
      <div className="max-w-4xl mx-auto my-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="flex">
          <div className="w-1/2">
            <img
              className="w-full h-40 object-cover rounded-lg" // Set height and object-fit
              src={`http://localhost/php-rest-api/${food.image_name}`}
              alt={food.title}
            />
          </div>
          
          <div className="w-1/2 pl-4">
            <h2 className="text-3xl font-bold mb-2">{food.title}</h2>
            <p className="text-lg mb-2">{food.description}</p>
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">Rs.{food.price}</h2>
            <Button text="Add to Cart" onClick={() => addToCart(food)} />
          </div>
        </div>
      </div>

      <div className="mx-[100px] my-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
        <div className='grid gap-4 grid-cols-3'>
          {recommendations.length > 0 ? (
            recommendations.slice(0, 3).map((food) => (
              <div key={food.id} className='bg-black text-white rounded-lg'>
                <img
                  className='w-full h-64 object-cover rounded-lg' // Set height and object-fit
                  src={`http://localhost/php-rest-api/${food.image_name}`}
                  alt={food.title}
                />
                <div className='flex flex-col gap-3 font-medium p-10'>
                  <h2 className="text-[24px]">{food.title}</h2>
                  <p className='text-[14px]'>{food.description}</p>
                  <div className='flex flex-row justify-between'>
                    <h2 className='text-[18px] font-semibold text-orange'>Rs.{food.price}</h2>
                    <Button text="Add to Cart" onClick={() => addToCart(food)} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default FoodSingle;
