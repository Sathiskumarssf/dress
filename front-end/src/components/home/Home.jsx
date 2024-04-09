import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link}  from 'react-router-dom';
import Navbar from '../../parts/Navbar';
import './home.css'

const Home = () => {

     
     const [message, setMessage] = useState('');
    const [products,setprodusts]=useState([])
   
    useEffect(()=>{
        fetchData();
    })

    async function storetocheckout(path,name,prize,gender,code){
      try{
          const response = await axios.post('http://localhost:5000/checkout', { path,name,prize,gender,code});
          setMessage(response.data.message);
          alert(message)
    } catch (error) {
           setMessage(error.response.data.error);
           alert(message)
    }
    }

    const fetchData = async ()=>{
        try {
            const result = await axios("http://localhost:5000/products");
             console.log(result.data);
            setprodusts(result.data)
        } catch (err) {
            console.log("something wrong");
        }
    }
  return (
    <div> 
        <Navbar/>
         {/* <button className='checkout-btn btn btn-success' >Go To Checkout</button>   */}
         <Link to="/checkout">
            <button type="button" class="checkout-btn btn btn-success">Go To Checkout</button>
          
          </Link>
        <div className='text-center'>
        <div className='text-center product-container-all'>
        <h2 className='primary'>You are welcome to our shop</h2>
      <ul className='product-container   w-100' style={{textDecoration:'none'}}>
        {products.map(product => (
          <li className='product-container-iterms  flex-sm-column  pt-1 m-4' style={{textDecoration:'none'}}   key={product.id}>
             <img src={product.img_path} alt={product.name} className='product-image' />

            
            <h1  >{product.name}</h1>
            <div  >{product.prize}</div>
            <div  >{product.gender}</div>
            <button className='btn btn-primary' onClick={() => storetocheckout(product.img_path, product.name, product.prize, product.gender, product.itermscode)}>Add to checkout</button>
          </li>
        ))}
      </ul>
    </div>
        </div>
    </div>
  )
}

export default Home