
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/Loginpage.css';

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
    <div className="container-fluid h-100" id="signuppage">
      <div className="row h-100">
        <div className="col-12 col-md-6 bg-image-container d-none d-md-block">
          <img src="/images/loginpage.jpg" alt="userlogin" className="img-fluid" />
        </div>


        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit}  className='form-width'>
            {/* Add inline style to the form to set its width to 40% */}
            <h1 className="mb-4">User Login</h1>
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
            <button type="submit" className="btn btn-primary btn-block button-width">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
