import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styling/ngolisting.css';


const NGOList = () => {
  const [ngos, setNgos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const accessToken = localStorage.getItem('access_token');
  const isLoggedIn = accessToken !== null;

  useEffect(() => {
    if (isLoggedIn) {
      fetchNgos();
    }
  }, [isLoggedIn]);

  const fetchNgos = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get('ngoconnect/ngolist', config);
      setNgos(response.data.All_ngos);
    } catch (error) {
      console.error('Error fetching NGOs:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNgos = ngos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // If the user is not logged in, handle redirection programmatically
  if (!isLoggedIn) {
    window.location.href = '/userlogin'; // Replace with your login page URL
    return null; // Return null to prevent rendering any content
  }

  // List of categories
  const categories = [
    'Choose Category',
    'GBV',
    'Animal Rescue',
    'Refugee',
    'Social Help',
    'Any Other'
  ];

  return (
    <div>
      <div className='row' id="page-header" >
        <div className='col'>
          <h1 className='title'>Discover A wid range <br></br>of listed and verified Ngos</h1>
        </div>
        <div className='col'>
        <img src="/images/ngo-listings-removebg-preview.png" alt="login ngoconnect"  />
        </div>
      </div>

      <div className='container'>
        <div className="row">
          <div className="col-md-8">

          <div className="card-deck">
                {currentNgos.map(ngo => (
                  <div key={ngo.id} className='card mb-4 overflow-hidden' >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={ngo.image} alt={ngo.name} className="card-img h-100" />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body bg-white">
                          <h3 className="card-title">{ngo.name}</h3>
                          <p className='category'>Field: <span>{ngo.category}</span></p>
                          <p className="card-text category">Location: <span>{ngo.location}</span></p>
                          <p className="card-text">{ngo.description.split(' ').slice(0, 25).join(' ')}...</p>
                          <Link to={`/ngoconnect/ngo/${ngo.id}`} className="btn view-more">Know More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            <div className='pagination-container'>
              <div className="pagination">
                {Array.from({ length: Math.ceil(ngos.length / itemsPerPage) }).map((_, index) => (
                  <button key={index} onClick={() => paginate(index + 1)} className="btn btn-secondary">{index + 1}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h2>Categories</h2>
            <select className="form-select">
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            
            <ul className='shortcuts'>
            <h2> Quick Links</h2>
              <li >
                <Link to={'/'}>Home </Link>
                <Link>Register Ngo </Link>
                <Link>FAQs </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  
};
export default NGOList;








