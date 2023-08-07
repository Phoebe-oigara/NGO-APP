import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/dashboard.css';

import FormDashbord from '../components/Dashboard/Formdashbord';
import Maindash from '../components/Dashboard/Maindashbor';

const Dashboard = () => {
  return (
    <div>
       <Maindash />
       <FormDashbord /> 
    </div>
     
  );
};

export default Dashboard;
