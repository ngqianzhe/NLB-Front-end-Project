import './footer.css';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const date = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };

function footer() {
  return (
      <div className="footer">
      <div className="footer-content">
        <ul className="left-links">
          <li><a href="https://www.tech.gov.sg/report-vulnerability/" className="list-text">Report Vulnerability  <FontAwesomeIcon icon={faRightFromBracket} size="sm" color="grey"/></a></li>
          <li><a href="https://www.nlb.gov.sg/main/Privacy-Statement" className="list-text">Privacy Statement</a></li>
          <li><a href="https://www.nlb.gov.sg/main/Terms-of-Use" className="list-text">Terms of Use</a></li>
          <li><a href="https://www.tech.gov.sg/terms-of-use/" className="list-text">Other Policies</a></li>
        </ul>
        <div className="right-text">
          &copy; {date.getFullYear()} National Library Board. Last Updated: {date.toLocaleDateString('en-GB', options)}
        </div>
      </div>
    </div>
  );
}

export default footer;