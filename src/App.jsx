import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar.jsx'; 
import Footer from './footer.jsx';
import Footer2 from './footer2.jsx';
import { 
  MainContainer, 
  ChatContainer, 
  MessageList, 
  Message, 
  MessageInput 
} from "@chatscope/chat-ui-kit-react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const Chatbot = () => {
  const [messages1, setMessages1] = useState([
    {
      message: "Hello from Chatbot 1! How can I help you?",
      sender: "Chatbot1" 
    }
  ]);
  const [messages2, setMessages2] = useState([
    {
      message: "Greetings from Chatbot 2! What can I do for you?",
      sender: "Chatbot2" 
    }
  ]);

  const [showChat1, setShowChat1] = useState(false);
  const [showChat2, setShowChat2] = useState(false);

  const handleMessageSend = async (messageText, chatNumber) => {
    if (chatNumber === 1) {
      setMessages1([...messages1, { message: messageText, sender: "user" }]);
      try {
        const response = await axios.post('/api/ai1', { message: messageText });
        setMessages1([
          ...messages1,
          { message: messageText, sender: "user" },
          { message: response.data.message, sender: "Chatbot1" },
        ]);
      } catch (error) {
        console.error("Error fetching response from Chatbot 1:", error);
        // ... error handling for Chatbot 1 ...
      }
    } else { // chatNumber === 2
      setMessages2([...messages2, { message: messageText, sender: "user" }]);
      try {
        const response = await axios.post('/api/ai2', { message: messageText });
        setMessages2([
          ...messages2,
          { message: messageText, sender: "user" },
          { message: response.data.message, sender: "Chatbot2" }, 
        ]);
      } catch (error) {
        console.error("Error fetching response from Chatbot 2:", error);
        // ... error handling for Chatbot 2 ... 
      }
    }
  };

  const toggleChat = (chatNumber) => {
    if (chatNumber === 1) {
      setShowChat1(!showChat1);
    } else {
      setShowChat2(!showChat2);
    }
  };

  
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
      <div style={{ textAlign: "left", paddingInlineStart: "20px", color: "white", marginTop: "3rem"}}>
        <h4 id="greeting"></h4>
        <h2>This is a sample text</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20rem" }}> 
        <div 
          onClick={() => toggleChat(1)} 
          style={{ 
            width: "80px", 
            height: "80px", 
            borderRadius: "50%", 
            backgroundColor: "#0084ff", // Example chat bubble color
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <span style={{ color: "white", fontSize: "20px" }}>
            {showChat1 ? "Hide" : "Chat 1"} 
          </span>
        </div>

        {/* Similar chat bubble for Chatbot 2 */}
        <div 
          onClick={() => toggleChat(2)} 
          style={{ 
            width: "80px", 
            height: "80px", 
            borderRadius: "60%", 
            backgroundColor: "#0084ff", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <span style={{ color: "white", fontSize: "20px" }}>
            {showChat2 ? "Hide" : "Chat 2"} 
          </span>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {showChat1 && ( 
          <div style={{ width: "50%", position: "relative", height: "500px" }}>
            <MainContainer>
              <ChatContainer>
                <MessageList>
                  {messages1.map((message, i) => (
                    <Message key={i} model={message}>
                      {/* ... avatar or other customizations ... */}
                    </Message>
                  ))}
                </MessageList>
                <MessageInput 
                  placeholder="Type message for Chatbot 1" 
                  onSend={(messageText) => handleMessageSend(messageText, 1)}
                />
              </ChatContainer>
            </MainContainer>
          </div>
        )}
        {showChat2 && ( 
          <div style={{ width: "50%", position: "relative", height: "500px" }}>
            <MainContainer>
              <ChatContainer>
                <MessageList>
                  {messages2.map((message, i) => (
                    <Message key={i} model={message}>
                      {/* ... avatar or other customizations ... */}
                    </Message>
                  ))}
                </MessageList>
                <MessageInput 
                  placeholder="Type message for Chatbot 2" 
                  onSend={(messageText) => handleMessageSend(messageText, 2)} 
                />
              </ChatContainer>
            </MainContainer>
          </div>
        )}
      </div>
      <Footer2 />
      <Footer />
    </>
  );
};

export default Chatbot;