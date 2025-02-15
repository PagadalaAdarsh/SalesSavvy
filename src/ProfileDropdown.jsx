import React, { useState } from 'react';
import useravatar from './useravatar.png';
import './assets/styles.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Add your logout functionality here
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="profile-dropdown">
      <button className="profile-button" onClick={toggleDropdown}>
        <img
          src={useravatar}
          alt="User Avatar"
          className="user-avatar"
          onError={(e) => { e.target.src = 'fallback-logo.png'; }} // Fallback for image error
        />
        <span className="username">{username || 'Guest'}</span> {/* Display username */}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a href="#">Profile</a>
          <a href="#">Orders</a>
          <button className="profile-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}