import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../parts/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BiUserCircle } from '../../../node_modules/react-icons/bi'; 
import './home.css';

const Home = () => {
  const location = useLocation();
  const useremail = new URLSearchParams(location.search).get('email');
  const username = new URLSearchParams(location.search).get('username');
  const useraddress = new URLSearchParams(location.search).get('useraddress');



  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
 
 
  

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:5000/products", {
        params: { query }
      });
      console.log(result.data);
      setProducts(result.data);
    } catch (err) {
      console.log("something wrong");
    }
  };

 

  const storeToCheckout = async (path, name, prize, gender, code, useremail) => {
    try {
      const response = await axios.post('http://localhost:5000/checkout', { path, name, prize, gender, code, useremail });
      setMessage(response.data.message);
      alert(message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      
      <Navbar />
      <Link to={`/checkout?useremail=${useremail}&username=${username}&useraddress=${useraddress}`}>
        <button type="button" className="checkout-btn btn btn-success">Go To Checkout</button>
      </Link>
      <div className='text-center'>
        <div className='text-center product-container-all'>
          <div className='searchbar-heading'>
            <h2 className='primary'>You are welcome to our shop</h2>
                  <Link  to={`/userprofile?email=${useremail}&username=${username}&useraddress=${useraddress}`}  className='profile'>
                  <button className='profile-btn'  > < BiUserCircle  size={60} className="user-icon"/> </button>
                  </Link>
            <input
              className="me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={handleChange}
            />
            <button className="btn btn-success" type="submit">Search</button>
          </div>
          <ul className='product-container w-100' style={{ textDecoration: 'none' }}>
            {products.map(product => (
              <li className='product-container-items flex-sm-column pt-1 m-4' style={{ textDecoration: 'none' }} key={product.id}>
                <img src={product.img_path} alt={product.name} className='product-image' />
                <h1>{product.name}</h1>
                <div>{product.prize}</div>
                <div>{product.gender}</div>
                <button className='btn btn-primary' onClick={() => storeToCheckout(product.img_path, product.name, product.prize, product.gender, product.itermscode, useremail)}>Add to checkout</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
       
       
    </div>
  );
}

export default Home;
