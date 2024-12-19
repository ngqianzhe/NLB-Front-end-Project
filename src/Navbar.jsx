import './Navbar.css'; // Import your CSS for styling
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Navbar() {
  return (
    <div>
        <div className="govt-banner-wrapper"> 
          <sgds-masthead fluid></sgds-masthead>
        </div> 
        <nav className="navbar navbar-expand-xl smart-scroll">
          <a className="navbar-brand icon" href="App.jsx" aria-current="page">
              <img src="NLB-home-logo.png" alt="NLB Logo" /> 
          </a> 
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="login.jsx"><FontAwesomeIcon icon={faUser} size="xl" color="white"/></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#"><FontAwesomeIcon icon={faSearch} size="xl" color="white"/></a>
                </li>
              </ul>
            </div>
        </nav>
    </div>
  );
}

export default Navbar;