import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styling/footer.css";
import { Link } from 'react-router-dom';



const Footer = () => {
  return (

    <div id="footer" className='foot' >
      <div className="row">
        <div className="col-md-4">
          <h3>Our Goal</h3>
          <p>
            Our platform is designed to be your guide in 
            discovering the ideal NGO and forging meaningful 
            connections with like-minded individuals. 
            
          </p>
          <p>@2023 Ngoconnet</p>
        </div>
        <div className="col-md-4">
          <ul className="quick">
            <h3>Quick Links</h3>
            <li>
              <Link to={'/'}>Home</Link>
              <Link>Register Ngo</Link>
              <Link to={'/ngolist'}>ngolist</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <h3>Support</h3>
          <p>call : 0712345678</p>
          <p>email : info@ngoconnect.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
