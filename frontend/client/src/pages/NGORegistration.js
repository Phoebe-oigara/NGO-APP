import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import NgoCount from "../components/registrationcount";
import '../styling/registration.css';

const NGORegister = () => {
 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
  

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
          .post("/ngoconnect/register", {
            image: image,
            name,
            description,
            location,
            category,
            email,
            url
          })
          .then((response) => {
            console.log("register success, data stored:", response.data.message);
            setRegistrationSuccess(true);
          })
          .catch((error) => {
            console.error("Error storing image data:", error);
          });
          
      
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  }

  return (
    <div>
      <div>

        <div className="container-fluid h-auto" id="signuppage">
          <div className="row">
          <div className="col-12 col-md-8 d-flex align-items-center justify-content-center">
          <form className="">
          <h2>Ngo Registration</h2>

          <p> Fill in the form bellow to enlist your NGO <span>(All fields are mandatory)</span>
            </p>
          {/* ... (existing input fields) */}
          
          <div className="input-container">
            <input
              type="text"
              name="name"
              placeholder="Ngo Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-container">
          <p className='guide'> Give a description of your organization <span>(atleas 2 paragraphs)</span></p>
          <textarea
          id="text"
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
          <p className='guide'> Choose which field  your NGO helps in</p>
          <select
          name="category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          required
          className='selector'
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
          <p className='guide'>Give a link to your website or any socials <span>(proof of existance)</span></p>
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
          <button onClick={handleApi} type="submit" className="btn btn-block button-width" id="spacing">Register</button>
          </div>
          
        
          </form>

          </div>

          <div className="col-12 col-md-4 bg-image-container d-none d-md-block">
          <NgoCount/>
          {registrationSuccess && (
          <div className="success-message">
            NGO registered successfully! Thank you for your registration.
          </div>
        )}
          
          </div>
        
          </div>
          </div>
                </div>
              </div>
            );
          };

export default NGORegister;
