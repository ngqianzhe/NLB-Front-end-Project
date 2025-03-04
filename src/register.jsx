import './register.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import LoginNavbar from './loginNavbar.jsx'; 
import LoginFooter from './loginFooter.jsx';
import LoginSocialFooter from './loginSocialFooter.jsx';
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

  // Update the background color every hour
  setInterval(updateBackgroundColor, 60 * 60 * 1000); // 1 hour in milliseconds

  
  useEffect(() => {
    document.title = 'Oracle 23ai Select AI Demo - Register for myLibrary';
  }, []); // Empty dependency array ensures this runs only once

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Basic validation (you can add more robust validation)
    if (!username || !email || !password || !contactNumber) {
      alert('Please fill in all fields.');
      return;
    }
    const userData = {
      username: username,
      email: email,
      password: password, 
      contactNumber: contactNumber 
    };

    // Get the existing users array from localStorage, or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = users.find(user => user.email === email);
    if (emailExists) {
      alert('Email already exists, please enter another email.');
      return;
    }

    // Add the new user data to the array
    users.push(userData);

    // Store the updated array back in localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    const userSessionData = { username, password }
    sessionStorage.setItem('user', JSON.stringify(userSessionData));
    navigate('/'); 
    window.location.reload();
    // Optionally clear the form or redirect to another page
  };

  return (
    <>
    <LoginNavbar />
    <div className="register-container">
      <h2 style={{fontStyle: "italic", fontWeight: "bold"}}>Register</h2>
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
    <LoginSocialFooter />
    <LoginFooter />
    </>
  );
};

export default Register;