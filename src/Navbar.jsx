import './Navbar.css'; // Import your CSS for styling
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function toggleSearchPopup() {
  const searchPopup = document.querySelector(".search-popup");
  const now = new Date();
  const hour = now.getHours();
  const navbar = document.querySelector(".navbar"); 

  if (searchPopup) {
    searchPopup.style.display = searchPopup.style.display === "none" ? "block" : "none"; 
    if (hour >= 18 || hour < 5) { 
      searchPopup.style.backgroundColor = "#101c2c"; 
    }

    if (navbar) {
      // Toggle the border-bottom style
      if (navbar.style.borderBottom === "none") {
        navbar.style.borderBottom = "1px solid white"; // Add border
      } else {
        navbar.style.borderBottom = "none"; // Remove border
      }
    } 
  } 
}

function performSearch() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    const searchTerm = searchInput.value;
    // ... (construct the URL and redirect) ...
    const url = `/search-results?q=${searchTerm}`; 
    window.location.href = url; // Redirect to the search results page
  } else {
    console.error("Search input element not found!");
  }
}

// Update the background color every hour
setInterval(toggleSearchPopup, 60 * 60 * 1000); // 1 hour in milliseconds

function Navbar() {
  return (
    <div className="navigation-bar">
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
                  <span className="nav-link" onClick={toggleSearchPopup}> 
                    <FontAwesomeIcon className="search-icon" icon={faSearch} size="xl" color="white"/>
                  </span>
                </li>
              </ul>  
            </div>
        </nav>
        <div className="search-popup" id="searchPopup" style={{ display: "none"}}> {/* Initially hidden */}
            <FontAwesomeIcon className="search-icon" icon={faSearch} size="lg" color="white" fontWeight="bold"/>    <input type="text" id="searchInput" placeholder="What do you want to search for?" />
            <button className="button" type="button" onClick={performSearch()}>Search</button>
            <br /> <br />
            <p style={{ color: "white", textAlign: "left", paddingInlineStart: "70px" }}>Search: 
              <label style={{ marginLeft: "10px" }} htmlFor="option1">
                <input type="radio" id="option1" name="myRadioGroup" value="option1" /> OneSearch
              </label>

              <label style={{ marginLeft: "20px" }} htmlFor="option2">
                <input type="radio" id="option2" name="myRadioGroup" value="option2" /> Catalogue
              </label>

              <label style={{ marginLeft: "20px" }} htmlFor="option3">
                <input type="radio" id="option3" name="myRadioGroup" value="option3" /> Search Within this Site
              </label>
            </p>
        </div>
    </div>
  );
}

export default Navbar;