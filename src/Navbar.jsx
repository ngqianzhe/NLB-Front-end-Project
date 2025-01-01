import './Navbar.css'; // Import your CSS for styling
import { faUser, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState } from 'react';

const Navbar = () => {
  const [searchIcon, setSearchIcon] = useState(faSearch);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Add state for popup visibility
  const [selectedRadio, setSelectedRadio] = useState(null); // State for selected radio button
  function toggleSearchPopup() {
    const searchPopup = document.querySelector(".search-popup");
    const now = new Date();
    const hour = now.getHours();
    const navbar = document.querySelector(".navbar"); 
    const navItem = document.querySelector(".nav-item");
    setIsPopupOpen(!isPopupOpen); // Toggle popup visibility
  
    if (searchPopup) {
      searchPopup.style.display = searchPopup.style.display === "none" ? "block" : "none"; 
      setSearchIcon(searchIcon === faSearch ? faXmark : faSearch);
      if (hour >= 18 || hour < 5) { 
        searchPopup.style.backgroundColor = "#101c2c"; 
      }
  
      if (navbar) {
        // Toggle the border-bottom style
        if (navbar.style.borderBottom === "none") {
          navbar.style.borderBottom = "1px solid white"; // Add border
          navItem.style.paddingInlineEnd = "2em";
        } else {
          navbar.style.borderBottom = "none"; // Remove border
          navItem.style.paddingInlineEnd = "2.5em";
        }
      }
    } 
  }

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Determine the URL based on the selected radio button
    let url;
    switch (selectedRadio) {
      case 'option1': // OneSearch
        url = "https://search.nlb.gov.sg/onesearch/Search?query=" + encodeURIComponent(query) + "&cont="; 
        break;
      case 'option2': // Catalogue
        url = "https://catalogue.nlb.gov.sg/?query=" + encodeURIComponent(query);
        break;
      case 'option3': // Search Within this Site
        url =  "https://www.nlb.gov.sg/main/search"; // Or your specific URL for site search
        break;
      default: 
        url = "https://www.nlb.gov.sg/main/search"; // Default to general search
    }

    window.location.href = url;
  };

  const [query, setQuery] = useState('');

  const handleChange = (event) => { 
    setQuery(event.target.value);
  };

  // Update the background color every hour
  setInterval(toggleSearchPopup, 60 * 60 * 1000); // 1 hour in milliseconds

  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);

  const handleProfileClick = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };

  return (
    <div className="navigation-bar">
        <div className="govt-banner-wrapper"> 
          <sgds-masthead fluid></sgds-masthead>
        </div> 
        <nav className="navbar navbar-expand-xl smart-scroll">
          <a className="navbar-brand icon" href="/" aria-current="page">
              <img src="NLB-home-logo.png" alt="NLB Logo" /> 
          </a> 
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <div className="profile-container"> 
                    <span className="nav-link" onClick={handleProfileClick}>
                      <FontAwesomeIcon className="user-icon" icon={faUser} size="xl" color="white" /> {/* Use faUser icon */}
                    </span>
                    {isProfileDropdownVisible && (
                      <div className="profile-dropdown">
                        <a href="login.jsx">Login</a>
                        <a href="register.jsx">Register</a>
                        <a href="forgetPassword.jsx">Forgot Password</a>
                      </div>
                    )}
                  </div>
                </li>
                <li className="nav-item">
                  <span className="nav-link" onClick={toggleSearchPopup}> 
                    <FontAwesomeIcon className="search-icon" icon={searchIcon} size="xl" color="white"/>
                  </span>
                </li>
              </ul>  
            </div>
        </nav>
        <div className="search-popup" id="searchPopup" style={{ display: "none"}}> {/* Initially hidden */}
          <form onSubmit={handleSubmit}> {/* Add form for submission */}
          <FontAwesomeIcon icon={faSearch} size="lg" color="white" fontWeight="bold"/> <input type="text" id="searchInput" placeholder="What do you want to search for?" 
                 value={query} onChange={handleChange} />
          <button className="button" type="submit">Search</button> {/* Submit button */}
          <br /> <br />
          {/* Radio buttons with onChange handler */}
          <p style={{ color: "white", textAlign: "left", paddingInlineStart: "70px" }}>Search: 
            <label style={{ marginLeft: "10px" }} htmlFor="option1">
              <input type="radio" id="option1" name="myRadioGroup" value="option1" 
                     checked={selectedRadio === 'option1'} onChange={handleRadioChange} /> OneSearch
            </label>

            <label style={{ marginLeft: "20px" }} htmlFor="option2">
              <input type="radio" id="option2" name="myRadioGroup" value="option2" 
                     checked={selectedRadio === 'option2'} onChange={handleRadioChange} /> Catalogue
            </label>

            <label style={{ marginLeft: "20px" }} htmlFor="option3">
              <input type="radio" id="option3" name="myRadioGroup" value="option3" 
                     checked={selectedRadio === 'option3'} onChange={handleRadioChange} /> Search Within this Site
            </label>
          </p>
        </form>
        </div>
    </div>
  );
}

export default Navbar;