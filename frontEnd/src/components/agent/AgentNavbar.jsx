import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function AgentNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="agent-navbar">
      <strong>{user?.email}</strong>

      <div style={{ display: "flex", gap: "12px" }}>
        <Link to="/agent">Dashboard</Link>
        <button className="btn-delete" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
