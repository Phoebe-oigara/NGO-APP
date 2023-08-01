import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and update the imports

import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import NGORegistrationPage from './pages/NGORegistration';
import UserloginPage from './pages/UserloginPage';
import NGOloginPage from './pages/NGOLoginPage';
import NGOList from './components/Ngolistings';

// styling pages


function App() {
  const handleFormSubmit = (formData) => {
    console.log('Form data submitted:', formData);
  };

  return (
    <Router> 
      <div className="App">
       
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage onSubmit={handleFormSubmit} />} />
          <Route path="/register" element={<NGORegistrationPage onSubmit={handleFormSubmit} />} />
          <Route path="/Userlogin" element={<UserloginPage onSubmit={handleFormSubmit} />} />
          <Route path="/NGOlogin" element={<NGOloginPage onSubmit={handleFormSubmit} />} />
          <Route path="/ngolist" element={<NGOList/>} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
