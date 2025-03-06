import './Home.css';
import { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar.jsx'; 
import Footer from './footer.jsx';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
} from "@chatscope/chat-ui-kit-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationDot, faArrowRight, faCaretDown,
  faFaceSmile,
  faFaceFrown,
  faFaceMeh,
  faFaceLaughBeam,
  faFaceAngry,
  faFaceGrin,
  faXmark,
  faCommentDots,
  faPaperclip,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons'; 
import LibraryLogo from './assets/Library.jpg';

const Home = () => {  
  /*function getOriginWithoutPort() {
    const url = new URL(window.location.href);
    return url.origin.replace(/:\d+$/, ''); 
  }*/

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    document.title = 'Oracle 23ai Select AI Demo for Libraries';
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

  // Update the greeting every minute
  const intervalId = setInterval(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, 60000);

  // Clean up the interval when the component unmounts
  return () => clearInterval(intervalId);
}, []); // Empty dependency array ensures this runs only once

  const [selectedValue, setSelectedValue] = useState('National Library / Lee Kong Chian Reference Library');
  const [openingHours, setOpeningHours] = useState("Getting schedule..."); // State to store opening hours
  const [isLoading, setIsLoading] = useState(false);
  const [iconVisible, setIconVisible] = useState(true);
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
        selectElement.style.width = "150px";
        selectElement.style.marginInlineEnd = "-1px";
      }

      else if (selectedValue === "National Archives of Singapore") {
        selectElement.style.width = "140px";
        selectElement.style.marginInlineEnd = "-5px";
      }

      else if (selectedValue === "Ang Mo Kio Public Library") {
        selectElement.style.width = "190px";
        selectElement.style.marginInlineEnd = "-5px";
      }

      else if (selectedValue === "Bedok Public Library") {
        selectElement.style.width = "180px";
        selectElement.style.marginInlineEnd = "-4px";
      }

      else if (selectedValue === "Bishan Public Library") {
        selectElement.style.width = "150px";
        selectElement.style.marginInlineEnd = "-3px";
      }
    }
  }, [selectedValue]);

  useEffect(() => {
    const fetchOpeningHours = async () => {
      setIsLoading(true);
      try {
        /*const origin = getOriginWithoutPort();
        const apiUrl = `${origin}:3400/NLB`;
        */const apiUrl = 'http://138.2.104.173:3400/NLB';
        const response = await fetch(apiUrl);
        const data = await response.json();
        const library = data.branches.find(branch => branch.branchName === selectedValue);
        const messageText = document.querySelector(".message");
        
        const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        if (library) {
          const schedule = library.timing.openingHours; // Get today's schedule
          const days = schedule.split(": ")[0];
          const closingDayName = days.split(" - ")[1];
          const closingDay = daysOfWeek.indexOf(closingDayName);
          const currentDay = new Date().getDay();
          const closureSchedules = library.closureSchedules;
          const openingHours = schedule.replace(/.*?:/, '').trim();
          const openingTime = openingHours.split("-")[0];
          const closingTime = openingHours.split("-")[1]; // "09:00 PM"
          const closinghourString = closingTime.split(":")[0];
          const closinghourWithoutZero = closinghourString.replace(/^0+/, '');
          const closinghourInt = parseInt(closinghourWithoutZero) + 12;
          const openinghourString = openingTime.split(":")[0];
          const openinghourWithoutZero = openinghourString.replace(/^0+/, '');
          const openinghourInt = parseInt(openinghourWithoutZero);
          const now = new Date().getHours();
          const minute = new Date().getMinutes();
          const today = new Date().toLocaleDateString(); // Get today's date in YYYY-MM-DD format
          const dateParts = today.split("/");
          const year = dateParts[2];
          const month = dateParts[1]; 
          const day = dateParts[0];

          const todaysDate = `${year}-${month}-${day}`;
          const dateObj = new Date(todaysDate);
          const todaysMonth = dateObj.getMonth() + 1; 
          const todaysDay = dateObj.getDate();
          const todaysClosure = closureSchedules.some(schedule => {
            const scheduleDate = new Date(schedule.date);
            return scheduleDate.getMonth() + 1 === todaysMonth && scheduleDate.getDate() === todaysDay;
          });
          if (todaysClosure) {
            messageText.innerHTML = "";
            setOpeningHours('Closed today due to a public holiday!'); 
            return; // Exit early if closed
          }

          if ((now < closinghourInt && minute > 0) && (now > openinghourInt && minute > 0) && (closingDayName == "Sun" || closingDay >= currentDay)) {
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
        console.log(error);
        const messageText = document.querySelector(".message");
        messageText.innerHTML = "";
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

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5); // Countdown state

  const handleVisibleClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    let timer;
    if (ratingSubmitted) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } 

    // Clean up the timer when the countdown reaches 0 or ratingSubmitted is false
    if (countdown === 0 || !ratingSubmitted) {
      clearInterval(timer);
      setRatingSubmitted(false);
      setIsPopupVisible(false);
      setCountdown(5); // Reset countdown
    }

    return () => clearInterval(timer);
  }, [ratingSubmitted, countdown]);


  const handleFaceIconClick = () => {
    setRatingSubmitted(true); 
  };


  useEffect(() => {
    const popupElement = document.querySelector('.rating-faces');
    const ratingButton = document.querySelector('.rating-icon');
    if (popupElement) {
      popupElement.style.display = isPopupVisible ? 'block' : 'none';
      ratingButton.style.display = isPopupVisible ? 'none' : 'block';
    }
  }, [isPopupVisible]);

  // Function to handle both close icon and rating button click
  const handleTogglePopup = () => {
    setIsPopupVisible(prevState => !prevState);
  }

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(''); // State to track selected chat

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
    if (chat === 'Ask my Library') {
      setMessages([
        {
          message:
          `Hello ${chatbotUsername}! You can ${chat} about anything enquiring about the books, location, etc.\nHow can I help you?`, // Default incoming message
          sender: "chatbot", // Set sender as "chatbot"
          direction: "incoming", // Set direction as "incoming"
        }
      ]);
    } else if (chat === 'FAQ Chatbot') {
      setMessages([
        {
          message:
          `Hello ${chatbotUsername}! ${chat} is chatting with you for today!\nHow can I help you?`, // Default incoming message
          sender: "chatbot", // Set sender as "chatbot"
          direction: "incoming", // Set direction as "incoming"
        }
      ]);
    }
  };

  const handleChatClick = () => {
    setIsChatOpen(true);
  };

  const [chatbotUsername, setChatbotUsername] = useState('Guest');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(''); // State to store the username

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser.username); // Get the username from sessionStorage
      setChatbotUsername(storedUser.username);
       // Update the default incoming message
    setMessages(prevMessages => {
      const updatedMessages = prevMessages.map(message => {
        if (message.sender === "chatbot") {
          return {
            ...message,
            message: `Hello ${storedUser.username}! ${selectedChat} is chatting with you for today!\nHow can I help you?`
          };
        }
        return message;
      });
      return updatedMessages;
    });
    }

    else {
      setIsLoggedIn(false);
      setUserName('');
      setChatbotUsername('Guest');
    }
  }, [setIsLoggedIn]); // Run only once on component mount

  const [messages, setMessages] = useState([
    {
      message:
        `Hello ${chatbotUsername}! ${selectedChat} is chatting with you for today!\nHow can I help you?`, // Default incoming message
      sender: "chatbot", // Set sender as "chatbot"
      direction: "incoming", // Set direction as "incoming"
    },
  ]);

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedChat(null); // Reset selected chat when closing
    setSelectedFile(null);
    setMessageText('');
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    console.log(storedUser);
    if (storedUser) {
      setChatbotUsername(storedUser.username);
    }
    setMessages([
      {
        message:
        `Hello ${chatbotUsername}! ${selectedChat} is chatting with you for today!\nHow can I help you?`, // Default incoming message
        sender: "chatbot", // Set sender as "chatbot"
        direction: "incoming", // Set direction as "incoming"
      }
    ]);
  };
  
  const handleMessageSend = async (messageText) => {
    setMessages([
      ...messages,
      { message: messageText, sender: "user", direction: "outgoing" },
    ]);

    let chatbotResponse;

    if (selectedChat === "Ask my Library") {
      try {
        /*const origin = getOriginWithoutPort();
        const apiUrl = `${origin}:3000/ask-my-library?message=${encodeURIComponent(messageText)}`;
        */const apiUrl = `http://138.2.92.117:3000/ask-my-library?message=${encodeURIComponent(messageText)}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        chatbotResponse = data.message;

      } catch (error) {
        
        setMessages([
          ...messages,
          { message: messageText, sender: "user", direction: "outgoing" },
          {
            message: "I am sorry I do not understand you. Could you please try and repeat the question again?",
            sender: "chatbot",
            direction: "incoming",
          },
        ]);
        console.error("Error with Select AI:", error);
        return;
      }
    } else if (selectedChat === "FAQ Chatbot") {
      // ... (Gemini API call) ...
      if (selectedFile) {
        try {
          /*const origin = getOriginWithoutPort();
          const apiUrl = `${origin}:3600/upload`;
          */const apiUrl = `http://213.35.110.195:3600/upload`;
          
          const formData = new FormData();
          formData.append('image', selectedFile); // Use a more descriptive name like 'image'
          
          const requestOptions = {
            method: "PUT",
            body: formData,
            redirect: "follow"
          };

          await fetch(apiUrl, requestOptions);
        } catch (error) {
          console.error('Error:', error);
          //... handle the error (e.g., display an error message to the user)
        }
      }
      try {
        /*const origin = getOriginWithoutPort();
        const apiUrl = `${origin}:3100/faq-chatbot?message=${encodeURIComponent(messageText)}`;
        */const apiUrl = `http://138.2.92.117:3100/faq-chatbot?message=${encodeURIComponent(messageText)}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        chatbotResponse = data.message;
      } catch (error) {
        setMessages([
          ...messages,
          { message: messageText, sender: "user", direction: "outgoing" },
          {
            message: "I am sorry I do not understand you. Could you please try and repeat the question again?",
            sender: "chatbot",
            direction: "incoming",
            file: selectedFile
          },
        ]);
        console.error("Error with Google Gemini:", error);
        return;
      }
    }
    if (chatbotResponse !== "Error" || chatbotResponse !== null || chatbotResponse !== "") {
      if (selectedChat === "Ingestion Select AI") {
        setMessages([
          ...messages,
          { message: messageText, sender: "user", direction: "outgoing" },
          {
            message: chatbotResponse,
            sender: "chatbot",
            direction: "incoming",
            file: selectedFile
          },
        ]);
      } else {
        setMessages([
          ...messages,
          { message: messageText, sender: "user", direction: "outgoing" },
          {
            message: chatbotResponse,
            sender: "chatbot",
            direction: "incoming"
          },
        ]);
      }
    } else {
      setMessages([
        ...messages,
        { message: messageText, sender: "user", direction: "outgoing" },
        {
          message: "I am sorry I do not understand you. Could you please try and repeat the question again?",
          sender: "chatbot",
          direction: "incoming",
        },
      ]);
    }
    setMessageText('');
    setSelectedFile(null);
    // ... (rest of your message sending logic) ...
  };
  const submitInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [showAttachment, setShowAttachment] = useState(true); // State for showing/hiding attachment

  const handleTextChange = (event) => {
    setMessageText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && messageText !== '') {
      handleMessageSend(messageText);
      setMessageText('');
      setSelectedFile(null);
    }
  };

  const handleSubmitIconClick = () => {
    if (messageText !== '') {
      handleMessageSend(messageText);
      setMessageText('');
      submitInputRef.current.focus(); // Set focus back to the input
      setSelectedFile(null);
    }
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleLogoClick = () => {
    if (fileInputRef.current) {
      // 1. Clear the file input value
      fileInputRef.current.value = null;

      // 2. Trigger the file input click
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const chatWindow = document.querySelector('.chat-window');
    if (chatWindow) {
      if (selectedFile && selectedFile.type.startsWith('image/')) {
        chatWindow.style.bottom = '300px';
        chatWindow.style.height = '250px';
      } else {
        chatWindow.style.bottom = '150px';
        chatWindow.style.height = '400px';
      }
    }
  }, [selectedFile]);

  useEffect(() => {
    // Determine if the attachment should be shown based on selectedChat
    if (selectedChat === 'Ask my Library') {
      setShowAttachment(false);
    } else if (selectedChat === 'FAQ Chatbot') {
      setShowAttachment(true);
    }
  }, [selectedChat]);

  const handleCloseAttachment = () => {
    const chatWindow = document.querySelector('.chat-window');
    if (chatWindow) {
      chatWindow.style.bottom = '400px';
      setSelectedFile(null); // Clear the selectedFile state
    }
  };

  return (
    <>
      <Navbar />
      <div className="page" style={{ textAlign: "left", paddingInlineStart: "20px", color: "white", paddingTop: "3rem"}}>
        {isLoggedIn ? ( // Conditionally render the greeting
          <h4 id="header" style={{ fontWeight: "bold", textAlign: "center" }}>
            {greeting}, {userName}! What would you like to do today?
          </h4> 
        ) : (
          <h4 id="header" style={{ fontWeight: "bold", textAlign: "center" }}>
            {greeting}! What would you like to do today?
          </h4>
        )}
        <br />
        <div className="content-wrapper">
          <div className="container-box">
            <h4 style={{fontWeight: "bold"}}>Plan Your Visit</h4>

            <div className="location">
              <FontAwesomeIcon style={{marginRight: "3px", textAlign: "center"}} icon={faLocationDot} color="white" size="sm" />
              <select ref={selectRef} value={selectedValue} onChange={handleChange} title="Select Libraries">
                  <option value="National Library / Lee Kong Chian Reference Library">The Reading Room</option>
                  <option value="National Archives of Singapore">Heritage Library</option>
                  <option value="Ang Mo Kio Public Library">Community Bookshelf</option>
                  <option value="Bedok Public Library">The Literary Commons</option>
                  <option value="Bishan Public Library">Evergreen Archives</option>
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

            <a href="#" className="button-container">Go to the library <FontAwesomeIcon icon={faArrowRight} color="#c74634" size="lg"/></a>
          </div>
          <div>
              <img src={LibraryLogo} alt="Library Image" width="700" />
          </div>
          <div className="rating-icon" ref={ratingIconRef} onMouseEnter={() => setIconVisible(false)}>
            {iconVisible && !ratingSubmitted && ( 
            <FontAwesomeIcon 
            className="icon-rating" 
            style={{
            border: "5px solid black", 
            borderRadius: "20px", 
            backgroundColor: "black"
            }}
            icon={faFaceSmile} 
            size="2x" 
            color="yellow" 
            />
            )}
            <div className="rating-button" onClick={handleVisibleClick}>
              <span className="text">Help us improve</span>
            </div>
          </div>
          <div className="rating-faces">
            {isPopupVisible && !ratingSubmitted ? (
            <> 
              <FontAwesomeIcon 
                onClick={handleTogglePopup} // Close popup on X click
                className="close-icon" 
                icon={faXmark} 
                color="black" 
                size="sm"
              />
              <span style={{fontSize:"10px"}}>Rate your experience with this website</span>
              <div className="rating-container">
                <div className="icons-container"> {/* Container for the icons */}
                  {[faFaceAngry, faFaceFrown, faFaceMeh, faFaceSmile, faFaceGrin, faFaceLaughBeam].map((icon, index) => (
                    <div key={index} className="rating-icon-faces">
                      <FontAwesomeIcon 
                        className="faceRatings" 
                        icon={icon} 
                        size="sm" 
                        onClick={handleFaceIconClick}
                      />
                      <label>{index + 1}</label>
                    </div>
                  ))}
                </div>
                <div className="labels-container"> {/* Container for the labels */}
                  <span className="label-left">NOT SATISFIED</span>
                  <span className="label-right">VERY SATISFIED</span>
                </div>
              </div>
            </>
            ) : ratingSubmitted ? (
              <p style={{fontSize: "14px"}}> 
                Thank you for rating our website! <br />
                Leaving in {countdown} seconds...
              </p>
            ) : null} 
          </div>
          {!isChatOpen && (
            <div>
              <FontAwesomeIcon
                icon={faCommentDots}
                size="2x"
                style={{
                  border: "5px solid black", 
                  borderRadius: "20px", 
                  backgroundColor: "black"
                }}
                color="white"
                className="chat-icon"
                onClick={handleChatClick}
              />
            </div>
          )}
          {isChatOpen && !selectedChat && ( // Show selection box if chat is open and no chat is selected
            <div className="chat-selection-box">
              <FontAwesomeIcon 
                  icon={faXmark} 
                  className="close-icon" 
                  color="black"
                  onClick={handleCloseChat} 
              />
              <div className="button-box">
                <button className="select-button" onClick={() => handleChatSelection("Ask my Library")}>
                  <b>Ask my Library</b>
                </button>
                <button className="select-button" onClick={() => handleChatSelection("FAQ Chatbot")}>
                  <b>FAQ Chatbot</b>
                </button>
              </div>
            </div>
          )}
          {isChatOpen && selectedChat && (
            <div className="chat-window">
              <div className="chat-header"> {/* Add a header for the close button */}
                <h6 className="chat-header-text">{selectedChat}</h6>
                <FontAwesomeIcon 
                  icon={faXmark} 
                  color="black"
                  className="close-icon" 
                  onClick={handleCloseChat} 
                />
              </div>
              <MainContainer style={{maxHeight:"400px"}}>
                <ChatContainer>
                  <MessageList>
                    {messages.map((message, i) => (
                      <Message
                        key={i}
                        model={{
                          message: message.message,
                          sender: message.sender,
                          direction: message.direction,
                          file: message.file,
                        }}
                      />
                    ))}
                  </MessageList>
                </ChatContainer>
              </MainContainer>
              {selectedFile && (
                <div className="attachment-image">
                  <FontAwesomeIcon 
                      className="close-image-icon" 
                      icon={faXmark} 
                      color="black" 
                      size="sm"
                      onClick={handleCloseAttachment}
                    />
                  {selectedFile.type.startsWith('image/') ? (
                    <>
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt={selectedFile.name}
                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                      />
                      <br />
                      <span style={{color: "black", fontSize: "11px"}}>{selectedFile.name}</span>
                    </>
                  ) : (
                    <span style={{color: "black", fontSize: "11px"}}>{selectedFile.name}</span>
                  )}
                </div>
              )}
              <div className="message-input">
                {showAttachment && ( // Conditionally render attachment
                  <div className="image-attachment-container">
                    <FontAwesomeIcon icon={faPaperclip} color="#6EA9D7" onClick={handleLogoClick} className="file-icon-button" /> 
                    <input type="file" ref={fileInputRef} id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                  </div>
                )}
                <input type="text" value={messageText} onChange={handleTextChange} className="text-input" placeholder="Enter your queries here..." onKeyUp={handleKeyPress} />
                <FontAwesomeIcon icon={faPaperPlane} color="#6EA9D7" className="submit-icon-button"  onClick={handleSubmitIconClick} /> 
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
