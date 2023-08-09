import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="donation-form">
      <h3>Donate Now</h3>

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
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
};

export default DonationForm;
