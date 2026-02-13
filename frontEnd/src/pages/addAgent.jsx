import { useDispatch } from 'react-redux';
import { addAgent } from '../data/slice'; // Ensure this action exists in your slice
import './clientForm.css'; // Reusing your sharp styles
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AjouterAgent() {
    const dispatch = useDispatch();
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    // Generate specific AGT ID
    const id = `AGT-${Date.now().toString().slice(-3)}${Math.floor(Math.random() * 10)}`;

    function handleSubmit(e) {
        e.preventDefault();
        
        const newAgent = {
            id: id,
            nomComplet: nom,
            e_mail: email,
            password: password,
            statut: "agent"
        };

        dispatch(addAgent(newAgent));
        nav("/admin"); // Redirect back to admin dashboard
    }

    return (
        <div className="form-overlay">
          <div className="form-card-sharp">
            <div className="form-header-sharp">
              <h2 className="form-title-sharp">Nouvel Agent</h2>
              <button className="btn-close-sharp" onClick={() => nav("/admin")}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="form-body-sharp">
              <div className="input-group-sharp">
                <label>Nom Complet</label>
                <input 
                  type="text" 
                  placeholder="Ex: Sara Bennani" 
                  onChange={(e) => setNom(e.target.value)} 
                  required 
                />
              </div>

              <div className="input-group-sharp">
                <label>Adresse E-mail</label>
                <input 
                  type="email" 
                  placeholder="agent@gym.ma" 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>

              <div className="input-group-sharp">
                <label>Mot de Passe</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-actions-sharp">
                <button type="button" className="btn-secondary-sharp" onClick={() => nav("/admin")}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary-sharp">
                  Ajouter l'Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}