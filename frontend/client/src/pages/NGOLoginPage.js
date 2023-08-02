import React from 'react';
import NGOlogin from '../components/NGOLogin';
import '../styling/NGOLogin.css'; 

function NGOloginPage({ onSubmit }) {
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };

//   return (
//     <div> 
//       <h2>NGO Login</h2>
//       <NGOlogin onSubmit={handleSubmit} /> 
//     </div>
//   );
// }
return (
  <div className="container"> {/* Add the container class */}
    <div className="row justify-content-center">
      <div className="col-md-6"> {/* Add Bootstrap column class */}
        <div className="form-container"> {/* Add the form container class */}
        {/* <h2>NGO Login</h2> */}
        
          <NGOlogin onSubmit={handleSubmit} />
        </div>
      </div>
      <div className="col-md-6"> {/* Add Bootstrap column class for the image */}
        {/* Add your image here */}
      </div>
    </div>
  </div>
);
}

export default NGOloginPage;

