
import React from 'react';
import UserSignup from '../components/UserSignup';
import '../styling/SignupPage.css'
function SignupPage({ onSubmit }) {
    
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <div className="container"> {/* Add the container class */}
      <UserSignup onSubmit={handleSubmit} />
    </div>
  );
}

export default SignupPage;
