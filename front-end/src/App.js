import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm'

function App() {
  return (
    
    <Router>
      <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
      </Routes>
   </Router>
  );
}

export default App;
