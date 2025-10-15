import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import logo from "../assets/logo.png";
import Contexto from "./Contexto";
import Liderazgo from "./Liderazgo";
import Riesgos from "./Riesgos";
import Mejora from "./Mejora";

export default function ISO27001Home() {
  return (
    <div className="iso-container">
      {/* ===== HEADER SUPERIOR ===== */}
      <header className="iso-header">
        <div className="brand">
          <img src={logo} alt="TinCar" className="brand-logo" />
          <span className="brand-title">TinCar</span>
        </div>
        <div className="top-actions">
          <button className="btn secondary" onClick={() => window.history.back()}>
            Volver
          </button>
          <button className="btn primary" onClick={() => (window.location.href = "/")}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <main className="iso-main">
        {/* ===== MENÚ LATERAL ===== */}
        <aside className="sidebar">
          <h2>ISO 27001</h2>
          <ul>
            <li>
              <Link to="contexto">Contexto de la organización</Link>
            </li>
            <li>
              <Link to="liderazgo">Liderazgo y compromiso</Link>
            </li>
            <li>
              <Link to="riesgos">Evaluación de riesgos</Link>
            </li>
            <li>
              <Link to="mejora">Mejora continua</Link>
            </li>
          </ul>
        </aside>

        {/* ===== ÁREA DE CONTENIDO ===== */}
        <section className="content">
          <Routes>
            <Route
              index
              element={
                <div className="iso-home">
                  <h1>Dashboard ISO 27001</h1>
                  <p>
                    Bienvenido al Sistema de Gestión de Seguridad de la Información.  
                    Aquí podrás acceder a las diferentes fases de la norma ISO 27001.
                  </p>
                </div>
              }
            />
            <Route path="contexto" element={<Contexto />} />
            <Route path="liderazgo" element={<Liderazgo />} />
            <Route path="riesgos" element={<Riesgos />} />
            <Route path="mejora" element={<Mejora />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}
