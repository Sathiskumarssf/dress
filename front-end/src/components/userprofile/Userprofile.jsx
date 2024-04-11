import React, { useState } from 'react';
import './userprofile.css';
import { useLocation,Link } from 'react-router-dom';

const UserProfile = () => {
  const [url, setUrl] = useState('https://cdn-icons-png.flaticon.com/512/9131/9131529.png');
  const location = useLocation();
  const userEmail = new URLSearchParams(location.search).get('email');
  const userName = new URLSearchParams(location.search).get('username');
  const userAddress = new URLSearchParams(location.search).get('useraddress');

  return (
     <div className='main-container1'>
      <div className="container1">
      <div className="customer-profile">
          <h2>User Profile</h2>
        <div className="profile-image-container">
          <img src={url} alt="Customer" className="profile-image" />
        </div>
        <div className="profile-details">
          <p><strong>Email:</strong> {userEmail}</p>
          <p><strong>Name:</strong> {userName}</p>
          <p><strong>Address:</strong> {userAddress}</p>

        </div>
            <Link to={ `/home?email=${userEmail}&username=${userName}&useraddress=${userAddress}`}>
            <button className='btn btn-primary'>BACK</button>
            </Link>
         
      </div>
    </div>
     </div>
  );
}

export default UserProfile;
