import React from 'react';
import '../styling/Landingpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

    const LandingPage = () => {
      return (
        <div class="container text-left">
            <div class="row">

                <div class="col" id="hero-text">

                    <h1 class= "heading">We connect</h1>
                      <h2 class="caption">communities & Ngos</h2>
                      <p class="explainer">The ngo.connect is a user - friendly platform that coonects users with a comprehesive list of NGOs,enabling you to explore missions,
                      volunteer opportunities and fundraising campains</p>

                      <div class="container">
                        <div class="row">
                          <div class="col px-0 ">
                          <button class="button1">Sign Up</button>
                          </div>
                          <div class="col px-0">
                          <button class="button2" >Login</button>
                          </div>
                        </div>
                      </div>
                </div>
            <div class="col">
            <img src="/images/hero-section.jpg" alt="Example Image" />
            </div>
          </div>
          
        </div>

       
      );
    };
    
    export default LandingPage;



        
    