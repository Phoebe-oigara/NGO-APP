
import React from 'react';
import UserSignup from '../components/UserSignup';

function SignupPage({ onSubmit }) {
    
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <div>
      <h2>Sign Up Page</h2>
      <UserSignup onSubmit={handleSubmit} /> 
    </div>
  );
}

export default SignupPage;
