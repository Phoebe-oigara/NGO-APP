import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styling/donation.css';

const DonationForm = () => {
  const [donorName, setDonorName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ngoTo, setNgoTo] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  


  const handleDonate = async () => {
    try {

      console.log('Donation Data:', {
        phone_number: phoneNumber,
        amount: donationAmount,
        donorName: donorName,
        organization: ngoTo
      });

      const accessToken = localStorage.getItem('access_token');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const donationData = {
        phone_number: phoneNumber,
        amount: donationAmount,
        donorName : donorName,
        organization: ngoTo,
      };

      const response = await axios.post('/ngoconnect/donations', donationData, config);

      console.log('Donation response:', response.data);
    } catch (error) {
      console.error('Error donating:', error);
      // Handle error (show an error message, etc.)
    }
  };

  return (


<div className="container-fluid h-100" id="signuppage">
<div className="row h-100">
  <div className="col-12 col-md-6 bg-image-container d-none d-md-block">
    <img src="/images/loginpage.jpg" alt="login ngoconnect" className="img-fluid" />
  </div>

  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">

 <div className="donation-form">
      <h3>Donate Now</h3>
      <p>
      Input your account username under the donar name
      and the name of the organizationas it appers in the site.
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
      <button onClick={handleDonate}  className="btn btn-block size" >Donate</button>
      <Link className="btn btn-block size" to={'/ngolist'}> See Ngo Listings</Link>
    </div>
  </div>
</div>
</div>
   
  );
};

export default DonationForm;

