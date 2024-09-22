import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const EditFood = () => {
  const [food, setFood] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    ingredients: '',
    image_name: '',
  });
  const [image, setImage] = useState(null);
  const { id } = useParams(); // Get the food item ID from URL params
  const navigate = useNavigate(); // To navigate after saving

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost/php-rest-api/api-fetch-single.php?id=${id}`);
        setFood(response.data);
      } catch (error) {
        console.error('Error fetching food item:', error);
        toast.error('Failed to fetch food item details');
      }
    };

    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', food.title);
    formData.append('description', food.description);
    formData.append('price', food.price);
    formData.append('category', food.category);
    formData.append('ingredients', food.ingredients);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost/php-rest-api/api-update.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.status) {
        toast.success('Food item updated successfully');
        navigate('/food-list'); // Navigate to the food list page
      } else {
        toast.error(response.data.message || 'Failed to update food item');
      }
    } catch (error) {
      console.error('Error updating food item:', error);
      toast.error('Failed to update food item');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Edit Food Item</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='title' className='block text-gray-700'>Title</label>
            <input
              type='text'
              id='title'
              name='title'
              value={food.title}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='description' className='block text-gray-700'>Description</label>
            <textarea
              id='description'
              name='description'
              value={food.description}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded'
              rows='4'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='price' className='block text-gray-700'>Price</label>
            <input
              type='number'
              id='price'
              name='price'
              value={food.price}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded'
              step='0.01'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='category' className='block text-gray-700'>Category ID</label>
            <input
              type='text'
              id='category'
              name='category'
              value={food.category}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='ingredients' className='block text-gray-700'>Ingredients</label>
            <textarea
              id='ingredients'
              name='ingredients'
              value={food.ingredients}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded'
              rows='4'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='image' className='block text-gray-700'>Image</label>
            <input
              type='file'
              id='image'
              name='image'
              onChange={handleImageChange}
              className='w-full px-3 py-2 border border-gray-300 rounded'
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFood;
