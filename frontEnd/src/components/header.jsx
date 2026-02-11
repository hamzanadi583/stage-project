import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <nav className="header">
      <div className="header-container">
        {/* Logo and Title */}
        <div className="header-brand">
          {/* Logo Circle */}
          <div className="header-logo">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="header-logo-icon" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
          {/* Title */}
          <span className="header-title">
            Gestion des abonnements
          </span>
        </div>

        {/* Auth Buttons */}
        <div className="header-buttons">
          <button className="btn btn-outline">
            S'inscrire
          </button>
          <button className="btn btn-primary">
            Se connecter
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;