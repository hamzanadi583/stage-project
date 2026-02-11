import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-section">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="footer-logo-icon" 
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
            <span className="footer-brand-text">Gestion des abonnements</span>
          </div>
          <p className="footer-description">
            Plateforme moderne de gestion des abonnements pour simplifier votre activité.
          </p>
        </div>

        {/* Links Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Navigation</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Accueil</a></li>
            <li><a href="#" className="footer-link">Services</a></li>
            <li><a href="#" className="footer-link">À propos</a></li>
            <li><a href="#" className="footer-link">Contact</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Support</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Centre d'aide</a></li>
            <li><a href="#" className="footer-link">Documentation</a></li>
            <li><a href="#" className="footer-link">FAQ</a></li>
            <li><a href="#" className="footer-link">Nous contacter</a></li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Légal</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Conditions d'utilisation</a></li>
            <li><a href="#" className="footer-link">Politique de confidentialité</a></li>
            <li><a href="#" className="footer-link">Mentions légales</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p className="footer-copyright">
            © 2024 Gestion des abonnements. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;