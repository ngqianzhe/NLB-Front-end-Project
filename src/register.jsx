import './register.css';
import { useEffect, useState } from 'react';
import Navbar2 from './Navbar2.jsx'; 
import LoginFooter from './loginFooter.jsx';
import LoginFooter2 from './loginFooter2.jsx';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  function updateBackgroundColor() {
    const background = document.getElementById("root"); // Get the body element
  
    background.style.backgroundColor = "#fff4f4";
  }

  
  updateBackgroundColor();

  useEffect(() => {
    document.title = 'Register for myLibrary';
  }, []); // Empty dependency array ensures this runs only once

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Basic validation (you can add more robust validation)
    if (!username || !email || !password || !contactNumber) {
      alert('Please fill in all fields.');
      return;
    }

    // TODO: Send registration data to your backend API
    console.log('Registration data:', { username, email, password, contactNumber });

    // Optionally clear the form or redirect to another page
  };

  return (
    <>
    <Navbar2 />
    <div className="container">
      <h3 style={{fontStyle: "italic", fontWeight: "bold"}}>Register</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="register-input"
            type="text"
            id="username"
            value={username}
            placeholder="myLibrary username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="register-input"
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="password-input-container">
          <input
            className="register-input"
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FontAwesomeIcon 
            icon={showPassword ? faEyeSlash : faEye} 
            className="password-icon" 
            onClick={togglePasswordVisibility}
            color="white"
            size="sm" 
          />
        </div>
        <div>
          <input
            className="register-input"
            type="tel"
            id="contactNumber"
            placeholder="Enter your contact number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
    <LoginFooter2 />
    <LoginFooter />
    </>
  );
};

export default Register;