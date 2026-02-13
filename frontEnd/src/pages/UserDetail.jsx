import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './UserDetail.css';

export function UserDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch()
    
    const clients = useSelector((state) => state.clients);
    const agents = useSelector((state) => state.agents);
    const abonnements = useSelector((state) => state.abonnements);
    const services = useSelector((state) => state.services);
    const user = [...clients, ...agents].find(u => u.id === id);
    const userSubs = abonnements?.filter(sub => sub.clientId === id) || [];
    const agent = user?.agent_id ? agents.find(a => a.id === user.agent_id) : null;

    // Calculate stats for this user
    const activeSubs = userSubs.filter(s => s.statut === 'actif').length;
    const totalSpent = userSubs.reduce((sum, s) => sum + (s.prix || 0), 0);

    function addSub() {

    }

    if (!user) return (
        <div className="container py-5 text-center">
            <i className="bi bi-exclamation-triangle fs-1 text-warning"></i>
            <h3 className="mt-3">Utilisateur introuvable</h3>
            <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Retour</button>
        </div>
    );

    return (
        <div className="profile-wrapper-light">
            <div className="profile-container">
                <button onClick={() => navigate(-1)} className="btn btn-link text-muted text-decoration-none mb-3">
                    <i className="bi bi-chevron-left"></i> Retour au tableau de bord
                </button>

                {/* User Stats Summary */}
                {user.statut === 'client' && (
                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <h3 className="fw-bold text-primary mb-0">{userSubs.length}</h3>
                                    <small className="text-muted">Total Abonnements</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <h3 className="fw-bold text-success mb-0">{activeSubs}</h3>
                                    <small className="text-muted">Actifs</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center">
                                    <h3 className="fw-bold text-warning mb-0">{totalSpent} DH</h3>
                                    <small className="text-muted">Total Dépensé</small>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="profile-main-grid">
                    {/* Left Sidebar Card */}
                    <aside className="profile-info-card">
                        <div className="avatar-container">
                            <div className="avatar-box-green">{user.nomComplet.charAt(0)}</div>
                        </div>
                        
                        <h2 className="user-display-name">{user.nomComplet}</h2>
                        <div className="user-type-tag">
                            <span className={`badge ${user.statut === 'client' ? 'bg-primary' : 'bg-success'}`}>
                                {user.statut}
                            </span>
                        </div>
                        <div className="user-id-code">{user.id}</div>

                        <div className="details-list">
                            <div className="detail-item">
                                <label><i className="bi bi-envelope me-1"></i> E-MAIL</label>
                                <p>{user.e_mail}</p>
                            </div>
                            <div className="detail-item">
                                <label><i className="bi bi-calendar me-1"></i> DATE D'INSCRIPTION</label>
                                <p>{user.created_at || '—'}</p>
                            </div>
                            {agent && (
                                <div className="detail-item">
                                    <label><i className="bi bi-person-badge me-1"></i> AGENT ASSOCIÉ</label>
                                    <p>{agent.nomComplet} ({agent.id})</p>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Right Main Card */}
                    <main className="subscriptions-card">
                        <h3 className="section-title-bold">
                            <i className="bi bi-card-checklist me-2"></i>
                            Abonnements liés
                        </h3>

                        <button >Ajouter un Abonnement pour ce client</button>
                        
                        <div className="subs-container">
                            {userSubs.length > 0 ? (
                                userSubs.map(sub => {
                                    const service = services.find(s => s.id === sub.serviceId);
                                    return (
                                        <div key={sub.id} className="sub-row-item">
                                            <div className="sub-row-left">
                                                <span className={`status-dot-glow ${sub.statut.toLowerCase()}`}></span>
                                                <div className="sub-row-info">
                                                    <h4>{service ? service.nom : sub.serviceId}</h4>
                                                    <p>
                                                        <span className={`badge me-2 ${sub.statut === 'actif' ? 'bg-success' : sub.statut === 'expiré' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                                                            {sub.statut}
                                                        </span>
                                                        {sub.type} • {sub.dateDebut} → {sub.dateFin}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="sub-row-right">
                                                <span className="price-num">{sub.prix}</span>
                                                <span className="price-currency">DH</span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-5 text-muted">
                                    <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                                    Aucun abonnement enregistré.
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
