import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../data/slice';
import './clientForm.css'; // Reusing your sharp styles

export function ModifierUser({ user, onCancel }) {
    const dispatch = useDispatch();
    const agents = useSelector(state => state.agents);
    
    // Initialize state with existing user info
    const [formData, setFormData] = useState({
        nomComplet: user.nomComplet,
        e_mail: user.e_mail,
        agent_id: user.agent_id || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            id: user.id,
            statut: user.statut,
            updatedData: formData
        }));
        onCancel(); // Close the modal
    };

    return (
        <div className="form-overlay">
            <div className="form-card-sharp">
                <div className="form-header-sharp">
                    <h2 className="form-title-sharp">Modifier {user.id}</h2>
                    <button className="btn-close-sharp" onClick={onCancel}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="form-body-sharp">
                    <div className="input-group-sharp">
                        <label>Nom Complet</label>
                        <input 
                            type="text" 
                            value={formData.nomComplet}
                            onChange={(e) => setFormData({...formData, nomComplet: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="input-group-sharp">
                        <label>Adresse E-mail</label>
                        <input 
                            type="email" 
                            value={formData.e_mail}
                            onChange={(e) => setFormData({...formData, e_mail: e.target.value})} 
                            required 
                        />
                    </div>

                    {user.statut === 'client' && (
                        <div className="input-group-sharp">
                            <label>Agent Associé</label>
                            <select 
                                className="select-sharp"
                                value={formData.agent_id}
                                onChange={(e) => setFormData({...formData, agent_id: e.target.value})}
                                required
                            >
                                {agents.map(agent => (
                                    <option key={agent.id} value={agent.id}>
                                        {agent.nomComplet}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="form-actions-sharp">
                        <button type="button" className="btn-secondary-sharp" onClick={onCancel}>
                            Annuler
                        </button>
                        <button type="submit" className="btn-primary-sharp">
                            Enregistrer les modifications
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}