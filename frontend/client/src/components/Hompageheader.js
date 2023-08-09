import React from "react";
import { Link } from 'react-router-dom';
import LogoutButton from './logout'

const HomepageHeader = () => {
  // Replace this with your actual logic to check if the user is logged in
  const isLoggedIn = localStorage.getItem('access_token') !== null;
  console.log('Is Logged In:', isLoggedIn);
  

  return (
    <div className="container text-left">
      <div className="row">
        <div className="col" id="hero-text">
          <h1 className="heading">We connect</h1>
          <h2 className="caption">communities & Ngos</h2>
          <p className="explainer">
            The ngo.connect is a user - friendly platform that connects users
            with a comprehensive list of NGOs, enabling you to explore missions,
            volunteer opportunities, and fundraising campaigns
          </p>

          <div className="container">
            <div className="row">
              {/* Render the buttons conditionally based on user login status */}
              {!isLoggedIn && (
                <div className="col px-0">
                  <Link to="/signup" className="button1">Sign Up</Link>
                </div>
              )}
              {!isLoggedIn && (
                <div className="col px-0">
                  <Link to="/userlogin" className="button2">Login</Link>
                </div>
              )}
            </div>
            {localStorage.getItem('access_token') && <LogoutButton />}
          </div>
        </div>
        <div className="col">
          <img src="/images/hero-section.jpg" alt="ngo connect" />
        </div>
      </div>
      
    </div>
  );
};

export default HomepageHeader;
