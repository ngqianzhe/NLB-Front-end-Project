import './App.css';
import { useEffect } from 'react';
import Navbar from './Navbar.jsx'; 
import Footer from './footer.jsx';
import Footer2 from './footer2.jsx';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationDot, faArrowRight, faCreditCard, faBookOpen, faUserFriends, 
  faCalendarCheck, faBriefcase, faHandshake 
} from '@fortawesome/free-solid-svg-icons'; 

const Home = () => {  
  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

  function updateBackgroundColor() {
    const now = new Date();
    const hour = now.getHours();
    const background = document.getElementById("root"); // Get the body element
  
    if (hour >= 18 || hour < 5) { // Evening time (6 PM to 5 AM)
      background.style.backgroundColor = "#101c2c"; // Darker color
    }
  }

  updateBackgroundColor();

  // Update the background color every hour
  setInterval(updateBackgroundColor, 60 * 60 * 1000); // 1 hour in milliseconds

  useEffect(() => {
    // Update the greeting initially
    updateGreeting();

    // Update the greeting every minute
    const intervalId = setInterval(updateGreeting, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once after initial render

  function updateGreeting() {
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) { 
      greetingElement.textContent = getGreeting();
    }
  }

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "left", paddingInlineStart: "20px", color: "white", marginTop: "3rem", marginBottom: "5rem" }}>
        <h6 id="greeting" style={{fontWeight: "bold"}}></h6>
        <h4 id="header" style={{textAlign: "center", fontWeight: "bold"}}>What would you like to do today?</h4> <br />
        <div className="content-wrapper">
          <div className="container-box">
            <h4 style={{fontWeight: "bold"}}>Plan Your Visit</h4>

            <div className="location">
              <FontAwesomeIcon style={{marginRight: "3px", textAlign: "center"}} icon={faLocationDot} color="white" size="sm" />
              <select>
                <option>National Library / Lee Kong Chian Reference Library</option>
                <option>National Archives of Singapore</option>
                <option>Ang Mo Kio Public Library</option>
                <option>Bedok Public Library</option>
                <option>Bishan Public Library</option>
                <option>Bukit Batok Public Library</option>
              </select>
            </div>

            <div className="hours">
              Open today from <br />
              <span style={{fontWeight: "bold"}}>10:00 AM to 09:00 PM</span>
            </div>

            <a href="https://www.nlb.gov.sg/main/visit-us/our-libraries-and-locations/libraries/national-archives-of-singapore" className="button-container">Go to the library <FontAwesomeIcon icon={faArrowRight} color="#002d72" size="lg"/></a>
          </div>
          <div className="card-container">
            <a className="button-cards" href="https://www.nlb.gov.sg/main/services/library-membership">
            <div className="parallel-card">
              <div className="card-content">
                <FontAwesomeIcon className="card-icon" style={{marginBottom: "10px"}} icon={faCreditCard} size="3x" color="white" />
                <p>NLB Membership</p>
              </div>
            </div>
            </a>
            <a className="button-cards" href="https://catalogue.nlb.gov.sg/">
            <div className="parallel-card">
              <div className="card-content">
                <FontAwesomeIcon className="card-icon" style={{marginBottom: "10px"}} icon={faBookOpen} size="3x" color="white" /> 
                <p>NLB Digital Resources</p>
              </div>
            </div>
            </a>
            <a className="button-cards" href="https://www.nlb.gov.sg/main/services/Loans-and-Reservations">
            <div className="parallel-card">
              <div className="card-content">
                <FontAwesomeIcon className="card-icon" style={{marginBottom: "10px"}} icon={faUserFriends} size="3x" color="white" /> 
                <p>Loans and Reservations</p>
              </div>
            </div>
            </a>
            <a className="button-cards" href="https://www.nlb.gov.sg/main/services/facilities/book-room-or-venue">
            <div className="parallel-card">
              <div className="card-content">
                <FontAwesomeIcon className="card-icon" style={{marginBottom: "10px"}} icon={faCalendarCheck} size="3x" color="white" /> 
                <p>Book a Room or Venue</p>
              </div>
            </div>
            </a>
            <a className="button-cards" href="https://www.nlb.gov.sg/main/about-us/careers">
            <div className="parallel-card">
              <div className="card-content">
                <FontAwesomeIcon className="card-icon" style={{marginBottom: "10px"}} icon={faBriefcase} size="3x" color="white" /> 
                <p>Explore a Career with Us</p>
              </div>
            </div>
            </a>
            <a className="button-cards" href="https://www.nlb.gov.sg/main/partner-us">
            <div className="parallel-card">
              <div className="card-content">
                <FontAwesomeIcon className="card-icon" style={{marginBottom: "10px"}} icon={faHandshake} size="3x" color="white" /> 
                <p>Partner Us</p>
              </div>
            </div>
            </a>
          </div>
        </div>
      </div>
      <Footer2 />
      <Footer />
    </>
  );
};

export default Home;