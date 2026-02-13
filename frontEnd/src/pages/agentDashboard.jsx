import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { delClient, addClient, updateUser, addAbonnement, delAbonnement } from '../data/slice';
import { ModifierUser } from './ModifierUser';
import './agentDashboard.css';

const AgentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLoged = useSelector(state => state.userLoged);
  const allClients = useSelector(state => state.clients);
  const services = useSelector(state => state.services);
  const abonnements = useSelector(state => state.abonnements);

  // Agent sees only their clients
  const myClients = allClients.filter(c => c.agent_id === userLoged?.id);
  
  const [view, setView] = useState('clients'); // 'clients' | 'services' | 'subscriptions'
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddSub, setShowAddSub] = useState(false);
  const [newClient, setNewClient] = useState({ nomComplet: '', e_mail: '' });
  const [newSub, setNewSub] = useState({ clientId: '', serviceId: '', type: 'Basique', prix: '', dateDebut: '', dateFin: '' });

  // Stats
  const activeAbonnements = abonnements.filter(a => a.statut === 'actif').length;
  const expiredAbonnements = abonnements.filter(a => a.statut === 'expiré').length;
  const totalRevenue = abonnements.filter(a => a.statut === 'actif').reduce((sum, a) => sum + (a.prix || 0), 0);

  const filteredClients = myClients.filter(c =>
    c.nomComplet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.e_mail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const myAbonnements = abonnements.filter(a => 
    myClients.some(c => c.id === a.clientId)
  );

  const handleDeleteClient = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
      dispatch(delClient(id));
    }
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    const id = `CLT-${Date.now().toString().slice(-3)}${Math.floor(Math.random() * 10)}`;
    dispatch(addClient({
      id,
      nomComplet: newClient.nomComplet,
      e_mail: newClient.e_mail,
      statut: 'client',
      created_at: new Date().toISOString().split('T')[0],
      agent_id: userLoged.id
    }));
    setNewClient({ nomComplet: '', e_mail: '' });
    setShowAddClient(false);
  };

  const handleAddSub = (e) => {
    e.preventDefault();
    const id = `SUB-${Date.now().toString().slice(-3)}`;
    dispatch(addAbonnement({
      id,
      clientId: newSub.clientId,
      serviceId: newSub.serviceId,
      type: newSub.type,
      prix: Number(newSub.prix),
      dateDebut: newSub.dateDebut,
      dateFin: newSub.dateFin,
      statut: 'actif'
    }));
    setNewSub({ clientId: '', serviceId: '', type: 'Basique', prix: '', dateDebut: '', dateFin: '' });
    setShowAddSub(false);
  };

  return (
    <div className="agent-page">
      {/* Header */}
      <header className="agent-header">
        <div className="agent-container">
          <div>
            <h1 className="agent-title">
              <i className="bi bi-speedometer2 me-2"></i>
              Tableau de Bord Agent
            </h1>
            <p className="agent-subtitle">Bienvenue, {userLoged?.nomComplet}</p>
          </div>
        </div>
      </header>

      <div className="agent-container mt-4">
        {/* Stats Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="stat-icon-circle bg-primary-subtle text-primary mx-auto mb-2">
                  <i className="bi bi-people-fill fs-4"></i>
                </div>
                <h3 className="fw-bold mb-0">{myClients.length}</h3>
                <small className="text-muted">Mes Clients</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="stat-icon-circle bg-success-subtle text-success mx-auto mb-2">
                  <i className="bi bi-check-circle-fill fs-4"></i>
                </div>
                <h3 className="fw-bold mb-0">{activeAbonnements}</h3>
                <small className="text-muted">Abonnements Actifs</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="stat-icon-circle bg-danger-subtle text-danger mx-auto mb-2">
                  <i className="bi bi-x-circle-fill fs-4"></i>
                </div>
                <h3 className="fw-bold mb-0">{expiredAbonnements}</h3>
                <small className="text-muted">Expirés</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <div className="stat-icon-circle bg-warning-subtle text-warning mx-auto mb-2">
                  <i className="bi bi-cash-stack fs-4"></i>
                </div>
                <h3 className="fw-bold mb-0">{totalRevenue} DH</h3>
                <small className="text-muted">Revenu Actif</small>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button className={`nav-link ${view === 'clients' ? 'active' : ''}`} onClick={() => setView('clients')}>
              <i className="bi bi-people me-1"></i> Mes Clients
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${view === 'subscriptions' ? 'active' : ''}`} onClick={() => setView('subscriptions')}>
              <i className="bi bi-card-checklist me-1"></i> Abonnements
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${view === 'services' ? 'active' : ''}`} onClick={() => setView('services')}>
              <i className="bi bi-grid me-1"></i> Services
            </button>
          </li>
        </ul>

        {/* CLIENTS VIEW */}
        {view === 'clients' && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
              <div className="d-flex align-items-center gap-3">
                <h5 className="mb-0 fw-bold">Répertoire Clients</h5>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Rechercher..."
                  style={{ maxWidth: '250px' }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddClient(true)}>
                <i className="bi bi-plus-lg me-1"></i> Ajouter Client
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nom Complet</th>
                    <th>E-mail</th>
                    <th>Créé le</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length > 0 ? filteredClients.map(client => (
                    <tr key={client.id} className="cursor-pointer" onClick={() => navigate(`/user/${client.id}`)}>
                      <td><code className="text-muted">{client.id}</code></td>
                      <td className="fw-semibold">{client.nomComplet}</td>
                      <td>{client.e_mail}</td>
                      <td>{client.created_at}</td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-primary me-1" onClick={(e) => { e.stopPropagation(); setEditingUser(client); }}>
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); handleDeleteClient(client.id); }}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">
                        {searchTerm ? `Aucun résultat pour "${searchTerm}"` : "Aucun client associé à votre compte."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBSCRIPTIONS VIEW */}
        {view === 'subscriptions' && (
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0 fw-bold">Abonnements de mes Clients</h5>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddSub(true)}>
                <i className="bi bi-plus-lg me-1"></i> Nouvel Abonnement
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Type</th>
                    <th>Prix</th>
                    <th>Période</th>
                    <th>Statut</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myAbonnements.length > 0 ? myAbonnements.map(sub => {
                    const client = allClients.find(c => c.id === sub.clientId);
                    const service = services.find(s => s.id === sub.serviceId);
                    return (
                      <tr key={sub.id}>
                        <td><code className="text-muted">{sub.id}</code></td>
                        <td className="fw-semibold">{client?.nomComplet || '—'}</td>
                        <td>{service?.nom || sub.serviceId}</td>
                        <td>{sub.type}</td>
                        <td className="fw-bold">{sub.prix} DH</td>
                        <td><small>{sub.dateDebut} → {sub.dateFin}</small></td>
                        <td>
                          <span className={`badge ${sub.statut === 'actif' ? 'bg-success' : sub.statut === 'expiré' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                            {sub.statut}
                          </span>
                        </td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-danger" onClick={() => {
                            if (window.confirm("Supprimer cet abonnement ?")) dispatch(delAbonnement(sub.id));
                          }}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr><td colSpan="8" className="text-center py-4 text-muted">Aucun abonnement trouvé.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SERVICES VIEW */}
        {view === 'services' && (
          <div className="row g-3">
            {services.map(service => {
              const subCount = abonnements.filter(a => a.serviceId === service.id).length;
              return (
                <div key={service.id} className="col-md-4 col-sm-6">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="stat-icon-circle bg-primary-subtle text-primary me-3">
                          <i className="bi bi-gear-fill"></i>
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold">{service.nom}</h6>
                          <small className="text-muted">{service.id}</small>
                        </div>
                      </div>
                      <p className="text-muted small mb-2">{service.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-primary-subtle text-primary">{service.prixBase}</span>
                        <span className="text-muted small">{subCount} abonné(s)</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="form-overlay">
          <div className="form-card-sharp">
            <div className="form-header-sharp">
              <h2 className="form-title-sharp">Nouveau Client</h2>
              <button className="btn-close-sharp" onClick={() => setShowAddClient(false)}>×</button>
            </div>
            <form onSubmit={handleAddClient} className="form-body-sharp">
              <div className="input-group-sharp">
                <label>Nom Complet</label>
                <input type="text" placeholder="Ex: Yassine Mansouri" value={newClient.nomComplet} onChange={(e) => setNewClient({...newClient, nomComplet: e.target.value})} required />
              </div>
              <div className="input-group-sharp">
                <label>Adresse E-mail</label>
                <input type="email" placeholder="client@gym.ma" value={newClient.e_mail} onChange={(e) => setNewClient({...newClient, e_mail: e.target.value})} required />
              </div>
              <div className="form-actions-sharp">
                <button type="button" className="btn-secondary-sharp" onClick={() => setShowAddClient(false)}>Annuler</button>
                <button type="submit" className="btn-primary-sharp">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Subscription Modal */}
      {showAddSub && (
        <div className="form-overlay">
          <div className="form-card-sharp">
            <div className="form-header-sharp">
              <h2 className="form-title-sharp">Nouvel Abonnement</h2>
              <button className="btn-close-sharp" onClick={() => setShowAddSub(false)}>×</button>
            </div>
            <form onSubmit={handleAddSub} className="form-body-sharp">
              <div className="input-group-sharp">
                <label>Client</label>
                <select className="select-sharp" value={newSub.clientId} onChange={(e) => setNewSub({...newSub, clientId: e.target.value})} required>
                  <option value="">Choisir un client...</option>
                  {myClients.map(c => <option key={c.id} value={c.id}>{c.nomComplet}</option>)}
                </select>
              </div>
              <div className="input-group-sharp">
                <label>Service</label>
                <select className="select-sharp" value={newSub.serviceId} onChange={(e) => setNewSub({...newSub, serviceId: e.target.value})} required>
                  <option value="">Choisir un service...</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.nom} — {s.prixBase}</option>)}
                </select>
              </div>
              <div className="input-group-sharp">
                <label>Type</label>
                <select className="select-sharp" value={newSub.type} onChange={(e) => setNewSub({...newSub, type: e.target.value})}>
                  <option value="Basique">Basique</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Gold">Gold</option>
                </select>
              </div>
              <div className="input-group-sharp">
                <label>Prix (DH)</label>
                <input type="number" placeholder="500" value={newSub.prix} onChange={(e) => setNewSub({...newSub, prix: e.target.value})} required />
              </div>
              <div className="input-group-sharp">
                <label>Date Début</label>
                <input type="date" value={newSub.dateDebut} onChange={(e) => setNewSub({...newSub, dateDebut: e.target.value})} required />
              </div>
              <div className="input-group-sharp">
                <label>Date Fin</label>
                <input type="date" value={newSub.dateFin} onChange={(e) => setNewSub({...newSub, dateFin: e.target.value})} required />
              </div>
              <div className="form-actions-sharp">
                <button type="button" className="btn-secondary-sharp" onClick={() => setShowAddSub(false)}>Annuler</button>
                <button type="submit" className="btn-primary-sharp">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <ModifierUser user={editingUser} onCancel={() => setEditingUser(null)} />
      )}
    </div>
  );
};

export default AgentDashboard;
