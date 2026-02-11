import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/Home";
import Login from "./components/login";
import SignUp from "./components/SignUp ";

function App() {
  // 1. Get the current URL path
  const location = useLocation();

  // 2. Define which paths should be "full screen" (no header/footer)
  const hideLayout = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 3. Render Header only if NOT on login or signup */}
      {!hideLayout && <Header />}
      
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>

      {/* 4. Render Footer only if NOT on login or signup */}
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
