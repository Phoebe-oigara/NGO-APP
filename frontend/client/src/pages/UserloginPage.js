
import React from 'react';
import LoginForm from '../components/UserLogin';
import '../styling/Loginpage.css'
function UserloginPage({ onSubmit }) {
    
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };
 

  return (
    <div className="container"> {/* Add the container class */}
      <div className="row justify-content-center">
        <div className="col-md-6"> {/* Add Bootstrap column class */}
          <div className="form-container"> {/* Add the form container class */}
          
            <LoginForm onSubmit={handleSubmit} />
          </div>
        </div>
        <div className="col-md-6"> {/* Add Bootstrap column class for the image */}
          {/* Add your image here */}
        </div>
      </div>
    </div>
  );
}


export default UserloginPage;
