import './forgetPassword.css';
import { useEffect } from 'react';
import Navbar2 from './Navbar2.jsx'; 
import LoginFooter from './loginFooter.jsx';
import LoginFooter2 from './loginFooter2.jsx';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ForgetPassword = () => {
  function updateBackgroundColor() {
    const background = document.getElementById("root"); // Get the body element
  
    background.style.backgroundColor = "white";
  }

  
  updateBackgroundColor();

  useEffect(() => {
    document.title = 'Recover your Password';
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
    <Navbar2 />
    <div>
      
    </div>
    <LoginFooter2 />
    <LoginFooter />
    </>
  );
};

export default ForgetPassword;