import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/index.css";

export default function ISO27001Tecnologicos({ onLogout }) {
  const navigate = useNavigate();

  // === Controles del Dominio Tecnológico (A.8.1 - A.8.34) ===
  const controlesIniciales = [
    { codigo: "A.8.1", descripcion: "Controles criptográficos" },
    { codigo: "A.8.2", descripcion: "Gestión de configuración" },
    { codigo: "A.8.3", descripcion: "Seguridad en desarrollo — Principios de codificación segura" },
    { codigo: "A.8.4", descripcion: "Seguridad en desarrollo — Ciclo de vida de software" },
    { codigo: "A.8.5", descripcion: "Gestión de cambios en sistemas y aplicaciones" },
    { codigo: "A.8.6", descripcion: "Pruebas de seguridad antes de la implementación" },
    { codigo: "A.8.7", descripcion: "Registro de actividades y auditoría" },
    { codigo: "A.8.8", descripcion: "Monitoreo de eventos de seguridad" },
    { codigo: "A.8.9", descripcion: "Protección de registros y auditorías" },
    { codigo: "A.8.10", descripcion: "Uso de herramientas de monitoreo y detección" },
    { codigo: "A.8.11", descripcion: "Seguridad en redes — Controles de red" },
    { codigo: "A.8.12", descripcion: "Segmentación y segregación de redes" },
    { codigo: "A.8.13", descripcion: "Seguridad en servicios de red" },
    { codigo: "A.8.14", descripcion: "Gestión de cambios en infraestructuras de red" },
    { codigo: "A.8.15", descripcion: "Uso seguro de servicios en la nube" },
    { codigo: "A.8.16", descripcion: "Protección de servicios web y API" },
    { codigo: "A.8.17", descripcion: "Gestión de puertas traseras y código malicioso" },
    { codigo: "A.8.18", descripcion: "Gestión de vulnerabilidades técnicas" },
    { codigo: "A.8.19", descripcion: "Evaluaciones y escaneos de vulnerabilidades" },
    { codigo: "A.8.20", descripcion: "Gestión de parches de seguridad" },
    { codigo: "A.8.21", descripcion: "Control de acceso — Autenticación de usuarios" },
    { codigo: "A.8.22", descripcion: "Gestión de privilegios y permisos" },
    { codigo: "A.8.23", descripcion: "Gestión de identidades y cuentas" },
    { codigo: "A.8.24", descripcion: "Protección de contraseñas y credenciales" },
    { codigo: "A.8.25", descripcion: "Revisión de accesos periódicos" },
    { codigo: "A.8.26", descripcion: "Protección de información en tránsito" },
    { codigo: "A.8.27", descripcion: "Protección de información en reposo" },
    { codigo: "A.8.28", descripcion: "Seguridad en el correo electrónico y mensajería" },
    { codigo: "A.8.29", descripcion: "Protección contra software malicioso" },
    { codigo: "A.8.30", descripcion: "Gestión de dispositivos móviles" },
    { codigo: "A.8.31", descripcion: "Protección de datos personales y filtrado web" },
    { codigo: "A.8.32", descripcion: "Seguridad en redes inalámbricas" },
    { codigo: "A.8.33", descripcion: "Prevención de fugas de información (DLP)" },
    { codigo: "A.8.34", descripcion: "Supervisión continua de sistemas tecnológicos" },
  ];

  // === Estado inicial con localStorage ===
  const [controles, setControles] = useState(() => {
    const saved = localStorage.getItem("iso27001_tecnologicos");
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

  // === Persistencia en localStorage ===
  useEffect(() => {
    localStorage.setItem("iso27001_tecnologicos", JSON.stringify(controles));
  }, [controles]);

  // === Manejo de cambios ===
  const handleChange = (index, field, value) => {
    const updated = [...controles];
    updated[index][field] = value;
    setControles(updated);
  };

  return (
    <div className="iso-container">
      {/* === Barra superior === */}
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

      {/* === Contenido principal === */}
      <main className="content">
        <h1>Dominio Tecnológicos — ISO 27001</h1>
        <p>
          Controles técnicos de la norma relacionados con criptografía, configuración, desarrollo seguro,
          monitoreo, vulnerabilidades, control de acceso y protección de datos.
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
