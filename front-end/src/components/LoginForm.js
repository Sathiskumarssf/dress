import React, { useState } from 'react';
import axios from 'axios';
import {Link}  from 'react-router-dom';
import Navbar from '../parts/navbar'

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      setMessage(response.data.message);
      if(response.data.message =='User login successfully'){
        alert('you are welcome')
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>

      <Navbar/>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <h2>don't have account </h2>
      <Link to="/ ">
        <button >Registrer</button>
      </Link>
    </div>
  );
};

export default RegisterForm;
