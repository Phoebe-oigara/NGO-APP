import React from "react";

const HomepageRegister = () => {
  return (
    <div className="container" id="section-2">
      <div className="row">
        <div className="col">
          <img src="/images/register.jpg" alt="register" />
        </div>
        <div className="col" id="enlist">
          <h1>Get NGO enlisted</h1>
          <p className="explainer">
            The ngo.connect is a user - friendly platform that connects users
            with a comprehensive list of NGOs, enabling you to explore missions,
            volunteer opportunities, and fundraising campaigns
          </p>
          <button className="button1">Register NGO</button>
        </div>
      </div>
    </div>
  );
};

export default HomepageRegister;
