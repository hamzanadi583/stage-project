import React, { useState } from 'react';
import './Login.css';
import { agents, admins } from './testData';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundAgent = agents.find(agnt => agnt.e_mail === formData.email && agnt.password === formData.password);
    const foundAdmin = admins.find(adm => adm.e_mail === formData.email && adm.password === formData.password);

    const user = foundAgent || foundAdmin;
    if(user) {
        console.log(`Login success: ${user.e_mail} (${user.statut})`);
    } else {
      alert('Email ou mot de passe incorrect !');
    }
    
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          
          <div className="login-logo">
            <div className="logo-circle">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="logo-icon" 
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
          </div>

          {/* Header */}
          <div className="login-header">
            <h1 className="login-title">Se connecter</h1>
            <p className="login-subtitle">
              Accédez à votre espace de gestion
            </p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="exemple@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="form-footer">
              <a href="#" className="forgot-password">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-submit">
              Se connecter
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="login-footer">
            <p className="footer-text">
              Vous n'avez pas de compte ?{' '}
              <a href="#" className="footer-link">
                S'inscrire
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;