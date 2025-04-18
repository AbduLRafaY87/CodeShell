import React, { useState, useEffect } from 'react';
import '../App.css';
import CWLogo from '/assets/logo.jpg';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleFullScreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => {
        console.error(`Error enabling full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Listen for fullscreen changes to update icon state
  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img src={CWLogo} alt="CodeShell logo" />
        <h3>CodeShell</h3>
      </div>

      <div className="navButtons">
        <button 
          title="Menu" 
          className="menu-icon" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <i className={`fa ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <button 
          title="Full-Screen" 
          onClick={handleFullScreen} 
          className="fullscreen-button"
          aria-label="Toggle fullscreen"
        >
          <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
        </button>
      </div>

      <nav className={`navLinks ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="#">Developer Info</Link></li>
          <li><Link to="#">How to Use</Link></li>
          <li><Link to="#">Report Bug</Link></li>
          <li><Link to="#">GitHub Repo</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
