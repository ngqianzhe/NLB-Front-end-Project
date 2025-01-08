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


const ForgetPassword = () => {
  function updateBackgroundColor() {
    const background = document.getElementById("root"); // Get the body element
  
    background.style.backgroundColor = "#fff4f4";
  }

  
  updateBackgroundColor();

  // Update the background color every hour
  setInterval(updateBackgroundColor, 60 * 60 * 1000); // 1 hour in milliseconds


  useEffect(() => {
    document.title = 'Recover your Password';
  }, []); // Empty dependency array ensures this runs only once


  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Enter your email address and we will send you an email to get your password.'); 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    if (!email) {
      alert("Please enter the email field!");
    }

    let users = JSON.parse(localStorage.getItem('users'));
    if (users === null) {
      alert('No user has been registered yet!');
      navigate('/register.jsx');
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
      const publicKey = '6GVjvZBmNnhep4RSx';
      const password = emailExists.password;
      await emailjs.send(serviceID, templateID, {
        to_email: email,
        subject: 'Password Reset Request',
        message: `You have requested to reset your password. 
          Here is your password: ${password} 

          If you did not request a password reset, please ignore this email.`,
      }, publicKey);


      setMessage('Password reset email sent! Redirecting to login in 5 seconds...');
      // Countdown and redirect
      let countdown = 5;
      const countdownInterval = setInterval(() => {
        countdown--;
        setMessage(`Password reset email sent! Redirecting to login in ${countdown} seconds...`);

        if (countdown === 0) {
          clearInterval(countdownInterval); // Stop the countdown
          navigate('/login.jsx'); 
        }
      }, 1000); // Update message every 1000 milliseconds (1 second)
      
    } catch (error) {
      console.error('Failed to send email:', error);
      setMessage('Error sending email. Refreshing the page in 5 seconds...');
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
    <div className="container"> {/* Add appropriate class names */}
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