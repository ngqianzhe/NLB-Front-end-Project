import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './login.jsx'; 
import RegisterPage from './register.jsx';
import ForgetPasswordPage from './forgetPassword.jsx';

function updateBackgroundColor() {
  const now = new Date();
  const hour = now.getHours();
  const background = document.body; // Get the body element

  if (hour >= 18 || hour < 5) { // Evening time (6 PM to 5 AM)
    background.style.backgroundColor = "#101c2c"; // Darker color
  }
}

// Update the background color initially
updateBackgroundColor();

// Update the background color every hour
setInterval(updateBackgroundColor, 60 * 60 * 1000); // 1 hour in milliseconds

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap your routes with BrowserRouter */}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
