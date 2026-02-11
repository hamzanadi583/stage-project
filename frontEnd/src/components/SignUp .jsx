import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { admins, agents } from './testData'; 

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomComplet: '',
    email: '',
    password: '',
    confirmPassword: '',
    statut: 'agent'  
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

    // Generate ID for staff members only
    const prefix = formData.statut === 'admin' ? 'ADM-' : 'AGT-';
    const newId = prefix + Math.floor(100 + Math.random() * 900);

    const newUser = {
      id: newId,
      nomComplet: formData.nomComplet,
      e_mail: formData.email,
      password: formData.password,
      statut: formData.statut,
    };

    // Push to the correct staff array
    if (formData.statut === 'admin') {
      admins.push(newUser);
    } else {
      agents.push(newUser);
    }

    alert(`Compte ${formData.statut} créé avec succès !`);
    navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow border-0 p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">SubGestion</h2>
          <p className="text-muted">Inscription du Personnel</p>
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