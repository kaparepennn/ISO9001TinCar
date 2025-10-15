import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function ISO27001Home() {
  const navigate = useNavigate();

  const handleBack = () => navigate("/dashboard");
  const handleLogout = () => navigate("/");

  return (
    <div className="iso-container">
      {/* ===== Header ===== */}
      <header className="iso-header">
        <div className="brand">
          <img src={logo} alt="TinCar Logo" className="brand-logo" />
          <span className="brand-title">TinCar - ISO 27001</span>
        </div>
        <div className="top-actions">
          <button className="btn ghost" onClick={handleBack}>
            Volver
          </button>
          <button className="btn primary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* ===== Dashboard ===== */}
      <main className="iso-home">
        <h1>Bienvenido al Sistema de Gestión de Seguridad de la Información (ISO27001)</h1>
        <p>
          Aquí encontrarás las herramientas y recursos necesarios para la implementación
          y seguimiento del Sistema de Gestión de Seguridad de la Información (SGSI)
          conforme a la norma ISO 27001:2013.
        </p>

        <div className="iso-cards">
          <div className="iso-card">
            <h3>Contexto de la organización</h3>
            <p>Analiza el entorno interno y externo de la organización.</p>
          </div>

          <div className="iso-card">
            <h3>Liderazgo y compromiso</h3>
            <p>Involucra a la alta dirección en la gestión de la seguridad.</p>
          </div>

          <div className="iso-card">
            <h3>Evaluación de riesgos</h3>
            <p>Identifica, analiza y gestiona los riesgos de seguridad.</p>
          </div>

          <div className="iso-card">
            <h3>Mejora continua</h3>
            <p>Implementa acciones para mantener y mejorar el SGSI.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
