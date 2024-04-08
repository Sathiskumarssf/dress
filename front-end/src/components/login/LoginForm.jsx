import React, { useState } from 'react';
import axios from 'axios';
import {Link}  from 'react-router-dom';
import Navbar from '../../parts/Navbar';
import coverimage from '../../sources/coverimage.avif'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './login.css'

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
     <Navbar  />
     <div className='login-container  '>
     
        <div className='box'>
          <img src= {coverimage} alt="" srcset="" className='coverimage' />
        </div>
        <div className='box pt-5'>
        <div className='login-iterms pt-5'>
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
            <button type="submit"   class="btn btn-primary">Login</button>
          </form>
            {message && <p>{message}</p>}
            <h2>don't have account </h2>
          <Link to="/ ">
            <button type="button" class="btn btn-primary">Registrer</button>
          
          </Link>
           </div>
        </div>
       </div>
   </div>
  );
};

export default RegisterForm;
