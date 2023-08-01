// import React, { useState } from 'react';

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Handle login logic here (e.g., send login request to the server)
//     console.log('Login data:', formData);
//   };

//   const handleSignup = () => {
//     // Handle signup navigation or logic here
//     console.log('Redirect to signup page or show signup modal');
//   };
  

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

// export default LoginForm;
// LoginForm.js
// LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Add your login logic here (e.g., sending login request to the server)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">User Login</h2> {/* User Login header */}
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Name"
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
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;


