import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/login/LoginForm';
import Home from './components/home/Home'; 
import Checkout from  './components/checkout/checkout';
import Card from './components/card/Card'

function App() {
  return (
    
    <Router>
      <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/card" element={<Card />} />
          
      </Routes>
   </Router>
  );
}

export default App;
