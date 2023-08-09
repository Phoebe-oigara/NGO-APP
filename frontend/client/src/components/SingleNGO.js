import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const NGODetails = () => {
  const { id } = useParams();
  const [ngoData, setNgoData] = useState(null);

  useEffect(() => {
    fetchNGOData();
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

      const response = await axios.get(`/ngoconnect/ngo/${id}`, config);


      console.log(response.data);

      setNgoData(response.data); // Assuming the response contains the NGO data
    } catch (error) {
      console.error('Error fetching NGO details:', error);
    }
  };

  if (!ngoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ngodetails">
      <h2>{ngoData.name}</h2>
      <p>Category: {ngoData.category}</p>
      <p>Description: {ngoData.description}</p>
      <p>Location: {ngoData.location}</p>
      {/* Display other properties here */}
    </div>
  );
};

export default NGODetails;
