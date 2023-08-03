
import React, { useState } from 'react';

const UserSignup = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data to the parent component's onSubmit function
    onSubmit(formData);
  };

  return (
    <div className="container-fluid h-100" id="signuppage">
    <div className="row h-100">
      <div className="col-12 col-md-6 bg-image-container d-none d-md-block">
        <img src="/images/login.jpg" alt="signup " className="img-fluid" />
      </div>


      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
      {/* <form onSubmit={handleSubmit} className='form-width'> */}

        <div className= 'col'>
      <h2 className="text-center mb-4">Sign Up</h2>
      <form  className='form-width' onSubmit={handleSubmit}>

        <div className="mb-3">
          <h1>User Sign Up</h1>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
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
  </div>
  
  );
};

export default UserSignup;


