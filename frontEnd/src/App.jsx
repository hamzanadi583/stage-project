import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp ";
import AdminDashboard from "./pages/adminPage";
import AgentDashboardPage from "./pages/agentDashboard";
import { AjouterClient } from "./pages/addClient";
import { AjouterAgent } from "./pages/addAgent";
import ProtectedRoute from './ProtectedRoute';
import { UserDetail } from "./pages/UserDetail";
import { ServiceStats } from "./pages/ServiceStats";

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideLayout && <Header />}
      
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/ajoutClient" element={<ProtectedRoute roles={['admin', 'agent']}><AjouterClient /></ProtectedRoute>} />
          <Route path="/ajoutAgent" element={<ProtectedRoute roles={['admin']}><AjouterAgent /></ProtectedRoute>} />
          
          {/* Agent routes */}
          <Route path="/agent-dashboard" element={<ProtectedRoute roles={['agent']}><AgentDashboardPage /></ProtectedRoute>} />
          
          {/* Shared routes */}
          <Route path="/user/:id" element={<ProtectedRoute roles={['admin', 'agent']}><UserDetail /></ProtectedRoute>} />
          <Route path="/serviceList" element={<ProtectedRoute roles={['admin', 'agent']}><ServiceStats /></ProtectedRoute>} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
