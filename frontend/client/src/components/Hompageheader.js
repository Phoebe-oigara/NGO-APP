import React from "react";

const HomepageHeader = () => {
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
              <div className="col px-0">
                <button className="button1">Sign Up</button>
              </div>
              <div className="col px-0">
                <button className="button2">Login</button>
              </div>
            </div>
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
