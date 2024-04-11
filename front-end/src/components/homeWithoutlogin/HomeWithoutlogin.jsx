import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../parts/Navbar';
import './homewithoutlogin.css';

const Home = () => {
   

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

   
  return (
    <div>
      <Navbar />
      <Link  to='/login'>
        <button type="button" className="checkout-btn btn btn-success">Login</button>         
      </Link>
      <Link  to='/'>
       <button type="button" className="checkout-btn1 btn btn-primary">Register</button>  
      </Link>
      <div className='text-center'>
        <div className='text-center product-container-all'>
          <div className='searchbar-heading'>
            <h2 className='primary'>You are welcome to our shop</h2>
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
                 
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
