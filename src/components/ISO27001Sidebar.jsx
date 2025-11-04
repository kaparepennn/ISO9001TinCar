import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/index.css";

export default function ISO27001Sidebar({ children, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="iso-container">
      {/* Header superior */}
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

      {/* Layout lateral */}
      <div className="iso-main">
        <aside className="sidebar">
          <h2 className="sidebar-title">ISO 27001</h2>
          <nav>
            <ul>
              <li>
                <NavLink to="/iso27001" end className={({ isActive }) => (isActive ? "active" : "")}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/organizacionales" className={({ isActive }) => (isActive ? "active" : "")}>
                  Organizacionales
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/personas" className={({ isActive }) => (isActive ? "active" : "")}>
                  Personas
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/fisicos" className={({ isActive }) => (isActive ? "active" : "")}>
                  Físicos
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/tecnologicos" className={({ isActive }) => (isActive ? "active" : "")}>
                  Tecnológicos
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="content">{children}</main>
      </div>
    </div>
  );
}
