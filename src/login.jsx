import './login.css';
import { useState, useEffect } from 'react';
import LoginNavbar from './loginNavbar.jsx'; 
import LoginFooter from './loginFooter.jsx';
import LoginSocialFooter from './loginSocialFooter.jsx';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

const Login = () => {
  function updateBackgroundColor() {
    const background = document.getElementById("root"); // Get the body element
    background.style.backgroundColor = "#fff4f4";
  }

  
  updateBackgroundColor();

  // Update the background color every hour
  setInterval(updateBackgroundColor, 60 * 60 * 1000); // 1 hour in milliseconds
  
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

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Add your login logic here (e.g., send data to server)

    if (!username || !password) {
      alert('Please fill in all fields.');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users'));
    if (users === null) {
      alert('No user has been registered yet!');
      navigate('/register');
      return;
    }

    const usernameExists = users.find(user => user.username === username);

    if (!usernameExists) {
      alert('Username is not found in the system!');
      return;
    }

    else {
      const passwordExists = users.find(user => user.password === password);
      if (!passwordExists) {
        alert('Incorrect Password!');
        return;
      }
    }

    const userData = { username, password }; 
    sessionStorage.setItem('user', JSON.stringify(userData));
    navigate('/'); 
    window.location.reload();
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <LoginNavbar />
    <div className="login-container">
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
          required
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

        <button className="login-button" type="submit">CONTINUE</button>
      </form>

      <div className="forgot-password">
        <Link to="/forgetPassword">Forgot your myLibrary username/Password?</Link>
        <br />
        <Link to="/register">Don&apos;t have a myLibrary username? Apply now!</Link>
      </div>
    </div>
    <LoginSocialFooter />
    <LoginFooter />
    </>
  );
};

export default Login;