import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';

axios.defaults.withCredentials = true;

const CharacterSearch = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        // Fetch food items from PHP API
        axios.get('http://localhost/php-rest-api/api-charactersearch.php')
            .then(response => {
                setFoodItems(response.data);
                setFilteredItems(response.data); // Initialize filtered items
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter items based on the search query
        const filtered = foodItems.filter(item =>
            item.title.toLowerCase().includes(query)
        );
        setFilteredItems(filtered);
    };

    const addToCart = (food) => {
        const item = {
            id: food.id,
            name: food.title,
            price: food.price,
            quantity: 1 // Default quantity
        };
        axios.post('http://localhost/php-rest-api/cart.php?action=add', item)
            .then((response) => {
                if (response.data.status === 'success') {
                    toast.success(`${food.title} added to cart successfully!`);
                } else {
                    toast.error('Failed to add item to cart.');
                }
            })
            .catch((error) => {
                toast.error('Error adding to cart: ' + error.message);
                console.error('Error adding to cart:', error);
            });
    };

    return (
        <>
            {/* Search Bar */}
            <div className="mx-[100px] mb-[30px] bg-slate-300 p-4">
                <div className="flex gap-4 align-middle">
                    <label htmlFor="search" className="content-center font-semibold">Search Food</label>
                    <input
                        className="p-2"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search food by title"
                    />
                </div>
            </div>

            {/* Food Items Display */}
            <div className="grid mx-[100px] gap-4 grid-cols-2">
                {filteredItems.length > 0 ? (
                    filteredItems.map((food) => (
                        <div key={food.id} className="bg-black text-white rounded-lg">
                            <img
                                className="rounded-lg"
                                src={`http://localhost/php-rest-api/${food.image_name}`}
                                alt={food.title}
                            />
                            <div className="flex flex-col gap-3 font-medium p-10">
                                <Link to={`/food/${food.id}`} className="text-[36px] hover:underline">
                                    {food.title}
                                </Link>
                                <p className="text-[18px]">{food.description}</p>
                                <div className="flex flex-row justify-between">
                                    <h2 className="text-[22px] font-semibold text-orange">Rs.{food.price}</h2>
                                    <Button text="Add to Cart" onClick={() => addToCart(food)} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No food items found.</p>
                )}
            </div>

            <ToastContainer />
        </>
    );
};

export default CharacterSearch;
