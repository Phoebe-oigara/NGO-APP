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
      <div className='row' id="page-header">
        <div className='col'>
          <h1 className='title'>List of NGOs</h1>
        </div>
      </div>
      <div className='container'>
        <div className="row">
          <div className="col-md-8">
            <ul>
              {currentNgos.map(ngo => (
                <li key={ngo.id} className='single-list-item'>
                  <h3>{ngo.name}</h3>
                  <p className='category'>Category: <span>{ngo.category}</span></p>
                  <p>{ngo.description}</p>
                  <p>{ngo.location}</p>
                  <img src={ngo.image} alt={ngo.name} className="ngo-image" />
                  <Link to={`/ngo/${ngo.id}`}>View Details</Link>
                </li>
              ))}
            </ul>
            <div className='pagination-container'>
              <div className="pagination">
                {Array.from({ length: Math.ceil(ngos.length / itemsPerPage) }).map((_, index) => (
                  <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h2>Categories</h2>
            <select>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOList;