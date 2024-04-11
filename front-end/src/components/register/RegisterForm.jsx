import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../parts/Navbar';
import coverimage from '../../sources/coverimage.avif';
import './registerForm.css'

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', { email, password ,name,address});
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  

  return (
    <div>
        <Navbar/>
      <div className='register-container '>
        <div className='box'>
          <img src= {coverimage} alt="" srcset=""  className='coverimage'/>
        </div>
         <div className='box pt-5'>
         <div className='register-iterms   pt-5'>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
            <button type="submit"   class="btn btn-primary">Register</button>
          </form>
          {message && <p>{message}</p>}
          <h2>you have account </h2>
          <Link to="/login">
            <button type="button" class="btn btn-primary">Sign up</button>
          </Link>
        </div>
         </div>
      </div>
    </div>
  );
};

export default RegisterForm;
