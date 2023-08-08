
import React, { useState } from 'react';
import axios from 'axios';

const UserSignup = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post('/ngoconnect/addusers', formData, {
        headers: {
          'Content-Type': 'application/json' // Set the content type to JSON
        }
      });
      console.log(response.data);
  
      setFormData({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle error cases here
    }
  
    onSubmit(formData);
  };
  

  return (
    <div className="container-fluid h-100" id="signuppage">
    <div className="row h-100">
      <div className="col-12 col-md-6 bg-image-container d-none d-md-block">
        <img src="/images/login.jpg" alt="signup " className="img-fluid" />
      </div>

      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className='form-width'>
        <div className="mb-3">
          <h1>User Sign Up</h1>
          <input
            type="text"
            className="form-control"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
          <button type="button" className="btn btn-secondary">
            Register NGO
          </button>
        </div>
      </form>

        
      </div>
    </div>
  </div>
  
  );
};

export default UserSignup;


