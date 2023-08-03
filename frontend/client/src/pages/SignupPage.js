
import React from 'react';
import UserSignup from '../components/UserSignup';
import '../styling/SignupPage.css'
function SignupPage({ onSubmit }) {
    
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };

  return (

      <UserSignup onSubmit={handleSubmit} />
    
  );
}

export default SignupPage;
