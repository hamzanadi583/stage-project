import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCogs } from "react-icons/fa";

export default function AgentSidebar() {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Agent Panel</h3>

      <NavLink to="/agent" end className="sidebar-link">
        <FaTachometerAlt className="sidebar-icon" />
        Dashboard
      </NavLink>

      <NavLink to="/agent/users" className="sidebar-link">
        <FaUsers className="sidebar-icon" />
        Clients
      </NavLink>

      <NavLink to="/agent/services" className="sidebar-link">
        <FaCogs className="sidebar-icon" />
        Services
      </NavLink>
    </div>
  );
}
