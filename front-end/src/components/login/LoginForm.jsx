import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../parts/Navbar.jsx';
import coverimage from '../../sources/coverimage.avif';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
   
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const userData = response.data[0]; // Access data property of response
      
      navigate(`/home?email=${email}&username=${userData.name}&useraddress=${userData.address}`); // Redirect to the home page after successful login
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error, e.g., display error message to the user
    }
  }
  

   
  return (
    <div>
       
      <Navbar />
      <div className='login-container'>
        <div className='box'>
          <img src={coverimage} alt="" srcSet="" className='coverimage' />
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
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {message && <p>{message}</p>}
            <h2>Don't have an account?</h2>
            <Link to="/">
              <button type="button" className="btn btn-primary">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
