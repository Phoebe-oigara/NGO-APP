import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import NavigationButtons from './buttonnav';
import SuccessForm from './Successstories';


const FormDashbord = () => {
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
          <div className='row' id= "Form-area">
            <div className='col'>
                <h1> Success Stories</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc diam quam, 
                    aliquam quis dignissim ac, accumsan eu ex. Donec tristique mauris vitae libero dignissim, 
                    id egestas sem tempus. In vitae erat ac diam dictum suscipit nec a nunc. Ut rhoncus quam sed lacinia posuere. 
                    Aliquam tincidunt felis mi. Aenean ante ante, ultrices a sollicitudin in, ornare vitae 
                    neque. Donec lectus lorem, auctor at urna in, rhoncus malesuada augue. Vivamus nec interdum nisi. Nunc vel ipsum arcu.     </p> 
            </div>
            <div className='col'>
                <SuccessForm  />

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDashbord;
