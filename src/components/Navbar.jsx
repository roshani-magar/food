import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { IoSearchSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";


const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('authToken');
  return (
    <>
      <div className='flex px-[100px] justify-between items-center h-[60px] bg-[#F37116]'>
        <img width="50px" src="images/logo1.svg" alt="Logo" />
        
        <ul className='flex gap-5 list-none text-white'>
          <li>
            <Link to="/" className="text-white hover:text-gray-400 cursor-pointer">Home</Link>
          </li>
          <li>
            <Link to="/Menu" className="text-white hover:text-gray-400 cursor-pointer">Menu</Link>
          </li>
          <li>
            <Link to="/Category" className="text-white hover:text-gray-400 cursor-pointer">Category</Link>
          </li>
          
          
          

          <li>
            <Link to="/Contact" className="text-white hover:text-gray-400 cursor-pointer">Contact</Link>
          </li>
        </ul>
        <div className='flex flex-row items-center text-white gap-5'>
        <IoSearchSharp className='text-2xl' />
        <li>
        
            <Link to="/cart" className="text-white hover:text-gray-400 cursor-pointer"><FaCartShopping className='text-2xl'/></Link>
          </li>
         
      {!isLoggedIn ? (
          <>
            <li>
              <Link to="/register" className="text-white hover:text-gray-400 cursor-pointer">Register</Link>
            </li>
            <li>
              <Link to="/login" className="text-white hover:text-gray-400 cursor-pointer">Login</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/logout" className="text-white hover:text-gray-400 cursor-pointer">Logout</Link>
          </li>
        )}
        <Button text="Search"  to="/Search"/>
        
        </div>
        
      </div>
    </>
  );
};

export default Navbar;
