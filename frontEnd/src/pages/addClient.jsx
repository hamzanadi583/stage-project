import { useDispatch, useSelector } from 'react-redux'
import { addClient } from '../data/slice'
import './clientForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AjouterClient() {
    const dispatch = useDispatch();
    const [nom,setNom] = useState();
    const [email, setEmail] = useState();
    const [agent,setAgent] = useState();
    const agents = useSelector(state => state.agents);
    const id = `CLT-${Date.now().toString().slice(-3)}${Math.floor(Math.random() * 10)}`;
    const nav = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const today = new Date()
        
        const cl = {
            id: id,
            nomComplet: nom,
            e_mail: email,
            statut: "client",
            created_at: today.toISOString().split('T')[0],
            agent_id : agent
        }
        dispatch(addClient(cl));
        console.log(agents);
        nav("/admin")
    }

    return (
        <div className="form-overlay">
          <div className="form-card-sharp">
            <div className="form-header-sharp">
              <h2 className="form-title-sharp">Nouveau Client</h2>
              <button className="btn-close-sharp" onClick={() => nav("/admin")} >×</button>
            </div>

            <form onSubmit={handleSubmit} className="form-body-sharp">
              <div className="input-group-sharp">
                <label>Nom Complet</label>
                <input 
                  type="text" 
                  name="nomComplet" 
                  placeholder="Ex: Yassine Mansouri" 
                  onChange={(e)=>setNom(e.target.value)} 
                  required 
                />
              </div>

              <div className="input-group-sharp">
                <label>Adresse E-mail</label>
                <input 
                  type="email" 
                  name="e_mail" 
                  placeholder="client@gym.ma" 
                  onChange={(e)=>setEmail(e.target.value)} 
                  required 
                />
              </div>

                <div className="input-group-sharp">
                    <label>Agent Associé</label>
                    <select 
                      name="agent_id" 
                      className="select-sharp" 
                      onChange={(e) => setAgent(e.target.value)} 
                      required
                      
                    >
                      <option value="" disabled>Choisir un agent...</option>
                      {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>
                          {agent.nomComplet} ({agent.id})
                        </option>
                      ))}
                    </select>
                </div>

              <div className="form-actions-sharp">
                <button type="button" className="btn-secondary-sharp" onClick={() => nav("/admin")}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary-sharp">
                  Ajouter le Client
                </button>
              </div>
            </form>
          </div>
        </div>
      );

}