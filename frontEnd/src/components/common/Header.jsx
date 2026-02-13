export default function Header({ user, onLogout }) {
  return (
    <header className="app-header">
      <div className="logo">
        <div className="logo-icon">📄</div>
        <span>Gestion des abonnements</span>
      </div>

      <div className="header-right">
        <span className="user-name">{user}</span>
        <button className="btn-logout" onClick={onLogout}>
          Se déconnecter
        </button>
      </div>
    </header>
  );
}
