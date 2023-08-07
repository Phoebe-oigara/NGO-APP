import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NGORegister = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    ngoName: '',
    email: '',
    description: '',
    location: '',
    category: 'GBV', // Default value for the dropdown
    image: '',
    url: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/ngoconnect/register', formData);

      if (response.data.success) {
        onSubmit(formData);
      } else {
        setErrorMessage(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error while submitting form:', error);
      setErrorMessage('An error occurred while processing your request.');
    }
  };

  return (

    <div className="container-fluid h-100" id="signuppage">
    <div className="row h-100">
      <div className="col-12 col-md-6 bg-image-container d-none d-md-block">
        <img src="/images/ngo-reister.jpg" alt="signup " className="img-fluid" />
      </div>

      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">

    
          <form onSubmit={handleSubmit}  className='form-width'>
          <h2>Ngo Registration</h2>
            
          <div className="input-container">
          <input
            type="text"
            name="name"
            placeholder="Ngo Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          </div>
          <div className="input-container">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          </div>
          <div className="input-container">
          <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          />
          </div>
          <div className="input-container">
          <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          />
          </div>
          <div className="input-container">
          <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          >
          <option value="">Choose Category</option>
          <option value="GBV">GBV</option>
          <option value="Animal Rescue">Animal Rescue</option>
          <option value="Refugee">Refugee</option>
          <option value="Social Help">Social Help</option>
          <option value="Any Other">Any Other</option>
          </select>
          </div>
          <div className="input-container">
          <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          />
          </div>

            <div className="input-container">
            <input
              type="text"
              name="url"
              placeholder="URL"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>
            <div className="input-container">
              <button type="submit" className="btn btn-primary btn-block button-width">Register</button>
            </div>
          </form>

        
      </div>
    </div>
  </div>
  

 
);
};

export default NGORegister;