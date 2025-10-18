import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import "../styles/index.css"

export default function Sidebar({ children, onLogout }) {
  const navigate = useNavigate()

  return (
    <div className="iso-container">
      {/* Header fijo arriba */}
      <header className="iso-header">
        <div className="brand">
          <img src={logo} alt="TinCar" className="brand-logo" />
          <span className="brand-title">TinCar</span>
        </div>
        <div className="top-actions">
          <button className="btn secondary" onClick={() => navigate("/dashboard")}>
            Volver
          </button>
          <button className="btn ghost" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Layout de 2 columnas: sidebar + contenido */}
      <div className="iso-main">
        <aside className="sidebar">
          <h2 className="sidebar-title">ISO 9001</h2>
          <nav>
            <ul>
              <li>
                <NavLink to="/iso9001/analisis" className={({ isActive }) => isActive ? "active" : ""}>
                  Análisis
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso9001/documentacion" className={({ isActive }) => isActive ? "active" : ""}>
                  Documentación
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso9001/mapa-procesos" className={({ isActive }) => isActive ? "active" : ""}>
                  Mapa de procesos
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso9001/capacitacion" className={({ isActive }) => isActive ? "active" : ""}>
                  Capacitación
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso9001/implementacion" className={({ isActive }) => isActive ? "active" : ""}>
                  Implementación
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso9001/auditoria" className={({ isActive }) => isActive ? "active" : ""}>
                  Auditoría
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso9001/registro-empresas" className={({ isActive }) => isActive ? "active" : ""}>
                  Registro de empresas
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso9001/usuarios-roles" className={({ isActive }) => isActive ? "active" : ""}>
                  Usuarios y roles
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/Contexto" className={({ isActive }) => isActive ? "active" : ""}>
                  Contexto de la organización
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/Mejora" className={({ isActive }) => isActive ? "active" : ""}>
                  Mejora Continua
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/Liderazgo" className={({ isActive }) => isActive ? "active" : ""}>
                  Liderazgo y compromiso
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/Riesgos" className={({ isActive }) => isActive ? "active" : ""}>
                  Evaluación de riesgos
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="content">{children}</main>
      </div>
    </div>
  )
}
