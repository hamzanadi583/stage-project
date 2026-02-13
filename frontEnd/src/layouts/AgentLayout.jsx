import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import AgentSidebar from "../components/agent/AgentSidebar.jsx";
import AgentNavbar from "../components/agent/AgentNavbar.jsx";

export default function AgentLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="agent-layout">
      <AgentSidebar />

      <div className="agent-content">
        <AgentNavbar />
        <Outlet />
      </div>
    </div>
  );
}
