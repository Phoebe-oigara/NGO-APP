import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h1>List of NGOs</h1>
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
  );
};

export default NGOList;
