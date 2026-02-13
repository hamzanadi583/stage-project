import React, { useState } from 'react';
import './adminPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { delAgent, delClient } from '../data/slice';
import { ModifierUser } from './ModifierUser';

const AdminDashboard = () => {
  const [view, setView] = useState('clients');
  const agents = useSelector(state => state.agents);
  const clients = useSelector(state => state.clients);
  const abonnements = useSelector(state => state.abonnements);
  const services = useSelector(state => state.services);
  const [searchTerm, setSearchTerm] = useState('');
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [editingUser, setEditingUser] = useState(null);

  const filteredData = (view === 'clients' ? clients : agents).filter(user =>
    user.nomComplet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.e_mail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Visual stats
  const activeAbonnements = abonnements.filter(a => a.statut === 'actif').length;
  const totalRevenue = abonnements.reduce((sum, a) => sum + (a.prix || 0), 0);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      (view === "clients") ? dispatch(delClient(id)) : dispatch(delAgent(id));
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-container">
          <div>
            <h1 className="admin-title">Gestion du Personnel & Clients</h1>
            <p className="admin-subtitle">Consultez, modifiez ou supprimez les membres du système.</p>
          </div>
          <button onClick={() => view === 'clients' ? nav("/ajoutClient") : nav("/ajoutAgent")} className="btn btn-primary">
            <i className="bi bi-plus-lg me-2"></i>
            Ajouter {view === 'clients' ? 'un Client' : 'un Agent'}
          </button>
        </div>
      </header>

      <div className="admin-container mt-4">
        {/* Overview Stats */}
        <div className="row g-3 mb-4">
          <div className="col-md-3 col-6">
            <div className={`card border-0 shadow-sm h-100 ${view === 'clients' ? 'border-start border-primary border-3' : ''}`} 
                 style={{ cursor: 'pointer' }} onClick={() => setView('clients')}>
              <div className="card-body d-flex align-items-center gap-3">
                <div className="stat-icon blue"><i className="bi bi-people"></i></div>
                <div>
                  <p className="stat-label mb-0">Clients</p>
                  <h3 className="stat-value mb-0">{clients.length}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className={`card border-0 shadow-sm h-100 ${view === 'agents' ? 'border-start border-success border-3' : ''}`}
                 style={{ cursor: 'pointer' }} onClick={() => setView('agents')}>
              <div className="card-body d-flex align-items-center gap-3">
                <div className="stat-icon green"><i className="bi bi-person-badge"></i></div>
                <div>
                  <p className="stat-label mb-0">Agents</p>
                  <h3 className="stat-value mb-0">{agents.length}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm h-100" style={{ cursor: 'pointer' }} onClick={() => nav('/serviceList')}>
              <div className="card-body d-flex align-items-center gap-3">
                <div className="stat-icon purple"><i className="bi bi-bar-chart-fill"></i></div>
                <div>
                  <p className="stat-label mb-0">Services</p>
                  <h3 className="stat-value mb-0">{services.length}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="stat-icon" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}><i className="bi bi-cash-stack"></i></div>
                <div>
                  <p className="stat-label mb-0">Revenu Total</p>
                  <h3 className="stat-value mb-0">{totalRevenue} DH</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual: Subscriptions by Status */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <h6 className="fw-bold mb-3">Répartition des Abonnements</h6>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="bg-success bg-opacity-10 rounded-3 p-3 text-center">
                  <h4 className="fw-bold text-success mb-0">{activeAbonnements}</h4>
                  <small className="text-muted">Actifs</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-danger bg-opacity-10 rounded-3 p-3 text-center">
                  <h4 className="fw-bold text-danger mb-0">{abonnements.filter(a => a.statut === 'expiré').length}</h4>
                  <small className="text-muted">Expirés</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-warning bg-opacity-10 rounded-3 p-3 text-center">
                  <h4 className="fw-bold text-warning mb-0">{abonnements.filter(a => a.statut === 'en attente').length}</h4>
                  <small className="text-muted">En Attente</small>
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="progress mt-3" style={{ height: '20px' }}>
              <div className="progress-bar bg-success" style={{ width: `${(activeAbonnements / Math.max(abonnements.length, 1)) * 100}%` }}>
                Actifs
              </div>
              <div className="progress-bar bg-danger" style={{ width: `${(abonnements.filter(a => a.statut === 'expiré').length / Math.max(abonnements.length, 1)) * 100}%` }}>
                Expirés
              </div>
              <div className="progress-bar bg-warning" style={{ width: `${(abonnements.filter(a => a.statut === 'en attente').length / Math.max(abonnements.length, 1)) * 100}%` }}>
                En Attente
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic List Section */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0 fw-bold">
                {view === 'clients' ? 'Répertoire Clients' : 'Liste des Agents'}
              </h5>
            </div>
            <div className="search-wrapper-sharp" style={{ maxWidth: '300px' }}>
              <i className="bi bi-search search-icon-sharp"></i>
              <input 
                type="text" 
                className="search-input-sharp" 
                placeholder={`Rechercher un ${view === 'clients' ? 'client' : 'agent'}...`} 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nom Complet</th>
                  <th>E-mail</th>
                  {view === 'clients' ? <th>Créé le</th> : <th>Rôle</th>}
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((user) => (
                    <tr 
                      key={user.id} 
                      onClick={() => nav(`/user/${user.id}`)} 
                      style={{ cursor: 'pointer' }}
                    >
                      <td><code className="text-muted">{user.id}</code></td>
                      <td className="fw-semibold">{user.nomComplet}</td>
                      <td>{user.e_mail}</td>
                      <td>
                        {view === 'clients' ? user.created_at : <span className="badge bg-success">Agent</span>}
                      </td>
                      <td className="text-center">
                        <button className="btn btn-sm btn-outline-primary me-1" onClick={(e) => { e.stopPropagation(); setEditingUser(user); }}>
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); handleDelete(user.id); }}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      Aucun résultat trouvé pour "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingUser && (
        <ModifierUser user={editingUser} onCancel={() => setEditingUser(null)} />
      )}
    </div>
  );
};

export default AdminDashboard;
