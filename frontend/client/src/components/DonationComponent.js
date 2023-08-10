import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styling/donation.css';

const DonationForm = () => {
  const [donorName, setDonorName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ngoTo, setNgoTo] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [error, setError] = useState('');
  


  const handleDonate = async () => {
    try {
      // Validate phone number format
      const phonePattern = /^\d{9}$/; // Match 9 digits
      if (!phonePattern.test(phoneNumber)) {
        setError('Invalid phone number format. Please enter a 10-digit number.');
        return; // Exit the function if validation fails
      }
  
      // Validate donation amount
      if (isNaN(donationAmount) || donationAmount <= 0) {
        setError('Invalid amount. Please enter a valid positive number.');
        return; // Exit the function if validation fails
      }
  
      const accessToken = localStorage.getItem('access_token');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      const donationData = {
        phone_number: phoneNumber,
        amount: donationAmount,
        donorName: donorName,
        organization: ngoTo,
      };
  
      const response = await axios.post('/ngoconnect/donations', donationData, config);
  
      console.log('Donation response:', response.data);
    } catch (error) {
      console.error('Error donating:', error);
      // Handle error (show an error message, etc.)
    }
  };
  
  const initiateSTKPayment = async () => {
    try {
      // Validate phone number format
      const phonePattern = /^\d{9}$/; // Match 10 digits
      if (!phonePattern.test(phoneNumber)) {
        setError('Invalid phone number format. Please enter a 10-digit number.');
        return; // Exit the function if validation fails
      }
  
      // Validate donation amount
      if (isNaN(donationAmount) || donationAmount <= 0) {
        setError('Invalid amount. Please enter a valid positive number.');
        return; // Exit the function if validation fails
      }
  
      // You may need to make an API call to your backend to get the URL for initiating STK payment
      const stkPaymentUrl = '/ngoconnect/lnmo';
  
      const requestData = {
        phone_number: phoneNumber,
        amount: donationAmount,
      };
  
      // Perform a GET request to the STK payment URL
      const response = await axios.get(stkPaymentUrl, { params: requestData });
  
      console.log('Initiate STK Response:', response.data);
  
    } catch (error) {
      console.error('Error initiating STK payment:', error);
      // Handle error (show an error message, etc.)
    }
  };

  return (


<div className="container-fluid h-100" id="signuppage">
<div className="row h-100">
  <div className="col-12 col-md-6 bg-image-container d-none d-md-block">
    <img src="/images/donate.jpg" alt="login ngoconnect" className="img-fluid" />
  </div>

  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">

 <div className="donation-form">
      <h3>Donate Now</h3>
      <p>
      Input your account username under the  name Donor's
      and the name of the organization as it appears in the site.
      </p>

  
      <input
        type="text"
        placeholder="Donor's name"
        value={donorName}
        onChange={(e) => setDonorName(e.target.value)}
      />

     <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />


      <input
        type="text"
        placeholder="Organization name"
        value={ngoTo}
        onChange={(e) => setNgoTo(e.target.value)}
      />

      <input
        type="number"
        placeholder="Donation Amount"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
      />
      <p  className='guiode'> You will receive an mpesa prompt when you click donate, enter your mpesa pin to accept request.</p>


      <button  className="btn btn-block size"  onClick={() => { handleDonate(); initiateSTKPayment(); }}>Donate Via Mpesa</button>
      
      <Link className="btn btn-block size" to={'/ngolist'}> See Ngo Listings</Link>
    </div>
  </div>
</div>
</div>
   
  );
};

export default DonationForm;

