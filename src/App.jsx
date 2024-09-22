import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Category from './components/Category';
import Menu from './components/Menu';
import Contact from './components/Contact';
import AddFoodItem from './components/insert';
import FoodSearch from './components/linearsearch';
import CharacterSearch from './components/characterSearch';
import Cart from './components/cart';
import Checkout from './components/checkout';
import FoodSingle from './components/foodSingle';
import Binarysearch from './components/binarysearch';

import Login from './components/login';
import Dashboard from './components/dashboard';
import FoodManagement from './FoodManagement';
import EditFood from './components/editFood';
import Registration from './register';
import LogoutButton from './components/logoutButton';
import LoginAdmin from './components/login-admin';
import RegisterAdmin from './components/register-admin';
import LogoutAdmin from './components/logout-admin';
import Search from './components/search';
import OrderTable from './components/ordertable';




const App = () => {
  return (
    

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="dashboard/insertfood" element={<AddFoodItem />} />
        <Route path="/lsearch" element={<FoodSearch />} />
        <Route path="/csearch" element={<CharacterSearch />} />
        <Route path="/binarysearch" element={<Binarysearch />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/editfood/:id" element={<EditFood />} />
        
     
        <Route path="dashboard/food" element={<FoodManagement />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/logout" element={<LogoutButton />} />

        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/logout-admin" element={<LogoutAdmin />} />
        <Route path="/Search" element={<Search/>}/>
        <Route path='/ordertable' element={<OrderTable/>}/>                       
      
                <Route path="/food/:id" element={<FoodSingle />} />
        
      </Routes>
    </Router>
    

  );
};

export default App;