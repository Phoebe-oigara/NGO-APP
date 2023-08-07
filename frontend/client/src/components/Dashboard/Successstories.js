import React, { useState } from 'react';
import axios from 'axios';

const SuccessForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    ngotb_id: '', // You may need to set this based on your requirements
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/ngoconnect/successes', formData); // Change the URL to your Flask API endpoint for posting successes
      alert('Success created successfully!');
      // You can also perform any other actions upon successful submission
    } catch (error) {
      alert('Error creating success. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className='input-form'>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <br />
      <label>
        Image URL:
        <input type="text" name="image" value={formData.image} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <br />
      <button type="submit"   className="btn btn-primary btn-block button-width" >Submit</button>
    </form>
  );
};

export default SuccessForm;
