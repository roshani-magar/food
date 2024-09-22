import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button'; // Assuming you have a Button component

axios.defaults.withCredentials = true;

const BinarySearchMenu = () => {
  const [data, setData] = useState([]);  // Food items data
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');  // User input for search

  // Function to search food items using binary search PHP API
  const searchItems = () => {
    axios
      .get('http://localhost/php-rest-api/api-binarysearch.php', {
        params: {
          query: searchQuery,  // Pass search query to the API
        },
      })
      .then((response) => {
        setData(Array.isArray(response.data) ? response.data : []);  // Ensure it's an array
        if (response.data.length === 0) {
          toast.info('No food items found for the search query.');
        }
      })
      .catch((err) => {
        toast.error('Error performing search: ' + err.message);
        setData([]);  // Set empty array on error
      });
  };

  // If there is an error, display it
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* Search Bar */}
      <div className="mx-[100px] mb-[30px] bg-slate-300 p-4">
        <div className="filters flex gap-4 align-middle">
          <label htmlFor="search" className="content-center font-semibold">Search Food</label>
          <input
            className="p-2"
            type="text"
            placeholder="Search food by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button text="Search" onClick={searchItems}>Search</Button>
        </div>
      </div>

      {/* Food Items Display */}
      <div className="grid mx-[100px] gap-4 grid-cols-2">
        {data.length > 0 ? (
          data.map((food) => (
            <div key={food.id} className="bg-black text-white rounded-lg">
              <img
                className="rounded-lg"
                src={`http://localhost/php-rest-api/${food.image_name}`}  // Update the correct image path
                alt={food.title}
              />
              <div className="flex flex-col gap-3 font-medium p-10">
                <Link to={`/food/${food.id}`} className="text-[36px] hover:underline">
                  {food.title}
                </Link>
                <p className="text-[18px]">{food.description}</p>
                <div className="flex flex-row justify-between">
                  <h2 className="text-[22px] font-semibold text-orange">{food.price}</h2>
                  <Button text="Add to Cart" onClick={() => addToCart(food)} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default BinarySearchMenu;
