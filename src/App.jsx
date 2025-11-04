import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import ISO27001Sidebar from "./components/ISO27001Sidebar";
import ISO9001Home from "./pages/ISO9001Home";
import ISO27001Home from "./pages/ISO27001Home";
import ISO27001Checklist from "./pages/ISO27001Checklist";
import Analisis from "./pages/Analisis";
import Documentacion from "./pages/Documentacion";
import MapaProcesos from "./pages/MapaProcesos";
import Capacitacion from "./pages/Capacitacion";
import Implementacion from "./pages/Implementacion";
import Auditoria from "./pages/Auditoria";
import RegistroEmpresas from "./pages/RegistroEmpresas";
import UsuariosRoles from "./pages/UsuariosRoles";

// Wrapper del Dashboard principal
function DashboardWrapper({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <Dashboard
      user={user}
      onLogout={onLogout}
      onNavigate={(norma) => {
        if (norma === "iso9001") navigate("/iso9001");
        else if (norma === "iso27001") navigate("/iso27001");
      }}
    />
  );
}

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <DashboardWrapper user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />

        {/* ISO9001 con sidebar */}
        <Route
          path="/iso9001/*"
          element={
            user ? (
              <Sidebar>
                <Routes>
                  <Route index element={<ISO9001Home />} />
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

        {/* ISO27001 con sidebar y dashboard */}
        <Route
          path="/iso27001/*"
          element={
            user ? (
              <ISO27001Sidebar onLogout={handleLogout}>
                <Routes>
                  <Route index element={<ISO27001Home />} />
                  <Route path="checklist" element={<ISO27001Checklist />} />
                </Routes>
              </ISO27001Sidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
