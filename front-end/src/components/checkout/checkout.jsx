 


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link}  from 'react-router-dom';
import Navbar from '../../parts/Navbar'
 import './checkout.css'

const Checkout = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchCheckoutProducts();
    }, []);

    const fetchCheckoutProducts = async () => {
        try {
            const result = await axios("http://localhost:5000/checkoutproducts");
            setProducts(result.data.map(product => ({ ...product, quantity: 1 }))); // Add quantity property to each product
        } catch (err) {
            console.log("Something went wrong while fetching checkout products");
        }
    };

    const increaseQuantity = (iterms_code) => {
        setProducts(prevProducts => prevProducts.map(product => {
            if (iterms_code === product.iterms_code) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        }));
    };

    const decreaseQuantity = (iterms_code) => {
        setProducts(prevProducts => prevProducts.map(product => {
            if (iterms_code === product.iterms_code && product.quantity > 1) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        }));
    };

    // Calculate total price
    const totalPrice = products.reduce((acc, product) => {
        return acc + (product.prize * product.quantity);
    }, 0);

    return (
        <div className='checkout-container'>
            <Navbar/>
            <div className='checkout-container-all m-5'>
            <h1 className='text-center'>Welcome to Cart</h1>
                <table className="table   border-secoundary">
                    <thead className="table-dark">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td style={{width:'20%'}}> <img src={product.path} alt={product.name} className='product-image' style={{ width: '10rem', height: '8rem' }}/></td>
                                <td>{product.name}</td>
                                <td>{product.prize}</td>
                                <td style={{width:'20%'}} >
                                    <div className='d-flex ' >
                                    <button className='decress  btn btn-success' onClick={() => decreaseQuantity(product.iterms_code)}>-</button>
                                    <h2 style={{marginLeft:'2rem'}}>{product.quantity}</h2>
                                    <button className='increse btn btn-success  ' onClick={() => increaseQuantity(product.iterms_code)}>+</button>
                                    </div>
                                    
                                </td>
                                <td>{product.prize * product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                 <div className='d-flex'>
                        <h1>Total price: {totalPrice}</h1> </div>{/* Display total price */}
                        <Link to={`/card?totalPrice=${totalPrice}`}>
                    <button className='btn btn-primary'>Payment</button>
                    </Link>

                </div>
        </div>
    );
};

export default Checkout;
