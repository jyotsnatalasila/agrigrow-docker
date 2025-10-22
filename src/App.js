import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import './i18n';
import Welcome from './Components/Welcome';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgotPassword from './Components/Forgotpassword';
import ResetPassword from './Components/Resetpassword';
import { LocationProvider } from "./Components/LocationProvider";
import Services from './Components/Services';
import About from './Components/About';
import Contact from './Components/Contact';

import MainLayout from './Components/MainLayout';
import Home from './Components/Home';
import Rice from './Components/Rice';
import Corn from './Components/Corn';
import Spices from "./Components/Spices";
import Pulses from "./Components/Pulses";
import IndoorPlants from './Components/IndoorPlants';
import Sappling from './Components/Sapplings'; 
import CartPage from "./Components/CartPage";
import Vegetables from './Components/Vegetables';
import Lotus from './Components/Lotus';
import Bs from './Components/Bestsellers';
import TdContent from './Components/Todaydeals';
import WishlistPage from './Components/WishlistPage';
import NewReleasesPage from './Components/Newreleases';
import Fruits from './Components/Fruits'; 
import Flowers from './Components/Flowers';
import AquaticFeedPage from './Components/Aquaticfeed';
import Orders from './Components/Orders';
import Profile from './Components/Profile';
import Product from './Components/Product';
import ProductPage from './Components/ProductPage';
import Nuts from './Components/Nuts';
import AdminDashboard from './Components/AdminDashboard';

function App() { 
  return (
    <LocationProvider> 
      <Router>
        <Routes basename="/agrigrowfe">
          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes with Layout */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/rice" element={<Rice />} />
            <Route path="/corn" element={<Corn />} />
            <Route path="/spices" element={<Spices />} />
            <Route path="/pulses" element={<Pulses />} />
            <Route path="/indoorplants" element={<IndoorPlants />} />
            <Route path="/sapplings" element={<Sappling />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/vegetables" element={<Vegetables />} />
            <Route path="/lotus" element={<Lotus />} />
            <Route path="/bestsellers" element={<Bs />} />
            <Route path="/todaydeals" element={<TdContent />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/newreleases" element={<NewReleasesPage />} />
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/flowers" element={<Flowers />} />
            <Route path="/aquaticfeed" element={<AquaticFeedPage />} />
            <Route path="/nuts" element={<Nuts />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Welcome />} />
        </Routes>
      </Router>
    </LocationProvider>
  );
}

export default App;