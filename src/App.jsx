import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Analisis from "./pages/Analisis";
import Documentacion from "./pages/Documentacion";
import MapaProcesos from "./pages/MapaProcesos";
import Capacitacion from "./pages/Capacitacion";
import Implementacion from "./pages/Implementacion";
import Auditoria from "./pages/Auditoria";
import RegistroEmpresas from "./pages/RegistroEmpresas";
import UsuariosRoles from "./pages/UsuariosRoles";
import ISO9001Home from "./pages/ISO9001Home";
import ISO27001Home from "./pages/ISO27001Home"; // 👈 nuevo

// === Wrapper del Dashboard principal ===
function DashboardWrapper({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <Dashboard
      user={user}
      onLogout={onLogout}
      onNavigate={(norma) => {
        if (norma === "iso9001") {
          navigate("/iso9001"); // 👉 redirige a ISO9001
        } else if (norma === "iso27001") {
          navigate("/iso27001"); // 👉 redirige a ISO27001
        }
      }}
    />
  );
}

// === Aplicación principal ===
function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Routes>
        {/* === LOGIN === */}
        <Route
          path="/"
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
        />

        {/* === DASHBOARD === */}
        <Route
          path="/dashboard"
          element={
            user ? <DashboardWrapper user={user} onLogout={handleLogout} /> : <Navigate to="/" />
          }
        />

        {/* === ISO 9001 con Sidebar completo === */}
        <Route
          path="/iso9001/*"
          element={
            user ? (
              <Sidebar>
                <Routes>
                  <Route index element={<ISO9001Home />} /> {/* Página principal ISO9001 */}
                  <Route path="analisis" element={<Analisis />} />
                  <Route path="documentacion" element={<Documentacion />} />
                  <Route path="mapa-procesos" element={<MapaProcesos />} />
                  <Route path="capacitacion" element={<Capacitacion />} />
                  <Route path="implementacion" element={<Implementacion />} />
                  <Route path="auditoria" element={<Auditoria />} />
                  <Route path="registro-empresas" element={<RegistroEmpresas />} />
                  <Route path="usuarios-roles" element={<UsuariosRoles />} />
                </Routes>
              </Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* === ISO 27001 con su propio header y sidebar === */}
        <Route
          path="/iso27001/*"
          element={user ? <ISO27001Home /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;