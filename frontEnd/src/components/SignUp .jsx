import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAgent } from '../data/slice';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    const newId = 'AGT-' + Math.floor(100 + Math.random() * 900);

    const newUser = {
      id: newId,
      nomComplet: formData.nomComplet,
      e_mail: formData.email,
      password: formData.password,
      statut: 'agent',
    };

    dispatch(addAgent(newUser));
    alert('Compte agent créé avec succès !');
    navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow border-0 p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">SubGestion</h2>
          <p className="text-muted">Inscription (Agent par défaut)</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nom complet</label>
            <input 
              type="text" 
              name="nomComplet" 
              className="form-control" 
              placeholder="Prénom Nom"
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Adresse e-mail</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              placeholder="nom@gym.ma"
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Mot de passe</label>
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Confirmer le mot de passe</label>
            <input 
              type="password" 
              name="confirmPassword" 
              className="form-control" 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            S'inscrire
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="small text-muted">Déjà un compte ? </span>
          <Link to="/login" className="small fw-bold text-decoration-none">Se connecter</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
