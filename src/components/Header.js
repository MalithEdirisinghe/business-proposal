import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import logo from '../assets/Logo.png';

const Header = ({ isAuthenticated }) => {
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/'); // Navigate to the home page after logout
    }).catch((error) => {
      console.error("Error logging out:", error); // Optional: Handle errors if needed
    });
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="BizConnect Lanka Logo" className="logo" />
          <div className="logo-text">
            BizConnect <br></br><span>Lanka</span>
          </div>
        </Link>
      </div>
      <nav>
        {!isAuthenticated ? (
          <div className="actions">
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/sign-in">
              <button className="sign-in-btn">Sign In</button>
            </Link>
          </div>
        ) : (
          <div className="logout-btn">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
