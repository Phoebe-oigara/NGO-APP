
import React from 'react';
import NGORegister from '../components/NgoRegistration';

function NGORegistrationPage({ onSubmit }) {
    
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <div>
      <h2>NGORegistration Page</h2>
      <NGORegister onSubmit={handleSubmit} /> 
    </div>
  );
}

export default NGORegistrationPage;
