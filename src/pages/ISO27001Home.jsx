import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/index.css";

export default function ISO27001Home({ onLogout }) {
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

      {/* === Layout general con sidebar === */}
      <div className="iso-main">
        <aside className="sidebar">
          <h2 className="sidebar-title">ISO27001</h2>
          <nav>
            <ul>
              <li>
                <button className="nav-btn" onClick={() => navigate("/iso27001/checklist")}>
                  Checklist General
                </button>
              </li>
              <li>
                <button className="nav-btn" onClick={() => navigate("/iso27001/organizacionales")}>
                  Organizacionales
                </button>
              </li>
              <li>
                <button className="nav-btn" onClick={() => navigate("/iso27001/personas")}>
                  Personas
                </button>
              </li>
              <li>
                <button className="nav-btn" onClick={() => navigate("/iso27001/fisicos")}>
                  Físicos
                </button>
              </li>
              <li>
                <button className="nav-btn" onClick={() => navigate("/iso27001/tecnologicos")}>
                  Tecnológicos
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* === Contenido principal === */}
        <main className="content">
          <div className="iso-content">
            <h1>ISO 27001 — Sistema de Gestión de Seguridad de la Información</h1>
            <p className="description">
              Gestiona la implementación y seguimiento de la norma ISO 27001 mediante checklists, 
              controles y evidencias de los dominios Organizacionales, Personas, Físicos y Tecnológicos.
            </p>

            <div className="iso-dashboard-grid">
              <div className="iso-card">
                <h3>Checklist General</h3>
                <p>Evalúa el cumplimiento global de la norma ISO 27001.</p>
                <button
                  className="btn primary"
                  onClick={() => navigate("/iso27001/checklist")}
                >
                  Ver checklist
                </button>
              </div>

              <div className="iso-card">
                <h3>Dominios</h3>
                <p>Explora los 4 dominios clave y sus controles asociados.</p>
                <div className="btn-group">
                  <button className="btn small" onClick={() => navigate("/iso27001/organizacionales")}>
                    Organizacionales
                  </button>
                  <button className="btn small" onClick={() => navigate("/iso27001/personas")}>
                    Personas
                  </button>
                  <button className="btn small" onClick={() => navigate("/iso27001/fisicos")}>
                    Físicos
                  </button>
                  <button className="btn small" onClick={() => navigate("/iso27001/tecnologicos")}>
                    Tecnológicos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
