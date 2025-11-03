import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/index.css";

export default function ISO27001Personas({ onLogout }) {
  const navigate = useNavigate();

  const controlesIniciales = [
    { codigo: "A.6.1", descripcion: "Evaluación del personal antes del empleo" },
    { codigo: "A.6.2", descripcion: "Términos y condiciones de empleo" },
    { codigo: "A.6.3", descripcion: "Concienciación y capacitación en seguridad" },
    { codigo: "A.6.4", descripcion: "Procedimiento disciplinario por violaciones" },
    { codigo: "A.6.5", descripcion: "Responsabilidades post-empleo" },
    { codigo: "A.6.6", descripcion: "Acuerdos de confidencialidad / no divulgación" },
    { codigo: "A.6.7", descripcion: "Trabajo remoto (Remote Working)" },
    { codigo: "A.6.8", descripcion: "Reporte de incidentes por el personal" },
  ];

  const [controles, setControles] = useState(() => {
    const saved = localStorage.getItem("iso27001_personas");
    return saved
      ? JSON.parse(saved)
      : controlesIniciales.map(c => ({
          ...c,
          estado: "",
          evidencia: "",
          responsable: "",
          fecha: "",
          observaciones: "",
        }));
  });

  useEffect(() => {
    localStorage.setItem("iso27001_personas", JSON.stringify(controles));
  }, [controles]);

  const handleChange = (index, field, value) => {
    const updated = [...controles];
    updated[index][field] = value;
    setControles(updated);
  };

  return (
    <div className="iso-container">
      {/* Header */}
      <header className="iso-header">
        <div className="brand">
          <img src={logo} alt="TinCar" className="brand-logo" />
          <span className="brand-title">TinCar</span>
        </div>
        <div className="top-actions">
          <button className="btn secondary" onClick={() => navigate("/iso27001")}>
            Volver
          </button>
          <button className="btn ghost" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="content">
        <h1>Dominio Personas — ISO 27001</h1>
        <p>
          Controles relacionados con la gestión del personal, la capacitación, la
          confidencialidad y el trabajo remoto.
        </p>

        <table className="checklist-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Evidencia</th>
              <th>Responsable</th>
              <th>Fecha revisión</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {controles.map((ctrl, i) => (
              <tr key={i}>
                <td>{ctrl.codigo}</td>
                <td>{ctrl.descripcion}</td>
                <td>
                  <select
                    value={ctrl.estado}
                    onChange={(e) => handleChange(i, "estado", e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Cumple">Cumple</option>
                    <option value="Parcial">Parcial</option>
                    <option value="No cumple">No cumple</option>
                    <option value="En proceso">En proceso</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={ctrl.evidencia}
                    onChange={(e) => handleChange(i, "evidencia", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={ctrl.responsable}
                    onChange={(e) => handleChange(i, "responsable", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={ctrl.fecha}
                    onChange={(e) => handleChange(i, "fecha", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={ctrl.observaciones}
                    onChange={(e) => handleChange(i, "observaciones", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
