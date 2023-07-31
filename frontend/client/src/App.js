import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and update the imports

import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';

function App() {
  const handleFormSubmit = (formData) => {
    console.log('Form data submitted:', formData);
  };

  return (
    <Router> 
      <div className="App">
        <h1>NGO CONNECT</h1>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage onSubmit={handleFormSubmit} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
