import './login.css';
import { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar.jsx'; 
import Footer from './footer.jsx';
import Footer2 from './footer2.jsx';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
  return (
    <>
    <Navbar />
    <div>
      
    </div>
    <Footer2 />
    <Footer />
    </>
  );
};

export default Login;