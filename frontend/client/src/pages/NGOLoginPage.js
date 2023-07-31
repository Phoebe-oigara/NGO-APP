
import React from 'react';
import NGOLogin from '../components/NGOLogin';

function NGOloginPage({ onSubmit }) {
    
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <div>
      <h2>NGO Login Page</h2>
      <NGOLogin onSubmit={handleSubmit} /> 
    </div>
  );
}

export default NGOloginPage;
