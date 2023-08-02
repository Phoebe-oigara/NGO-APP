import React from 'react';
import NGOlogin from '../components/NGOLogin';
import '../styling/NGOLogin.css'; 

function NGOloginPage({ onSubmit }) {
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <div> 
      <h2>NGO Login</h2>
      <NGOlogin onSubmit={handleSubmit} /> 
    </div>
  );
}

export default NGOloginPage;

