import './loginFooter2.css';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const loginFooter2 = () => {
  return (
      <div className="loginFooter2">
        <a href="/" className="footer-text">National Library Board</a> 
          <nav className="footer-nav">
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <a href="https://www.nlb.gov.sg/main/Contact-NLB" className="footer-nav-link">Contact Us</a>
              </li>
              <li className="footer-nav-item">
                <a href="https://go.gov.sg/nlb-form-feedback" className="footer-nav-link">Feedback <FontAwesomeIcon icon={faRightFromBracket} size="sm" color="black"/></a>
              </li>
              <li className="footer-nav-item">
                <a href="https://www.nlb.gov.sg/main/services/faqs/NLB-Mobile" className="footer-nav-link">FAQ</a>
              </li>
            </ul>
          </nav>
      </div>
  );
}

export default loginFooter2;