import React from 'react';
import '../styling/Landingpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyListComponent from '../components/homeselector';



    const LandingPage = () => {
      return (
      <div>
        <div class="container text-left">
            <div class="row">

                <div class="col" id="hero-text">

                    <h1 class= "heading">We connect</h1>
                      <h2 class="caption">communities & Ngos</h2>
                      <p class="explainer">The ngo.connect is a user - friendly platform that coonects users with a comprehesive list of NGOs,enabling you to explore missions,
                      volunteer opportunities and fundraising campains</p>

                      <div class="container">
                        <div class="row">
                          <div class="col px-0">
                          <button class="button1">Sign Up</button>
                          </div>
                          <div class="col px-0">
                          <button class="button2" >Login</button>
                          </div>
                        </div>
                      </div>
                </div>
            <div class="col">
           <img src="/images/hero-section.jpg" alt="ngo connect" />
            </div>
          </div>
          </div>

          <MyListComponent />
         
         <div class = 'container' id="section-2">
           <div class= 'row' >
             <div class= 'col'>
             <img src="/images/register.jpg" alt="register" />
              </div>  
            <div class='col' id="enlist" > 
              <h1  >Get NGO enlisted</h1>
                      <p class="explainer">
                      The ngo.connect is a user - friendly platform that coonects
                       users with a comprehesive list of NGOs,enabling you to
                       explore missions, volunteer opportunities and fundraising campains
                       </p>
                       <button class="button1">Register NGO</button>
              </div>

              </div>

            </div>

           

          </div>

   
    

       
      );
    };
    
    export default LandingPage;



        
    