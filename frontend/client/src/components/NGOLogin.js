import React, { useState } from 'react';

const NGOLogin = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login here (e.g., send login data to the server)
    console.log(formData);
  };

  return (
    <div>
      <h2>NGO Login</h2>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default NGOLogin;
