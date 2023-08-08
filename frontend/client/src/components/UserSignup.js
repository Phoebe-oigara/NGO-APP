
import React, { useState } from 'react';
import { useEffect} from 'react';
import jwt_decode from "jwt-decode"
const UserSignup = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data to the parent component's onSubmit function
    onSubmit(formData);

  
  };

  const [user, setUser] = useState({})


  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    }

    function handleSignOut(event) {
      setUser({});
      document.getElementById("signInDiv").hidden = false;

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
      
  
      }, []);
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
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
            { Object.keys(user).length !== 0 &&
              <button onclick={ (e) => handleSignOut(e)}> Sign Out </button>
            }
            
            { user &&
              <div>
                <img src={user.picture} alt="userpicture"/>
                <h3>{user.name}</h3>
              </div>

            }
      

          </div>
        </div>
       
          
        
        
        

        
      </form>
     

        
      </div>
    </div>
  </div>
  
  
  );
};

export default UserSignup;


