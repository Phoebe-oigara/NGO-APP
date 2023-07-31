
import React from 'react';
import LoginForm from '../components/UserLogin';

function UserloginPage({ onSubmit }) {
    
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <div>
      <h2>User Login Page</h2>
      <LoginForm onSubmit={handleSubmit} /> 
    </div>
  );
}

export default UserloginPage;