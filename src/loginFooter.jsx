import './loginFooter.css';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const loginFooter = () => {
  const date = new Date();
  return (
      <div className="loginFooter">
      <div className="login-footer-content">
        <ul className="login-left-links">
          <li><a href="https://www.tech.gov.sg/report-vulnerability/" className="login-list-text">Report Vulnerability  <FontAwesomeIcon icon={faRightFromBracket} size="sm" color="black"/></a></li>
          <li><a href="https://www.nlb.gov.sg/main/Privacy-Statement" className="login-list-text">Privacy Statement</a></li>
          <li><a href="https://www.nlb.gov.sg/main/Terms-of-Use" className="login-list-text">Terms of Use</a></li>
          <li><a href="https://www.tech.gov.sg/terms-of-use/" className="login-list-text">Other Policies</a></li>
        </ul>
        <div className="login-right-text">
          &copy; {date.getFullYear()} Government of Singapore
        </div>
      </div>
    </div>
  );
}

export default loginFooter;