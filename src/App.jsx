import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Sidebar from "./components/Sidebar"
import Analisis from "./pages/Analisis"
import Documentacion from "./pages/Documentacion"
import MapaProcesos from "./pages/MapaProcesos"
import Capacitacion from "./pages/Capacitacion"
import Implementacion from "./pages/Implementacion"
import Auditoria from "./pages/Auditoria"
import RegistroEmpresas from "./pages/RegistroEmpresas"
import UsuariosRoles from "./pages/UsuariosRoles"
import ISO9001Home from "./pages/ISO9001Home"  // 👈 nuevo

// Wrapper para Dashboard con navegación
function DashboardWrapper({ user, onLogout }) {
  const navigate = useNavigate()

  return (
    <Dashboard
      user={user}
      onLogout={onLogout}
      onNavigate={(norma) => {
        if (norma === "iso9001") {
          navigate("/iso9001") // 👈 ahora va a la página principal de ISO9001
        } else if (norma === "iso27001") {
          alert("ISO27001 aún en construcción 🚧")
        }
      }}
    />
  )
}

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => setUser(userData)
  const handleLogout = () => setUser(null)

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            user ? <DashboardWrapper user={user} onLogout={handleLogout} /> : <Navigate to="/" />
          }
        />

        {/* ISO9001 con su menú */}
        <Route
          path="/iso9001/*"
          element={
            user ? (
              <Sidebar>
                <Routes>
                  <Route index element={<ISO9001Home />} /> {/* 👈 Página principal */}
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
      </Routes>
    </Router>
  )
}

export default App
