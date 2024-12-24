import './App.css';
import { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar.jsx'; 
import Footer from './footer.jsx';
import Footer2 from './footer2.jsx';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationDot, faArrowRight, faCreditCard, faBookOpen, faUserFriends, 
  faCalendarCheck, faBriefcase, faHandshake, faCaretDown,
  faFaceSmile,
  faFaceFrown,
  faFaceMeh
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
  const [selectedValue, setSelectedValue] = useState('National Library / Lee Kong Chian Reference Library');
  const [openingHours, setOpeningHours] = useState("Getting schedule..."); // State to store opening hours
  const [isLoading, setIsLoading] = useState(false);
  const [iconVisible, setIconVisible] = useState(true);
  console.log(iconVisible);
  const selectRef = useRef(null);
  const ratingIconRef = useRef(null); // Ref for the rating icon

  useEffect(() => {
    const handleMouseOut = (event) => {
      // Check if the mouse is leaving the rating icon or its children
      if (ratingIconRef.current && !ratingIconRef.current.contains(event.relatedTarget)) {
        setIconVisible(true);
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('mouseout', handleMouseOut);

    // Clean up the event listener when the component unmounts
    return () => document.removeEventListener('mouseout', handleMouseOut);
  }, []); // Empty dependency array ensures this runs only once
  
  useEffect(() => {
    const selectElement = selectRef.current;
    if (selectElement) {
      if (selectedValue === "National Library / Lee Kong Chian Reference Library") {
        selectElement.style.width = "400px";
        selectElement.style.marginInlineEnd = "-2px";
      }

      else if (selectedValue === "National Archives of Singapore") {
        selectElement.style.width = "220px";
        selectElement.style.marginInlineEnd = "-9px";
      }

      else if (selectedValue === "Ang Mo Kio Public Library") {
        selectElement.style.width = "190px";
        selectElement.style.marginInlineEnd = "-9px";
      }

      else if (selectedValue === "Bedok Public Library" || selectedValue === "Bishan Public Library") {
        selectElement.style.width = "150px";
        selectElement.style.marginInlineEnd = "-4px";
      }

      else if (selectedValue === "Bukit Batok Public Library") {
        selectElement.style.width = "180px";
        selectElement.style.marginInlineEnd = "-3px";
      }

      else if (selectedValue === "Central Arts Library") {
        selectElement.style.width = "150px";
        selectElement.style.marginInlineEnd = "-6px";
      }

      else if (selectedValue === "Choa Chu Kang Public Library") {
        selectElement.style.width = "210px";
        selectElement.style.marginInlineEnd = "-3px";
      }

      else if (selectedValue === "Central Public Library") {
        selectElement.style.width = "155px";
        selectElement.style.marginInlineEnd = "-3px";
      }

      else if (selectedValue === "Clementi Public Library") {
        selectElement.style.width = "165px";
        selectElement.style.marginInlineEnd = "-3px";
      }

      else if (selectedValue === "Cheng San Public Library") {
        selectElement.style.width = "180px";
        selectElement.style.marginInlineEnd = "-6px";
      }

      else if (selectedValue === "Geylang East Public Library") {
        selectElement.style.width = "190px";
        selectElement.style.marginInlineEnd = "-4px";
      }

      else if (selectedValue === "Jurong West Public Library") {
        selectElement.style.width = "180px";
        selectElement.style.marginInlineEnd = "-2px";
      }

      else if (selectedValue === "Marine Parade Public Library") {
        selectElement.style.width = "200px";
        selectElement.style.marginInlineEnd = "-4px";
      }

      else if (selectedValue === "Punggol Regional Library") {
        selectElement.style.width = "170px";
        selectElement.style.marginInlineEnd = "-1px";
      }

      else if (selectedValue === "Pasir Ris Public Library") {
        selectElement.style.width = "160px";
        selectElement.style.marginInlineEnd = "-3px";
      }

      else if (selectedValue === "Queenstown Public Library") {
        selectElement.style.width = "190px";
        selectElement.style.marginInlineEnd = "-4px";
      }

      else if (selectedValue === "Sembawang Public Library") {
        selectElement.style.width = "180px";
        selectElement.style.marginInlineEnd = "-2px";
      }

      else if (selectedValue === "Sengkang Public Library") {
        selectElement.style.width = "170px";
        selectElement.style.marginInlineEnd = "-3px";
      }

      else if (selectedValue === "Serangoon Public Library") {
        selectElement.style.width = "180px";
        selectElement.style.marginInlineEnd = "-5px";
      }

      else if (selectedValue === "Toa Payoh Public Library") {
        selectElement.style.width = "170px";
        selectElement.style.marginInlineEnd = "-3px";
      }

      else if (selectedValue === "Tampines Regional Library") {
        selectElement.style.width = "180px";
        selectElement.style.marginInlineEnd = "-2px";
      }

      else if (selectedValue === "Woodlands Regional Library") {
        selectElement.style.width = "190px";
        selectElement.style.marginInlineEnd = "-1px";
      }

      else if (selectedValue === "Yishun Public Library") {
        selectElement.style.width = "160px";
        selectElement.style.marginInlineEnd = "-7px";
      }

      else if (selectedValue === "The LLiBrary") {
        selectElement.style.width = "110px";
        selectElement.style.marginInlineEnd = "-7px";
      }

      else if (selectedValue === "Singapore Botanic Gardens' Library") {
        selectElement.style.width = "250px";
        selectElement.style.marginInlineEnd = "-7px";
      }

      else if (selectedValue === "library@chinatown") {
        selectElement.style.width = "140px";
        selectElement.style.marginInlineEnd = "-6px";
      }

      else if (selectedValue === "library@harbourfront") {
        selectElement.style.width = "160px";
        selectElement.style.marginInlineEnd = "-6px";
      }

      else if (selectedValue === "library@orchard") {
        selectElement.style.width = "130px";
        selectElement.style.marginInlineEnd = "-6px";
      }

      else if (selectedValue === "Jurong Regional Library") {
        selectElement.style.width = "170px";
        selectElement.style.marginInlineEnd = "-5px";
      }
    }
  }, [selectedValue]);

  const apiKey = ":2MncAowfQLadIE1?=2Ai%WF^voO6F%:";
  const appCode = "DEV-Vijay";
  useEffect(() => {
    const fetchOpeningHours = async () => {
      setIsLoading(true);
      try {
        const apiUrl = `https://cors-anywhere.herokuapp.com/https://openweb.nlb.gov.sg/api/v1/Library/GetBranches`;
        const response = await fetch(apiUrl, {
          headers: {
            'X-API-Key': apiKey,
            'X-App-Code': appCode,
            'Origin': 'http://localhost:5173'
          }
        });

        const data = await response.json();
        const library = data.branches.find(branch => branch.branchName === selectedValue);
        const messageText = document.querySelector(".message");

        if (library) {
          const schedule = library.timing.openingHours; // Get today's schedule
          const closureSchedules = library.closureSchedules;
          const openingHours = schedule.replace(/.*?:/, '').trim();
          const openingTime = openingHours.split("-")[0];
          const closingTime = openingHours.split("-")[1]; // "09:00 PM"
          const hourString = closingTime.split(":")[0];
          const hourWithoutZero = hourString.replace(/^0+/, '');
          const hourInt = parseInt(hourWithoutZero) + 12;
          const now = new Date().getHours();
          const today = new Date().toLocaleDateString(); // Get today's date in YYYY-MM-DD format
          const dateParts = today.split("/");
          const year = dateParts[2];
          const month = dateParts[1]; 
          const day = dateParts[0];

          const todaysDate = `${year}-${month}-${day}`;
          const todaysClosure = closureSchedules.some(schedule => schedule.date === todaysDate);
          if (todaysClosure) {
            messageText.innerHTML = "";
            setOpeningHours('Closed today due to a public holiday!'); 
            return; // Exit early if closed
          }

          if (now <= hourInt) {
            messageText.innerHTML = "Open today from <br />";
            setOpeningHours (`${openingTime} to ${closingTime}`);
          } else { 
            messageText.innerHTML = "";
            setOpeningHours('Closed today'); 
          }
        } else {
          messageText.innerHTML = "";
          setOpeningHours('Schedule NOT Available'); 
        }
      } catch (error) {
        const messageText = document.querySelector(".message");
        messageText.innerHTML = "";
        console.error(error);
        setOpeningHours('Schedule NOT Available');
      } finally {
        setIsLoading(false); // Set loading to false when fetching completes (or fails)
      }
    };

    if (selectedValue) {
      fetchOpeningHours();
    }
  }, [selectedValue]); // Re-fetch when selectedValue changes

  const handleChange = (event) => {
    const messageText = document.querySelector(".message");
    messageText.innerHTML = "";
    setSelectedValue(event.target.value);
  };

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
              <select ref={selectRef} value={selectedValue} onChange={handleChange} title="Select Libraries">
                  <option value="National Library / Lee Kong Chian Reference Library">National Library / Lee Kong Chian Reference Library</option>
                  <option value="National Archives of Singapore">National Archives of Singapore</option>
                  <option value="Ang Mo Kio Public Library">Ang Mo Kio Public Library</option>
                  <option value="Bedok Public Library">Bedok Public Library</option>
                  <option value="Bishan Public Library">Bishan Public Library</option>
                  <option value="Bukit Batok Public Library">Bukit Batok Public Library</option>
                  <option value="Bukit Panjang Public Library">Bukit Panjang Public Library</option>
                  <option value="Central Arts Library">Central Arts Library</option>
                  <option value="Central Public Library">Central Public Library</option>
                  <option value="Choa Chu Kang Public Library">Choa Chu Kang Public Library</option>
                  <option value="Cheng San Public Library">Cheng San Public Library</option>
                  <option value="Clementi Public Library">Clementi Public Library</option>
                  <option value="Geylang East Public Library">Geylang East Public Library</option>
                  <option value="Jurong Regional Library">Jurong Regional Library</option>
                  <option value="Jurong West Public Library">Jurong West Public Library</option>
                  <option value="library@chinatown">library@chinatown</option>
                  <option value="library@harbourfront">library@harbourfront</option>
                  <option value="library@orchard">library@orchard</option>
                  <option value="Marine Parade Public Library">Marine Parade Public Library</option>
                  <option value="Punggol Regional Library">Punggol Regional Library</option>
                  <option value="Pasir Ris Public Library">Pasir Ris Public Library</option>
                  <option value="Queenstown Public Library">Queenstown Public Library</option>
                  <option value="Sembawang Public Library">Sembawang Public Library</option>
                  <option value="Sengkang Public Library">Sengkang Public Library</option>
                  <option value="Serangoon Public Library">Serangoon Public Library</option>
                  <option value="Singapore Botanic Gardens' Library">Singapore Botanic Gardens&apos; Library</option>
                  <option value="Tampines Regional Library">Tampines Regional Library</option>
                  <option value="The LLiBrary">The LLiBrary</option>
                  <option value="Toa Payoh Public Library">Toa Payoh Public Library</option>
                  <option value="Woodlands Regional Library">Woodlands Regional Library</option>
                  <option value="Yishun Public Library">Yishun Public Library</option>
              </select>
              <FontAwesomeIcon style={{textAlign: "center"}} icon={faCaretDown} color="white" size="sm" />
            </div>

            <div className="hours">
              <span className="message"></span>
              {isLoading ? (
                <span style={{ fontWeight: "bold" }}>Getting schedule...</span> 
              ) : (
                <>
                  <span className="message"></span> {/* Now outside the conditional */}
                  <span style={{ fontWeight: "bold" }}>{openingHours}</span> 
                </>
              )}
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
          <div className="rating-icon" ref={ratingIconRef} onMouseEnter={() => setIconVisible(false)}>
            {iconVisible && ( 
            <FontAwesomeIcon 
            className="icon-rating" 
            style={{
            border: "5px solid black", 
            borderRadius: "13px", 
            backgroundColor: "black"
            }}
            icon={faFaceSmile} 
            size="2x" 
            color="yellow" 
            />
            )}
            <div className="rating-button">
              <span className="text">Help us improve</span>
              <div className="rating-faces">
                <span style={{fontSize:"10px"}}>Rate your experience with this website</span>
                <div>
                  <FontAwesomeIcon style={{backgroundColor:"black", borderRadius: "11px", border: "1.5px solid black"}} icon={faFaceFrown} color="white" size="sm" />  
                  <FontAwesomeIcon style={{backgroundColor:"black", borderRadius: "11px", border: "1.5px solid black"}} icon={faFaceMeh} color="white" size="sm" />
                  <FontAwesomeIcon style={{backgroundColor:"black", borderRadius: "11px", border: "1.5px solid black"}} icon={faFaceSmile} color="white" size="sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
      <Footer />
    </>
  );
};

export default Home;