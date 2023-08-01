import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., send login request to the server)
    console.log('Login data:', formData);
  };

  const handleSignup = () => {
    // Handle signup navigation or logic here
    console.log('Redirect to signup page or show signup modal');
  };
  return (
    <div className="container"> {/* Add the container class */}
      <div className="form-container"> {/* Add the form container class */}
        <h2 className="text-center">User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

//   return (
//     <div>
//       <h2>User Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>
//             Name:
//             <input type="text" name="name" value={formData.name} onChange={handleChange} />
//           </label>
//         </div>
//         <div>
//           <label>
//             Password:
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </label>
//         </div>
//         <div>
//           <button type="submit">Login</button>
//         </div>
//       </form>
//       <div>
//         <button onClick={handleSignup}>Sign Up</button>
//       </div>
//     </div>
//   );
// };

export default LoginForm;
