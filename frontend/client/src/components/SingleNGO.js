import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NGODetails = () => {
  const { id } = useParams();
  const [ngoData, setNgoData] = useState(null);
  const [reviewText, setReviewText] = useState('');

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

      const response = await axios.get(`/ngoconnect/ngo/${id}`, config);

      console.log(response.data);

      setNgoData(response.data);
    } catch (error) {
      console.error('Error fetching NGO details:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('access_token');
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post('/ngoconnect/addreview', { text: reviewText }, config);

      console.log('Review submitted:', response.data);

      // Clear the review input field after submission
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
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

      <div className="review-form">
        <h3>Leave a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          <textarea
            rows="4"
            cols="50"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here"
            required
          ></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default NGODetails;
