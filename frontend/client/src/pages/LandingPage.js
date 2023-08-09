import React from 'react';
import '../styling/Landingpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import MyListComponent from '../components/homeselector';
import HomepageHeader from '../components/Hompageheader';
import HomepageRegister from '../components/Homepageregister';
import NavBar from '../components/Navbar';
import Footer from '../components/footer';


    const LandingPage = () => {
      return (
      <div className='Home'>
        <div className="nav">
          <NavBar />
        </div>
        <HomepageHeader />
        <div className="devider">
          <MyListComponent />
        </div>
        <HomepageRegister />
        <div className='footer'>
        <Footer />

        </div>
     

      </div>
    

      );
    };
    

    export default LandingPage;

 