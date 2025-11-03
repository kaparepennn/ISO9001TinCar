import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/index.css";

export default function ISO27001Organizacionales({ onLogout }) {
  const navigate = useNavigate();

  // === Estructura inicial del checklist ===
  const checklistInicial = [
    {
      codigo: "A.5.1",
      control: "Política de seguridad",
      descripcion: "Definir, aprobar y comunicar políticas de seguridad de la información alineadas con los objetivos de la organización.",
    },
    {
      codigo: "A.5.2",
      control: "Roles y responsabilidades",
      descripcion: "Asignar responsabilidades claras en materia de seguridad de la información a todos los niveles organizativos.",
    },
    {
      codigo: "A.5.3 - A.5.4",
      control: "Contacto con autoridades y grupos de interés",
      descripcion: "Establecer y mantener contactos con las autoridades relevantes y grupos de interés para la gestión de incidentes y cumplimiento legal.",
    },
    {
      codigo: "A.5.9 - A.5.10",
      control: "Inventario y uso aceptable de activos",
      descripcion: "Mantener un inventario actualizado de los activos de información y definir reglas claras de uso aceptable.",
    },
    {
      codigo: "A.5.11",
      control: "Seguridad en proyectos",
      descripcion: "Incorporar requisitos de seguridad de la información en la gestión de proyectos desde sus fases iniciales.",
    },
    {
      codigo: "A.5.24",
      control: "Gestión de incidentes de seguridad",
      descripcion: "Definir procesos para reportar, registrar y resolver incidentes de seguridad de la información.",
    },
    {
      codigo: "A.5.29 - A.5.33",
      control: "Continuidad del negocio",
      descripcion: "Desarrollar, implementar y probar planes de continuidad del negocio relacionados con la seguridad de la información.",
    },
    {
      codigo: "A.5.34 - A.5.37",
      control: "Cumplimiento normativo",
      descripcion: "Asegurar el cumplimiento de requisitos legales, reglamentarios y contractuales relacionados con la seguridad de la información.",
    },
  ];

  // === Estado persistente en localStorage ===
  const [controles, setControles] = useState(() => {
    const saved = localStorage.getItem("iso27001_organizacionales");
    return saved
      ? JSON.parse(saved)
      : checklistInicial.map((item) => ({
          ...item,
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

  // === Manejo de cambios en el checklist ===
  const handleChange = (index, field, value) => {
    const nuevos = [...controles];
    nuevos[index][field] = value;
    setControles(nuevos);
  };

  const progreso = Math.round(
    (controles.filter((c) => c.estado === "Cumple").length / controles.length) * 100
  );

  return (
    <div className="iso-container">
      {/* === Header superior === */}
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
        <h1>Dominio Organizacionales — ISO 27001</h1>
        <p>
          Este módulo abarca los 37 controles del dominio organizacional (A.5.1 – A.5.37), 
          incluyendo políticas, roles, responsabilidades, gestión de incidentes, continuidad 
          del negocio y cumplimiento normativo.
        </p>

        {/* === Barra de progreso === */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progreso}%` }}
          >
            {progreso}%
          </div>
        </div>

        {/* === Tabla de checklist === */}
        <div className="checklist-table">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Control</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Evidencia</th>
                <th>Responsable</th>
                <th>Fecha revisión</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {controles.map((ctrl, index) => (
                <tr key={index}>
                  <td>{ctrl.codigo}</td>
                  <td>{ctrl.control}</td>
                  <td>{ctrl.descripcion}</td>
                  <td>
                    <select
                      value={ctrl.estado}
                      onChange={(e) =>
                        handleChange(index, "estado", e.target.value)
                      }
                    >
                      <option value="">Seleccionar</option>
                      <option value="Cumple">Cumple</option>
                      <option value="Parcial">Parcial</option>
                      <option value="No cumple">No cumple</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Link o ruta..."
                      value={ctrl.evidencia}
                      onChange={(e) =>
                        handleChange(index, "evidencia", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Nombre responsable"
                      value={ctrl.responsable}
                      onChange={(e) =>
                        handleChange(index, "responsable", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={ctrl.fecha}
                      onChange={(e) =>
                        handleChange(index, "fecha", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Observaciones..."
                      value={ctrl.observaciones}
                      onChange={(e) =>
                        handleChange(index, "observaciones", e.target.value)
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
