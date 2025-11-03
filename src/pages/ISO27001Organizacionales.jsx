import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/index.css";

export default function ISO27001Organizacionales({ onLogout }) {
  const navigate = useNavigate();

  // === Estructura inicial ===
  const controlesIniciales = [
    { codigo: "A.5.1", descripcion: "Política de seguridad de la información." },
    { codigo: "A.5.2", descripcion: "Roles y responsabilidades de seguridad." },
    { codigo: "A.5.3", descripcion: "Contacto con autoridades." },
    { codigo: "A.5.4", descripcion: "Contacto con grupos de interés especial." },
    { codigo: "A.5.9", descripcion: "Inventario de activos." },
    { codigo: "A.5.10", descripcion: "Uso aceptable de activos." },
    { codigo: "A.5.11", descripcion: "Seguridad en proyectos." },
    { codigo: "A.5.24", descripcion: "Gestión de incidentes de seguridad." },
    { codigo: "A.5.29", descripcion: "Continuidad del negocio." },
    { codigo: "A.5.30", descripcion: "Estrategia de continuidad y recuperación." },
    { codigo: "A.5.31", descripcion: "Procedimientos de continuidad." },
    { codigo: "A.5.32", descripcion: "Restauración de servicios." },
    { codigo: "A.5.33", descripcion: "Pruebas de continuidad del negocio." },
    { codigo: "A.5.34", descripcion: "Cumplimiento con requisitos legales." },
    { codigo: "A.5.35", descripcion: "Protección de la propiedad intelectual." },
    { codigo: "A.5.36", descripcion: "Privacidad y protección de datos personales." },
    { codigo: "A.5.37", descripcion: "Revisión del cumplimiento." },
  ];

  // === Estado local con persistencia ===
  const [controles, setControles] = useState(() => {
    const saved = localStorage.getItem("iso27001_organizacionales");
    return saved
      ? JSON.parse(saved)
      : controlesIniciales.map((ctrl) => ({
          ...ctrl,
          estado: "",
          evidencia: "",
          responsable: "",
          fecha: "",
          observaciones: "",
        }));
  });

  useEffect(() => {
    localStorage.setItem("iso27001_organizacionales", JSON.stringify(controles));
  }, [controles]);

  // === Manejadores ===
  const actualizarCampo = (index, campo, valor) => {
    const nuevos = [...controles];
    nuevos[index][campo] = valor;
    setControles(nuevos);
  };

  const progreso =
    Math.round(
      (controles.filter((c) => c.estado === "Cumple").length /
        controles.length) *
        100
    ) || 0;

  // === Render ===
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

      {/* === Cuerpo principal === */}
      <main className="content">
        <h1>Dominio Organizacionales — ISO 27001</h1>
        <p className="description">
          Este módulo cubre los controles organizacionales (A.5.1 – A.5.37),
          incluyendo políticas, roles, responsabilidades, continuidad del negocio
          y cumplimiento normativo.
        </p>

        {/* === Barra de progreso === */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progreso}%`, backgroundColor: "#0056b3" }}
          >
            {progreso}%
          </div>
        </div>

        {/* === Tabla de checklist === */}
        <div className="table-wrapper">
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
              {controles.map((control, index) => (
                <tr key={index}>
                  <td className="codigo">{control.codigo}</td>
                  <td>{control.descripcion}</td>
                  <td>
                    <select
                      value={control.estado}
                      onChange={(e) => actualizarCampo(index, "estado", e.target.value)}
                      className="select-estado"
                    >
                      <option value="">Seleccionar</option>
                      <option value="Cumple">✅ Cumple</option>
                      <option value="Parcial">⚠️ Parcial</option>
                      <option value="No cumple">❌ No cumple</option>
                      <option value="En proceso">⏳ En proceso</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enlace o referencia"
                      value={control.evidencia}
                      onChange={(e) =>
                        actualizarCampo(index, "evidencia", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Nombre responsable"
                      value={control.responsable}
                      onChange={(e) =>
                        actualizarCampo(index, "responsable", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={control.fecha}
                      onChange={(e) => actualizarCampo(index, "fecha", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Comentarios u observaciones"
                      value={control.observaciones}
                      onChange={(e) =>
                        actualizarCampo(index, "observaciones", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
