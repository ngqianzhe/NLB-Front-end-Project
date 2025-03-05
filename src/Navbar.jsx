import './Navbar.css'; // Import your CSS for styling
import { faUser, faSearch, faXmark, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import OracleLogo from './assets/oracle-icon.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchIcon, setSearchIcon] = useState(faSearch);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Add state for popup visibility
  const [selectedRadio, setSelectedRadio] = useState(null); // State for selected radio button
  const navigate = useNavigate(); 

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setIsLoggedIn(true);
      setIsProfileDropdownVisible(false);
    }
  }, [isLoggedIn]); // Run only once on component mount

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsProfileDropdownVisible(true); // Close the dropdown
    // Redirect to the home page or login page after logout:
    navigate('/'); 
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="navigation-bar"> 
        <nav className="navbar navbar-expand-xl smart-scroll navigation">
          <div className="navbar-brand">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img className="icon" src={OracleLogo} alt="NLB Logo" /><h3 className="icon-name" style={{ color:'white', paddingTop: '10px', fontWeight: 'bold', fontFamily: 'Montserrat, serif', paddingInlineStart: '10px'}}>Oracle 23ai Select AI Demo for Libraries</h3>
            </Link> 
          </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <div className="profile-container"> 
                    <span className="nav-link">
                      {isLoggedIn ? (
                        <FontAwesomeIcon
                          className="user-icon"
                          icon={faSignOutAlt} // Use faCircleUser for logged-in users
                          size="xl"
                          color="white"
                          onClick={handleLogout}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="user-icon"
                          icon={faUser}
                          size="xl"
                          color="white"
                          onClick={handleProfileClick}
                        />
                      )}
                    </span>
                    {isProfileDropdownVisible && (
                      <div className="profile-dropdown">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/forgetPassword">Forget Password</Link>
                      </div>
                    )}
                  </div>
                </li>
                <li className="nav-item">
                  <span className="nav-link"> 
                    <FontAwesomeIcon className="search-icon" icon={searchIcon} onClick={toggleSearchPopup} size="xl" color="white"/>
                  </span>
                </li>
              </ul>  
            </div>
        </nav>
        <div className="search-popup" id="searchPopup" style={{ display: "none"}}> {/* Initially hidden */}
          <form onSubmit={handleSubmit}> {/* Add form for submission */}
            <FontAwesomeIcon icon={faSearch} size="lg" color="white" fontWeight="bold"/> <input type="text" id="searchInput" placeholder="What do you want to search for?" 
                  value={query} onChange={handleChange} />
            <button className="button-search" type="submit">Search</button> {/* Submit button */}
            <br /> <br />
            {/* Radio buttons with onChange handler */}
            <p style={{ color: "white", textAlign: "left", paddingInlineStart: "80px", marginBottom: "0"}}>Search: <br />
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