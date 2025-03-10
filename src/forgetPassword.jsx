import './forgetPassword.css';
import { useEffect, useState } from 'react';
import LoginNavbar from './loginNavbar.jsx'; 
import LoginFooter from './loginFooter.jsx';
import LoginSocialFooter from './loginSocialFooter.jsx';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import emailjs from '@emailjs/browser';
import { v4 as uuidv4 } from 'uuid';

const ForgetPassword = () => {
  function getURLOrigin() {
    const currentURL = new URL(window.location.href);
    const origin = currentURL.origin;
    return origin;
  }

  function updateBackgroundColor() {
    const background = document.getElementById("root"); // Get the body element
  
    background.style.backgroundColor = "#fff4f4";
    
  }
  
  updateBackgroundColor();

  // Update the background color every hour
  setInterval(updateBackgroundColor, 60 * 60 * 1000); // 1 hour in milliseconds


  useEffect(() => {
    document.title = 'Oracle 23ai Select AI Demo - Recover your Password';
  }, []); // Empty dependency array ensures this runs only once


  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Enter your email address and we will send you an email to get your password.'); 
  const navigate = useNavigate();
  const generateUniqueToken = () => {
    return uuidv4();
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    if (!email) {
      alert("Please enter the email field!");
    }

    let users = JSON.parse(localStorage.getItem('users'));
    if (users === null) {
      alert('No user has been registered yet!');
      navigate('/register');
      return;
    }

    const emailExists = users.find(user => user.email === email);
    if (!emailExists) {
      alert('Email does not exist.');
      return;
    }
  
    try {
      // Send the email using EmailJS
      const serviceID = 'service_adup5tr';
      const templateID = 'template_teaz77q';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const username = emailExists.username;
      // Generate a unique token (replace with your token generation logic)
      const token = generateUniqueToken(); 

      // Construct the password reset link with the token as a query parameter
      const origin = getURLOrigin();
      const resetLink = `${origin}/resetPassword?token=${token}`;
      await emailjs.send(serviceID, templateID, {
        to_email: email,
        username: username,
        subject: 'Password Reset Request',
        message: `You have requested to reset your password. 
          Please click on the link to reset your password:
          ${resetLink}

          If you did not request a password reset, please ignore this email.`,
      }, publicKey);
      const emailData = {
        email: email,
        token: token,
        timeStored: new Date().getTime()
      };
      localStorage.setItem('existingEmail', JSON.stringify(emailData)); 
      // Get the existing users array from localStorage, or initialize an empty array
      // Countdown and redirect
      let countdown = 5;
      const countdownInterval = setInterval(() => {
        countdown--;
        setMessage(`Password reset email sent! Redirecting to the homepage in ${countdown} seconds...`);

        if (countdown === 0) {
          clearInterval(countdownInterval); // Stop the countdown
          navigate('/'); 
        }
      }, 1000); // Update message every 1000 milliseconds (1 second)
      
    } catch (error) {
      console.error('Failed to send email:', error);
      // Countdown and refresh
      let countdown = 5;
      const countdownInterval = setInterval(() => {
        countdown--;
        setMessage(`Error sending email. Refreshing the page in ${countdown} seconds...`);

        if (countdown === 0) {
          clearInterval(countdownInterval); // Stop the countdown
          window.location.reload();
        }
      }, 1000); // Update message every 1000 milliseconds (1 second)
    }
  }
  return (
    <>
    <LoginNavbar />
    <div className="forget-password-container"> {/* Add appropriate class names */}
      <h2>Forgot your <span style={{fontStyle: "italic"}}>password</span>?</h2>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            id="email"
            className="forgetPassword-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>
        <button className="email-button" type="submit">Send Email</button>
      </form>
    </div>
    <LoginSocialFooter />
    <LoginFooter />
    </>
  );
};

export default ForgetPassword;