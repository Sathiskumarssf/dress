import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useLocation,Link  } from 'react-router-dom';
import Navbar from '../../parts/Navbar';
import { BiUserCircle } from '../../../node_modules/react-icons/bi'; 
import { useState,useEffect } from 'react';
import coverpage from '../../sources/coverimage.avif'
import './card.css'

const MyCard = () => {
     const location = useLocation();
     const totalPrice = new URLSearchParams(location.search).get('totalPrice');
     const useremail = new URLSearchParams(location.search).get('email');
     const username = new URLSearchParams(location.search).get('username');
     const useraddress = new URLSearchParams(location.search).get('useraddress');
     
      const [showButton, setShowButton] = useState(false);
      const handleHideButtonClick = () => {
        setShowButton(true);
    };

      
      useEffect(() => {
        // Set showButton to true initially
        
    
        // Set a timer to reset showButton to false after 4000 milliseconds
        const timer = setTimeout(() => {
            setShowButton(false);
        }, 4000);
    
        // Cleanup function to clear the timer when the component unmounts or when showButton changes
        return () => clearTimeout(timer);
    }, [handleHideButtonClick]); // Empty dependency array ensures the effect runs only once

     
      
     const [selectedCardType, setSelectedCardType] = useState('');
     const [cardnumber, setcardnumber] = useState('');
     const [cvcnumber, setcvcnumber] = useState('');
     const [experymonth, setexperymonth] = useState('');
     const [experyyear, setexperyyear] = useState('');


      const handleSubmit = (e) => {
           
          e.preventDefault();
          handleHideButtonClick()
        // Validate card number
        if (cardnumber.length !== 16) {
            alert('Please enter a valid card number (16 digits)');
            return;
        }

        // Validate CVV number
        if (cvcnumber.length !== 3) {
            alert('Please enter a valid CVV number (3 digits)');
            return;
        }

        const currentDate = new Date();
        if (experyyear < currentDate.getFullYear() ) {
           alert('year wrong')
        }
    
        if ((experyyear === currentDate.getFullYear() ) && (experymonth < currentDate.getMonth() + 1)) {
            alert("month wrong")
             
        }
            // Split the expiryDate into month and year parts
            
        console.log('Form submitted successfully');
    };
    const handleCardTypeChange = (e) => {
        setSelectedCardType(e.target.value);
    };

  return (
    <div>
        <Navbar/>
                  <Link  to={`/userprofile?email=${useremail}&username=${username}&useraddress=${useraddress}`}  className='profile'>
                  <button className='profile-btn'  > < BiUserCircle  size={60} className="user-icon"/> </button>
                  </Link>
    <div className='container-all  '>
        <div class="containerx">
        <div class="arrange d-flex">

            <div className='box '>
                <img src= {coverpage} alt="" srcset="" className='image-cover'/>
            </div>
            <div class="box   ">
                <div class="card">
                        <button className='order-success btn btn-success'   style={{ display: showButton ? 'block' : 'none' }}>Your order success</button>
                        <h1 class="topic mt-5">Credit Card Form</h1>
                    <div class="card-body">
                        <Form onSubmit={handleSubmit}>
                            <div class="mb-3 d-flex">
                                <label for="cardNumber" class="form-label">Card Number : </label>
                                <input type="text" class="form-control" id="cardNumber" placeholder="Enter card number" value={cardnumber} onChange={(e) => setcardnumber(e.target.value)} required/>
                            </div>
                            <div class="mb-3 d-flex">
                                <label for="cardType" class="form-label">Card Type :</label>
                                <select class="form-select " style={{width:"10rem",marginLeft:'3rem',marginTop:'-0.5rem'}} id="cardType"  onChange={handleCardTypeChange} value={selectedCardType}>
                                    <option selected disabled>Select card type</option>
                                    <option value="visa">Visa</option>
                                    <option value="mastercard">Mastercard</option>
                                    <option value="americanexpress">American Express</option>
                                
                                </select>
                            </div>
                            <div class="mb-3 d-flex">
                                        <label for="expirationDate" class="form-label">Expiration Date :</label>
                                        <input type="text" class="form-control" id="expirationmonth" placeholder="Month  xx" value={experymonth} onChange={(e) => setexperymonth(e.target.value)} required/>               
                                        <input type="text" class="form-control" id="expirationyear" placeholder="year xxxx" value={experyyear} onChange={(e) => setexperyyear(e.target.value)} required/>               
                            </div>
                            <div class="mb-3 d-flex">                               
                                        <label for="expirationDate" class="form-label">CVC number :</label>
                                        <input type="text" class="form-control" id="cvc" placeholder="Three or four digit" value={cvcnumber} onChange={(e) => setcvcnumber(e.target.value)} required/>
                                                                  
                            </div>
                            <button type="submit" class="btn btn-primary " >Submit</button>
                        </Form>
                        <h1>Totel amout: {totalPrice}</h1>
                    </div>
                </div>
            </div>

             
        </div>
    </div>
    </div>
   
 </div>
  )
}

export default MyCard;