import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ServiceStats.css';

export function ServiceStats() {
    const navigate = useNavigate();
    const services = useSelector((state) => state.services);
    const abonnements = useSelector((state) => state.abonnements);

    const stats = services.map(service => {
        const subs = abonnements.filter(sub => sub.serviceId === service.id);
        const activeCount = subs.filter(s => s.statut === 'actif').length;
        const totalRevenue = subs.reduce((sum, s) => sum + (s.prix || 0), 0);
        return {
            ...service,
            totalSubs: subs.length,
            activeCount,
            totalRevenue
        };
    });

    const totalAllRevenue = stats.reduce((sum, s) => sum + s.totalRevenue, 0);
    const totalAllSubs = stats.reduce((sum, s) => sum + s.totalSubs, 0);

    return (
        <div className="stats-page-wrapper">
            <div className="stats-container">
                <button onClick={() => navigate(-1)} className="btn btn-link text-muted text-decoration-none mb-3">
                    <i className="bi bi-chevron-left"></i> Retour
                </button>

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body">
                        <h2 className="fw-bold mb-1">Analyse des Services</h2>
                        <p className="text-muted mb-3">Aperçu de l'engagement des clients par catégorie</p>
                        
                        {/* Summary Stats */}
                        <div className="row g-3">
                            <div className="col-md-4">
                                <div className="bg-primary bg-opacity-10 rounded-3 p-3 text-center">
                                    <h3 className="fw-bold text-primary mb-0">{services.length}</h3>
                                    <small className="text-muted">Services</small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="bg-success bg-opacity-10 rounded-3 p-3 text-center">
                                    <h3 className="fw-bold text-success mb-0">{totalAllSubs}</h3>
                                    <small className="text-muted">Total Abonnements</small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="bg-warning bg-opacity-10 rounded-3 p-3 text-center">
                                    <h3 className="fw-bold text-warning mb-0">{totalAllRevenue} DH</h3>
                                    <small className="text-muted">Revenu Total</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Bar Chart */}
                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body">
                        <h5 className="fw-bold mb-3">Répartition par Service</h5>
                        {stats.map(item => {
                            const maxRevenue = Math.max(...stats.map(s => s.totalRevenue), 1);
                            const barWidth = (item.totalRevenue / maxRevenue) * 100;
                            return (
                                <div key={item.id} className="mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="fw-semibold small">{item.nom}</span>
                                        <span className="text-muted small">{item.totalRevenue} DH</span>
                                    </div>
                                    <div className="progress" style={{ height: '24px' }}>
                                        <div
                                            className="progress-bar bg-primary"
                                            role="progressbar"
                                            style={{ width: `${barWidth}%` }}
                                        >
                                            {item.totalSubs} abonné(s)
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Service Cards */}
                <div className="row g-3">
                    {stats.map(item => (
                        <div key={item.id} className="col-md-6 col-lg-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="stat-icon-box me-3">
                                            <i className="bi bi-gear-fill"></i>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-0">{item.nom}</h6>
                                            <small className="text-muted">{item.id}</small>
                                        </div>
                                    </div>
                                    <p className="text-muted small mb-3">{item.description}</p>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="badge bg-primary">{item.prixBase}</span>
                                        <span className="text-muted small">{item.totalSubs} abonné(s)</span>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <span className="badge bg-success-subtle text-success">{item.activeCount} actif(s)</span>
                                        <span className="badge bg-warning-subtle text-warning">{item.totalRevenue} DH revenu</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
