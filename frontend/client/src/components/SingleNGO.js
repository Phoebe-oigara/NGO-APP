import React, { useState, useEffect } from 'react';

import { useParams ,Link} from 'react-router-dom';
import axios from 'axios';
import '../styling/singlengo.css';


import { useParams ,Link} from 'react-router-dom';
import axios from 'axios';
import '../styling/singlengo.css';

import { useParams } from 'react-router-dom';
import axios from 'axios';




const NGODetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [ngoData, setNgoData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetchNGOData();
    }, 5000); // Delay loading for 5 seconds
  }, []);

  const fetchNGOData = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      };


      const response = await axios.get(`/ngoconnect/ngo/${id}`, config); // Adjust the API endpoint


      const response = await axios.get(`/ngoconnect/ngo/${id}`, config); // Adjust the API endpoint

      
      const response = await axios.get(`/ngoconnect/ngo/${id}`, config); // Adjust the API endpoint

      const response = await axios.get(`/ngoconnect/ngo/${id}`, config);


      console.log(response.data);



      setNgoData(response.data); // Assuming the response contains the NGO data
      setIsLoading(false); // Loading finished
    } catch (error) {
      console.error('Error fetching NGO details:', error);
      setIsLoading(false); // Set loading to false even if an error occurs
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img src="/images/console-loader-2.gif" alt="login ngoconnect" />
    </div>
    );
  }

  if (!ngoData) {
    return <div>No data available</div>; // Handle the case where ngoData is not available
  }

  return (
    <div className="ngodetails">
      <div className="image-container">
        <img
          src={ngoData.image}
          alt={ngoData.name}
          className="img-fluid"
          style={{ width: '100%', height: '400px', objectFit: 'cover' }}
        />
      </div>
      <div className="container mt-4"> {/* Wrapping content in a container */}
        <div className="row">
          <div className="col-md-6">
            <div className="details">
              <h2>{ngoData.name}</h2>
              <p>
                Category: <span>{ngoData.category} </span> |  Location: <span>{ngoData.location} </span>| Email: <span>{ngoData.email}</span>
              </p>
              <p>Description: {ngoData.description}</p>
              <button  onclick="window.location.href = '{{ngoData.url}}';"  className="btn ">Visit NGO Website</button>
              <div className='review'>
                <h3> Leave a review</h3>
              <form>
                <input type="text" />
                <input type="text" />
                <input type="text" />
              </form>
              </div>
              
            </div>
          </div>
          <div className="col-md-6">
          <ul className='shortcuts'>
            <h2> Quick Links</h2>
              <li >
                <Link to={'/'}>Home </Link>
                <Link>Register Ngo </Link>
                <Link>FAQs </Link>
                <Link to={'/ngolist'}> FAQs </Link>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODetails;
