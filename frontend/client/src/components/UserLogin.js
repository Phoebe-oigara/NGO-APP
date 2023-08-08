
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/ngoconnect/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      // Assuming the server returns an access token upon successful login
      const { access_token } = data;

      // Save the access token in local storage or state for future authenticated requests
      localStorage.setItem('access_token', access_token);

      // Reset form fields after successful login
      setEmail('');
      setPassword('');
      setError('');

     
      navigate('/ngolist');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container-fluid h-100" id="signuppage">
    <div className="row h-100">
      <div className="col-12 col-md-6 bg-image-container d-none d-md-block">
        <img src="/images/login.jpg" alt="signup " className="img-fluid" />
      </div>

      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
      

<form onSubmit={handleSubmit} className='form-width'>
<h2>Login</h2>
  <div>
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={handleEmailChange}
      required
    />
  </div>
  <div>
    <label htmlFor="password">Password:</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={handlePasswordChange}
      required
    />
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
  {error && <p>{error}</p>}
</form>
   
      </div>
    </div>
  </div>
   
  );
};

export default LoginForm;