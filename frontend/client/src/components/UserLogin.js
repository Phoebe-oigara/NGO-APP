import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      const { access_token } = data;

      localStorage.setItem('access_token', access_token);

      setEmail('');
      setPassword('');
      setError('');

      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container-fluid h-100" id="signuppage">
      <div className="row h-100">
        <div className="col-12 col-md-6 bg-image-container d-none d-md-block">

          <img src="/images/loginpage.jpg" alt="userlogin" className="img-fluid" />

        </div>
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className='form-width'>
            <h1 className="mb-4">User Login</h1>
            <div className="mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
