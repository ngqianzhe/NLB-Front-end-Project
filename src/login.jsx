import './login.css';
import { useState, useEffect } from 'react';
import Navbar2 from './Navbar2.jsx'; 
import LoginFooter from './loginFooter.jsx';
import LoginFooter2 from './loginFooter2.jsx';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  function updateBackgroundColor() {
    const background = document.getElementById("root"); // Get the body element
  
    background.style.backgroundColor = "#fff4f4";
  }

  
  updateBackgroundColor();

  useEffect(() => {
    document.title = 'Login with myLibrary';
  }, []); // Empty dependency array ensures this runs only once

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Add your login logic here (e.g., send data to server)

    if (!username || !password) {
      alert('Please fill in all fields.');
    }
    
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <Navbar2 />
    <div className="container">
      <h2>Sign <span style={{fontStyle: "italic"}}>in</span></h2>
      <form onSubmit={handleSubmit}> {/* Add form element with onSubmit */}
        <input
          className="login-input"
          type="text"
          id="username"
          name="username"
          placeholder="myLibrary username"
          value={username}
          onChange={handleUsernameChange}
        />

        <div className="password-input-container">
          <input
            className="login-input"
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          <FontAwesomeIcon 
            icon={showPassword ? faEyeSlash : faEye} 
            className="password-icon" 
            onClick={togglePasswordVisibility}
            color="white"
            size="sm" 
          />
        </div>

        <button className="login-button" type="submit">CONTINUE</button>
      </form>

      <div className="forgot-password">
        <a href="forgetPassword.jsx">Forgot your myLibrary username/Password?</a>
        <br />
        <a href="register.jsx">Don&apos;t have a myLibrary username? Apply now!</a>
      </div>
    </div>
    <LoginFooter2 />
    <LoginFooter />
    </>
  );
};

export default Login;