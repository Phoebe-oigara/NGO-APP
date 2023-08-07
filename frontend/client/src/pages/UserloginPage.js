
import React from 'react';
import LoginForm from '../components/UserLogin';
import '../styling/Loginpage.css'
function UserloginPage({ onSubmit }) {
    
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };
 

  return (

    <LoginForm onSubmit={handleSubmit} />
  );
}


export default UserloginPage;
