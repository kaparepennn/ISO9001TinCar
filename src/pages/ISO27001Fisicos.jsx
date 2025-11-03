import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/index.css";

export default function ISO27001Fisicos({ onLogout }) {
  const navigate = useNavigate();

  const controlesIniciales = [
    { codigo: "A.7.1", descripcion: "Perímetro de seguridad física" },
    { codigo: "A.7.2", descripcion: "Entrada física a áreas sensibles" },
    { codigo: "A.7.3", descripcion: "Seguridad de oficinas y salas" },
    { codigo: "A.7.4", descripcion: "Monitoreo de accesos no autorizados" },
    { codigo: "A.7.5", descripcion: "Protección contra incendios e inundaciones" },
    { codigo: "A.7.6", descripcion: "Trabajo en áreas seguras" },
    { codigo: "A.7.7", descripcion: "Limpieza de escritorio/pantalla" },
    { codigo: "A.7.8", descripcion: "Protección de equipos en ubicaciones físicas" },
    { codigo: "A.7.9", descripcion: "Seguridad de activos fuera del sitio" },
    { codigo: "A.7.10", descripcion: "Medios de almacenamiento" },
    { codigo: "A.7.11", descripcion: "Servicios públicos de soporte" },
    { codigo: "A.7.12", descripcion: "Seguridad del cableado" },
    { codigo: "A.7.13", descripcion: "Mantenimiento físico del equipo" },
    { codigo: "A.7.14", descripcion: "Eliminación o reutilización segura de equipos" },
  ];

  const [controles, setControles] = useState(() => {
    const saved = localStorage.getItem("iso27001_fisicos");
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
    localStorage.setItem("iso27001_fisicos", JSON.stringify(controles));
  }, [controles]);

  const handleChange = (index, field, value) => {
    const updated = [...controles];
    updated[index][field] = value;
    setControles(updated);
  };

  return (
    <div className="iso-container">
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

      <main className="content">
        <h1>Dominio Físicos — ISO 27001</h1>
        <p>Controles relacionados con la seguridad física, infraestructura y activos.</p>

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
