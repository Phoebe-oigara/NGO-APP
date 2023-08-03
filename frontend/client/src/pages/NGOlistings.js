import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styling/ngolisting.css'

const NGOList = () => {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    fetchNgos();
  }, []);

  const fetchNgos = async () => {
    try {
      const response = await axios.get('ngoconnect/ngolist');
      setNgos(response.data.All_ngos);
    } catch (error) {
      console.error('Error fetching NGOs:', error);
    }
  };

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
          {ngos.map(ngo => (
            <li key={ngo.id}>
              <h3>{ngo.name}</h3>
              <p>Description: {ngo.description}</p>
              <p>Category: {ngo.category}</p>
              {/* Display other properties here as needed */}
            </li>
          ))}
        </ul>
        </div>
        <div className="col-md-4">
        <h2>Side Bar</h2>
          <ul>
            <li> CAtegory 1</li>
            <li> CAtegory 2</li>
            <li> Category 6</li>
          </ul>

        </div>
        </div>
      </div>
    </div>

  );
};

export default NGOList;
