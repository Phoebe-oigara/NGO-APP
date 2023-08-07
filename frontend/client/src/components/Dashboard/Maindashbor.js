import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationButtons from './buttonnav';


const Maindash = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3  d-flex flex-column" id ="sidebar">
          <h1>Dashboard</h1>
          <ul className='menu'>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
           
          </ul>
          <div className="flex-grow-1"></div> 
        </div>
        {/* content area */}
        <div className="col-md-9" >
          <NavigationButtons />
        </div>
      </div>
    </div>
  );
};

export default Maindash;
