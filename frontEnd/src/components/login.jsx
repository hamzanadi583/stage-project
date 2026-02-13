import React, { useState } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setLogin } from '../data/slice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const agents = useSelector((state) => state.agents);
  const admins = useSelector((state) => state.admins);

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundAgent = agents.find(a => a.e_mail === formData.email && a.password === formData.password);
    const foundAdmin = admins.find(a => a.e_mail === formData.email && a.password === formData.password);
    const user = foundAdmin || foundAgent;

    if (user) {
      dispatch(setLogin(user));
      if (user.statut === 'admin') {
        navigate('/admin');
      } else {
        navigate('/agent-dashboard');
      }
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
              <svg xmlns="http://www.w3.org/2000/svg" className="logo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          <div className="login-header">
            <h1 className="login-title">Se connecter</h1>
            <p className="login-subtitle">Accédez à votre espace de gestion</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Adresse e-mail</label>
              <input type="email" id="email" name="email" className="form-input" placeholder="exemple@email.com" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input type="password" id="password" name="password" className="form-input" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn-submit">Se connecter</button>
          </form>

          <div className="login-footer">
            <p className="footer-text">
              Pas encore de compte ? <Link to="/signup" className="footer-link">S'inscrire</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
