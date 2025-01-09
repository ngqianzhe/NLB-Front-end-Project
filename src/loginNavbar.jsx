import './loginNavbar.css'; // Import your CSS for styling
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NLBHomeLogo from './assets/NLB-home-coloured-logo.png';
import { Link } from 'react-router-dom';

const LoginNavbar = () => {
  return (
    <div className="navigation-bar-2">
        <div className="logo">
          <Link to="/">
              <img className="icon-brand" src={NLBHomeLogo} alt="NLB Logo" width="250" height="125"/> 
          </Link> 
        </div>
    </div>
  );
}

export default LoginNavbar;