import React, { useState, useEffect } from 'react';
import './App.css';
import StudentCheckIn from './components/StudentCheckIn';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';

function App() {
  const [currentPage, setCurrentPage] = useState('student');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleAdminLogin = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAdminLoggedIn(true);
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
    setCurrentPage('student');
  };

  return (
    <div className="App">
      <header className="event-header">
        <div className="header-content">
          <div className="logos-container">
            <img 
              src="/Bannari_Amman_Institute_of_Technology_logo.png" 
              alt="BAIT Logo" 
              className="header-logo"
            />
            <img 
              src="/All_India_Council_for_Technical_Education_logo.png" 
              alt="AICTE Logo" 
              className="header-logo"
            />
          </div>
          <div className="event-info">
            <h1 className="event-title">AICTE</h1>
            <h2 className="event-subtitle">AI SUMMIT 2025</h2>
          </div>
        </div>
      </header>

      <nav className="navbar">
        <div className="nav-container">
          {/* <h1 className="nav-title">Event Registration</h1> */}
          <span className="nav-date">Tuesday - 18 November 2025</span>
          {isAdminLoggedIn && (
            <button className="logout-btn" onClick={handleAdminLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>

      <div className={`container ${isAdminLoggedIn ? 'admin-container' : ''}`}>
        {!isAdminLoggedIn ? (
          <>
            {currentPage === 'student' ? (
              <StudentCheckIn onAdminClick={() => setCurrentPage('login')} />
            ) : (
              <AdminLogin onLoginSuccess={handleAdminLogin} onBackToStudent={() => setCurrentPage('student')} />
            )}
          </>
        ) : (
          <AdminPanel onLogout={handleAdminLogout} />
        )}
      </div>
    </div>
  );
}

export default App;
