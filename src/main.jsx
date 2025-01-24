import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './login.jsx'; 
import RegisterPage from './register.jsx';
import ForgetPasswordPage from './forgetPassword.jsx';
import ResetPasswordPage from './resetPassword.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap your routes with BrowserRouter */}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
