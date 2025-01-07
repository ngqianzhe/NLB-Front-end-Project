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
        <a href="https://catalogue.nlb.gov.sg/">Books  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="https://eresources.nlb.gov.sg/main/browse?browseBy=type&filter=11">eBooks  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="https://eresources.nlb.gov.sg/main/browse?browseBy=type&filter=14">Magazines  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="https://eresources.nlb.gov.sg/main/browse?browseBy=type&filter=13">Newspapers  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="https://readingnation.nlb.gov.sg/">Reading Initiatives  <FontAwesomeIcon icon={faRightFromBracket} /></a>
      </div>
      <div className="footer-column-2">
        <h4>Learn with us</h4>
        <a href="https://eresources.nlb.gov.sg/main/browse?browseBy=type&filter=18">eLearning Resources  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="https://www.nlb.gov.sg/main/site/learnx/explore-communities">Learning Communities</a>
        <a href="https://www.nlb.gov.sg/main/site/learnx">LearnX</a> 
      </div>
      <div className="footer-column-2">
        <h4>Research with us</h4>
        <a href="https://www.nas.gov.sg/archivesonline/">Archives Online  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="https://www.nlb.gov.sg/main/nlonline">National Library Online</a>
        <a href="https://eresources.nlb.gov.sg/main#edatabases-panel">Subscribed eDatabases  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="https://eresources.nlb.gov.sg/main/Browse?browseBy=teens&filter=12">Subscribed eJournals  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="https://www.nlb.gov.sg/main/about-us/careers/research-fellowships">Research Fellowships</a>
      </div>
      <div className="footer-column-2">
        <h4>Careers</h4>
        <a href="https://sggovterp.wd102.myworkdayjobs.com/PublicServiceCareers?Agency=27bc56da9e6a012ad85768800407b009">Career Opportunities  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="https://www.nlb.gov.sg/main/about-us/careers">Working at NLB  <FontAwesomeIcon icon={faRightFromBracket} /></a>
        <a href="https://www.nlb.gov.sg/main/about-us/careers/scholarship">Scholarship</a>
      </div>
      <div className="footer-column-2">
        <h4>Join Our Mailing List</h4>
        <a href="https://form.gov.sg/#!/609b85e026e6060013d47580">Subscribe Now</a>
      </div>
      <div className="footer-column-2">
        <h4>Follow Us</h4>
        <div className="social-links-2">
          <a href="https://www.linkedin.com/company/national-library-board/?originalSubdomain=sg"><FontAwesomeIcon icon={faLinkedin} /></a>
          <a href="https://www.facebook.com/nlbsingapore"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="https://www.instagram.com/nlbsingapore/"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://www.youtube.com/c/nlbsg"><FontAwesomeIcon icon={faYoutube} /></a>
        </div>
      </div>
    </div>

    <div className="bottom-links-2">
      <a href="https://www.nlb.gov.sg/main/Contact-NLB">Contact Us</a>
      <a href="https://go.gov.sg/nlb-form-feedback">Feedback  <FontAwesomeIcon icon={faRightFromBracket} /></a>
      <a href="https://www.nlb.gov.sg/main/services/faqs">FAQ</a>
      <a href="https://www.nlb.gov.sg/main/Accessibility">Accessibility Information</a>
    </div>
  </div>
  );
}

export default footer2;