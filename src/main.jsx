import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './login.jsx'; 
import RegisterPage from './register.jsx'

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
      <Route path="/" element={<App />} /> 
        <Route path="/App.jsx" element={<App />} /> 
        <Route path="/login.jsx" element={<LoginPage />} /> 
        <Route path="/register.jsx" element={<RegisterPage />} />
        <Route path="/forgetPassword.jsx" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
