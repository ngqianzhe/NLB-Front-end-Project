import './footer2.css';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const footer2 = () => {
  return (
    <div className="footer-2">
      <a href="/">
        <img src="NLB-home-coloured-logo.png" alt="Logo" className="footer-image" />
      </a>
    <div className="footer-content-2">
      <div className="footer-column-2">
        <h4>Read with us</h4>
        <a href="#">Books  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="#">eBooks  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="#">Magazines  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="#">Newspapers  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="#">Reading Initiatives  <FontAwesomeIcon icon={faRightFromBracket} /></a>
      </div>
      <div className="footer-column-2">
        <h4>Learn with us</h4>
        <a href="#">eLearning Resources  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="#">Learning Communities</a>
        <a href="#">LearnX</a> 
      </div>
      <div className="footer-column-2">
        <h4>Research with us</h4>
        <a href="#">Archives Online  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="#">National Library Online</a>
        <a href="#">Subscribed eDatabases  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="#">Subscribed eJournals  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="#">Research Fellowships</a>
      </div>
      <div className="footer-column-2">
        <h4>Careers</h4>
        <a href="#">Career Opportunities  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="#">Working at NLB  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="#">Scholarship</a>
      </div>
      <div className="footer-column-2">
        <h4>Join Our Mailing List</h4>
        <a href="#">Subscribe Now</a>
      </div>
      <div className="footer-column-2">
        <h4>Follow Us</h4>
        <div className="social-links-2">
          <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
          <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
          <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
        </div>
      </div>
    </div>

    <div className="bottom-links-2">
      <a href="#">Contact Us</a>
      <a href="#">Feedback  <FontAwesomeIcon icon={faRightFromBracket} /></a>
      <a href="#">FAQ</a>
      <a href="#">Accessibility Information</a>
    </div>
  </div>
  );
}

export default footer2;