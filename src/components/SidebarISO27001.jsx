import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/index.css";

export default function Sidebar({ children, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="iso-container">
      {/* === Barra superior === */}
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

      {/* === Layout general === */}
      <div className="iso-main">
        {/* === Sidebar lateral === */}
        <aside className="sidebar">
          <h2 className="sidebar-title">ISO27001</h2>
          <nav>
            <ul>
              <li>
                <NavLink to="/iso27001" end className={({ isActive }) => (isActive ? "active" : "")}>
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/checklist" className={({ isActive }) => (isActive ? "active" : "")}>
                  Chaecklist General
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/organizacionales" className={({ isActive }) => (isActive ? "active" : "")}>
                  Dominio Organizacionales
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/personas" className={({ isActive }) => (isActive ? "active" : "")}>
                  Dominios Personales
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/fisicos" className={({ isActive }) => (isActive ? "active" : "")}>
                  Dominios físiscos
                </NavLink>
              </li>
              <li>
                <NavLink to="/iso27001/tecnologicos" className={({ isActive }) => (isActive ? "active" : "")}>
                  Dominios tecnológicos
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        {/* === Contenido dinámico === */}
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
