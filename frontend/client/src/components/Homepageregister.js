import React from "react";
import { Link } from 'react-router-dom';

const HomepageRegister = () => {
  // Replace this with your actual logic to check if the user is logged in
  const isLoggedIn = localStorage.getItem('access_token') !== null;

  return (
    <div className="container" id="section-2">
      <div className="row">
        <div className="col">
          <img src="/images/register.jpg" alt="register" />
        </div>
        <div className="col" id="enlist">
          <h1>Get NGO enlisted</h1>
          <p className="explainer">
            The ngo.connect is a user-friendly platform that connects users
            with a comprehensive list of NGOs, enabling you to explore missions,
            volunteer opportunities, and fundraising campaigns
          </p>
          {/* Always show the "Register NGO" button, but direct to different paths */}
          <Link
            to={isLoggedIn ? '/register' : '/signup'}
            className="button1"
          >
            Register NGO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomepageRegister;
