import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

export default function ISO27001Home() {
  const navigate = useNavigate();

  return (
    <div className="iso-content">
      <h1>ISO 27001 — Sistema de Gestión de Seguridad de la Información</h1>
      <p className="description">
        En esta sección podrás gestionar la implementación de la norma ISO 27001,
        incluyendo los checklist, controles y evidencias asociadas a los dominios 
        Organizacionales, Personas, Físicos y Tecnológicos.
      </p>

      <div className="iso-dashboard-grid">
        {/* === Tarjeta de checklist === */}
        <div className="iso-card">
          <h3>Checklist General</h3>
          <p>Evalúa el cumplimiento global de los controles ISO 27001.</p>
          <button
            className="btn primary"
            onClick={() => navigate("/iso27001/checklist")}
          >
            Ver checklist
          </button>
        </div>

        {/* === Tarjeta de dominios === */}
        <div className="iso-card">
          <h3>Dominios</h3>
          <p>Explora los 4 dominios clave de la norma y sus controles asociados.</p>
          <div className="btn-group">
            <button
              className="btn small"
              onClick={() => navigate("/iso27001/organizacionales")}
            >
              Organizacionales
            </button>
            <button
              className="btn small"
              onClick={() => navigate("/iso27001/personas")}
            >
              Personas
            </button>
            <button
              className="btn small"
              onClick={() => navigate("/iso27001/fisicos")}
            >
              Físicos
            </button>
            <button
              className="btn small"
              onClick={() => navigate("/iso27001/tecnologicos")}
            >
              Tecnológicos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
