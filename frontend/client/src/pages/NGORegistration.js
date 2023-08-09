
import React, { useState } from "react";
import axios from "axios";

const NGORegister = () => {
 
    const [name, setName] = useState("andrew");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
  

  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  function handleApi(e) {
    e.preventDefault()
    if (!image) {
      console.log("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ngoconnect"); // Your Cloudinary upload preset

    axios
      .post("https://api.cloudinary.com/v1_1/dpz04pwpd/image/upload", formData)
      .then((res) => {
        console.log("Image uploaded successfully:");
        setImage(res.data.secure_url);

       
       

        axios
          .post("http://localhost:5000/ngoconnect/register", {
            image,
            name,
            description,
            location,
            category,
            email,
            url
          })
          .then((response) => {
            console.log("register success, data stored:", response.data.message);
          })
          .catch((error) => {
            console.error("Error storing image data:", error);
          });
      
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  }
  
import React, { useState } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react'; // Import Cloudinary component
import { Cloudinary } from 'cloudinary-core';

const cloudinaryCore = new Cloudinary({ cloud_name: 'dqwwbbdid' });

const NGORegister = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    ngoName: '',
    email: '',
    description: '',
    location: '',
    category: 'GBV', // Default value for the dropdown
    image: '',
    url: '',
  });

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0]; // Get the selected image file
  
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'NGO_CONNECT'); // Replace with your Cloudinary upload preset
  
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryCore.config().cloud_name}/upload`,
        formData
      );
  
      // Set the Cloudinary public ID (identifier) in the formData
      setFormData((prevData) => ({
        ...prevData,
        image: response.data.public_id,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <div>

        <div className="container-fluid h-100" id="signuppage">
          <div className="row h-100">
          <div className="col-12 col-md-6 bg-image-container d-none d-md-block">
          <img src="/images/ngo-reister.jpg" alt="signup " className="img-fluid" />
          </div>


          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <form className="form-width">
          <h2>Ngo Registration</h2>


          {/* ... (existing input fields) */}
          <div className="input-container">
            <input
            type="text"
            name="name"
            placeholder="Ngo Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            />
            </div>
          <div className="input-container">
            <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            />
          </div>
          <div className="input-container">
          <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          required
          />
          </div>
          <div className="input-container">
          <input
          type="text"
          name="location"
          placeholder="Location"
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
          required
          />
          </div>
          <div className="input-container">
          <select
          name="category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          required
          >
          <option value="">Choose Category</option>
          <option value="GBV">GBV</option>
          <option value="Animal Rescue">Animal Rescue</option>
          <option value="Refugee">Refugee</option>
          <option value="Social Help">Social Help</option>
          <option value="Any Other">Any Other</option>
          </select>
          </div>


          <div className="input-container">
            <input
              type="text"
              name="url"
              placeholder="URL"
              value={url}
              onChange={(e)=>setUrl(e.target.value)}
              required
              />
            </div>
          
            <input type="file" name="file" onChange={handleImage} />

          <div className="input-container">
          <button onClick={handleApi} type="submit" className="btn btn-primary btn-block button-width">Register</button>
          </div>

          
          </form>
          </div>
          </div>
          </div>
                </div>
              </div>
            );
          };

export default NGORegister;