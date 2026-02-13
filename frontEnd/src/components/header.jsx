import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../data/slice';

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userLoged = useSelector((state) => state.userLoged);

  const handleLogout = () => {
    dispatch(logout());
    nav('/login');
  };

  const getDashboardLink = () => {
    if (!userLoged) return null;
    if (userLoged.statut === 'admin') return '/admin';
    if (userLoged.statut === 'agent') return '/agent-dashboard';
    return null;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2 fw-bold text-primary" href="#" onClick={(e) => { e.preventDefault(); nav('/'); }}>
          <div className="header-logo">
            <svg xmlns="http://www.w3.org/2000/svg" className="header-logo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          SubGestion
        </a>

        <div className="d-flex align-items-center gap-2">
          {!userLoged ? (
            <>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => nav('/signup')}>
                S'inscrire
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => nav('/login')}>
                Se connecter
              </button>
            </>
          ) : (
            <>
              {getDashboardLink() && (
                <button className="btn btn-outline-primary btn-sm" onClick={() => nav(getDashboardLink())}>
                  <i className="bi bi-speedometer2 me-1"></i> Tableau de bord
                </button>
              )}
              <span className="badge bg-light text-dark border">
                {userLoged.nomComplet} <small className="text-muted">({userLoged.statut})</small>
              </span>
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i> Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
