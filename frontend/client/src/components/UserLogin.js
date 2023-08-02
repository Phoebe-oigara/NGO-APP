
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Add your login logic here (e.g., sending login request to the server)
  };



return (
  <div className= 'container'>
    <div className= 'row'>
      <div className= 'col'>
        {<img src="/images/hero-section.jpg" alt="Example Image" />}
      </div>
      <div className= 'col'>
      <form onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">User Login</h2> {/* User Login header */}
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Name"
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
      <button type="submit" className="btn btn-primary btn-block">
        Login
      </button>
    </form>
      </div>
    
    </div>
    
  </div>
);
};
export default LoginForm;



