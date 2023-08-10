import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';

const UserSignup = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    try {
      // eslint-disable-next-line
      const response = await axios.post('/ngoconnect/addusers', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      setSuccessMessage('Account successfully created');
      setErrorMessage('');
  
      setFormData({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      onSubmit(formData);
  
    } catch (error) {
      setErrorMessage('Error adding user: Password must contain atleast 8 characters,an uppercase and a digit!');
      setSuccessMessage('');
    }
  };
  const [user, setUser] = useState({})


  async function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    


  // Send a push request to your API
  await sendPushRequestToAPI(userObject);// Function to send the push request
}


  async function sendPushRequestToAPI(userObject) {
    try{
    // Replace 'YOUR_API_URL' with the actual URL of your API
      const apiUrl = '/ngoconnect/addusers';


  // Define the data to send in the push request
  const requestData = {
    user: userObject,
    // Any other data you want to send
    };

  // Make the push request using the fetch API
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers your API requires
    },
    body: JSON.stringify(requestData),
  });

  // Handle the API response as needed
  console.log('API Response:', response);
  // You can add more logic here to handle different response scenarios
  } catch (error) {
  // Handle errors that occurred during the push request
  console.error('Error sending push request:', error);
  }
}





   
  
    useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
        client_id: "319112613135-vp74439lma8pcijfslmardni7e8rmf2q.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });
  
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large"}
        
      );
      google.accounts.id.prompt();

      
    // eslint-disable-next-line
    },[]);



      // If we have no user: sign in button
      // If we have no user: show the login button




  return (


    
    <div className="container-fluid h-100" id="signuppage">
    

    <div className="row h-100">
          
      <div className="col-12 col-md-6 bg-image-container d-none d-md-block">
        <img src="/images/login.jpg" alt="signup " className="img-fluid" />
      </div>
   

      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className='form-width'>
        <div className="mb-3">
          <h1>User Sign Up</h1>
          <input
            type="text"
            className="form-control"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
          <div className="Google">
            <div id="signInDiv"></div>
            
            
            { user &&
              <div>
                <img src={user.picture} alt="userprofile"/>
                <h3>{user.name}</h3>
              </div>

            }
      

          </div>
        </div>

      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
     

        
      </div>
    </div>
  </div>
  
  
  );
};


export default UserSignup;


