import './resetPassword.css';
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

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const [validLink, setValidLink] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const currentURL = new URL(window.location.href);
  const params = new URLSearchParams(currentURL.search);

  function updateTokenExpiry() {
      let currentTime = new Date().getTime();
      try {
        const recordedTime = JSON.parse(localStorage.getItem('existingEmail')).timeStored;
        const expiryTime = recordedTime + (5 * 60 * 1000);
        if (currentTime >= expiryTime) {
          localStorage.removeItem('existingEmail');
        }
      }
      catch (error) {
        console.log(error);
        window.location.href = '/login';
      }
  }

  function updateBackgroundColor() {
    const background = document.getElementById("root"); // Get the body element
    background.style.backgroundColor = "#fff4f4";
  }

  function updatePassword(email, newPassword) {
    let usersJSON = JSON.parse(localStorage.getItem('users'));
    const userIndex = usersJSON.findIndex(user => user.email === email);
    if (userIndex === -1) {
      return false;
    }
    sessionStorage.setItem('oldPassword', usersJSON[userIndex].password);
    usersJSON[userIndex].password = newPassword; 
    let users = usersJSON.filter(user => user.email === email);
    let oldPassword = sessionStorage.getItem('oldPassword');
    if (users.password === oldPassword) {
      localStorage.removeItem('users', JSON.stringify(users));
      sessionStorage.removeItem('oldPassword');
    }
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
  
  updateBackgroundColor();
  updateTokenExpiry();
  // Update the background color every hour
  setInterval(updateBackgroundColor, 60 * 60 * 1000); // 1 hour in milliseconds
  setInterval(updateTokenExpiry, 1 * 60 * 1000);
  useEffect(() => {
    document.title = 'Reset your Password';
  }, []); // Empty dependency array ensures this runs only once

  
  useEffect(() => {
    const token = params.get('token'); 
    let email = JSON.parse(localStorage.getItem('existingEmail'));
    let existingToken = email.token;
    // Replace this with your actual token validation logic
    if (token === existingToken) { 
      setValidLink(true);
    } else {
      navigate('/login'); // Redirect if the token is invalid
    }
  }, [params, navigate]); 

  if (!validLink) {
    return null; // Don't render the component if the link is invalid
  }

  // ... rest of your ResetPassword component code ...
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmedPasswordChange = (event) => {
    setConfirmedPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    // Add your login logic here (e.g., send data to server)

    if (!password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match, please try again.');
      window.location.reload();
      return;
    }

    let email = JSON.parse(localStorage.getItem('existingEmail')).email;
    let users = JSON.parse(localStorage.getItem('users'));

    const emailExists = users.find(user => user.email === email);

    if (!emailExists) {
      alert('There is no such registered user in the system!');
      navigate('/'); 
      localStorage.removeItem('existingEmail');
      window.location.reload();
      return;
    }
    updatePassword(email, password);
    let username = emailExists.username;
    const userData = { username, password }; 
    sessionStorage.setItem('user', JSON.stringify(userData));
    // Countdown and redirect
    let countdown = 5;
    const countdownInterval = setInterval(() => {
      countdown--;
      setMessage(`Password resetted! Redirecting to login in ${countdown} seconds...`);

      if (countdown === 0) {
        clearInterval(countdownInterval); // Stop the countdown
        localStorage.removeItem('existingEmail');
        navigate('/login'); 
        window.location.reload();
      }
    }, 1000); // Update message every 1000 milliseconds (1 second)
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmedPasswordVisibility = () => {
    setShowConfirmedPassword(!showConfirmedPassword);
  }

  return (
    <>
    <LoginNavbar />
    <div className="reset-password-container">
      <h2>Reset your <span style={{fontStyle: "italic"}}>password</span></h2>
      <p>{message}</p>
      <form onSubmit={handleSubmit}> {/* Add form element with onSubmit */}
        <div className="password-input-container">
          <input
            className="reset-input"
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
        <div className="confirm-password-input-container">
          <input
            className="reset-input"
            type={showConfirmedPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmedPasswordChange}
            required
          />
          <FontAwesomeIcon 
            icon={showConfirmedPassword ? faEyeSlash : faEye} 
            className="confirm-password-icon" 
            onClick={toggleConfirmedPasswordVisibility}
            color="white"
            size="sm" 
          />
        </div>
      
        <button className="reset-button" type="submit">Reset</button>
      </form>

      <div className="forgot-password">
        <Link to="https://www.nlb.gov.sg/main/Contact-NLB">Can&apos;t reset your password? Contact NLB to resolve your issue.</Link>
      </div>

    </div>
    <LoginSocialFooter />
    <LoginFooter />
    </>
  );
};

export default ResetPassword;