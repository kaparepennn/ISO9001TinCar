import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/index.css";

export default function ISO27001Checklist({ onLogout }) {
  const navigate = useNavigate();

  // === Estructura del checklist según ISO 27001 ===
  const checklistInicial = [
    {
      categoria: "Contexto de la organización",
      controles: [
        "Identificar las partes interesadas internas y externas.",
        "Definir el alcance del SGSI (Sistema de Gestión de Seguridad de la Información).",
        "Analizar los riesgos y oportunidades relacionados con la seguridad de la información.",
        "Documentar las políticas y objetivos del SGSI."
      ]
    },
    {
      categoria: "Liderazgo y compromiso",
      controles: [
        "La dirección demuestra liderazgo y compromiso con la seguridad de la información.",
        "Se ha definido una política de seguridad clara y comunicada.",
        "Los roles y responsabilidades están asignados y documentados."
      ]
    },
    {
      categoria: "Planificación del SGSI",
      controles: [
        "Se ha realizado una evaluación de riesgos de seguridad de la información.",
        "Se han identificado y documentado los controles necesarios para gestionar los riesgos.",
        "Se han establecido objetivos de seguridad medibles y coherentes con la política."
      ]
    },
    {
      categoria: "Soporte y recursos",
      controles: [
        "La organización dispone de recursos suficientes para mantener el SGSI.",
        "El personal ha sido capacitado en materia de seguridad de la información.",
        "La comunicación interna y externa del SGSI está claramente definida.",
        "La documentación y control de la información están actualizados."
      ]
    },
    {
      categoria: "Operación y control",
      controles: [
        "Se implementan controles para reducir los riesgos identificados.",
        "Los incidentes de seguridad son gestionados y documentados.",
        "Se mantienen evidencias de cumplimiento de los procedimientos operativos.",
        "Se gestionan los cambios de manera controlada."
      ]
    },
    {
      categoria: "Evaluación del desempeño",
      controles: [
        "Se realizan auditorías internas periódicas del SGSI.",
        "La dirección revisa los resultados del SGSI y toma decisiones basadas en evidencia.",
        "Los indicadores de desempeño son medidos y analizados."
      ]
    },
    {
      categoria: "Mejora continua",
      controles: [
        "Se identifican no conformidades y se implementan acciones correctivas.",
        "Se promueve la mejora continua del SGSI.",
        "Las lecciones aprendidas de incidentes se documentan y comunican."
      ]
    }
  ];

  // === Estado con persistencia local ===
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem("iso27001_checklist");
    return saved ? JSON.parse(saved) : checklistInicial.map(c => ({
      ...c,
      controles: c.controles.map(control => ({ texto: control, cumplido: false }))
    }));
  });

  useEffect(() => {
    localStorage.setItem("iso27001_checklist", JSON.stringify(checklist));
  }, [checklist]);

  // === Manejo del cambio de checkbox ===
  const toggleControl = (catIndex, ctrlIndex) => {
    const nuevoChecklist = [...checklist];
    nuevoChecklist[catIndex].controles[ctrlIndex].cumplido = 
      !nuevoChecklist[catIndex].controles[ctrlIndex].cumplido;
    setChecklist(nuevoChecklist);
  };

  const progresoTotal = Math.round(
    (checklist.flatMap(c => c.controles).filter(ctrl => ctrl.cumplido).length /
      checklist.flatMap(c => c.controles).length) * 100
  );

  return (
    <div className="iso-container">
      {/* === Header === */}
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
        <h1>Checklist General — ISO 27001</h1>
        <p>
          Este checklist te ayudará a evaluar el nivel de cumplimiento de la organización
          con los requisitos principales de la norma ISO 27001:2013/2022.
        </p>

        {/* === Indicador de progreso === */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progresoTotal}%` }}>
            {progresoTotal}%
          </div>
        </div>

        {/* === Contenido del checklist === */}
        <div className="checklist-container">
          {checklist.map((categoria, catIndex) => (
            <div key={catIndex} className="checklist-section">
              <h2>{categoria.categoria}</h2>
              <ul>
                {categoria.controles.map((control, ctrlIndex) => (
                  <li key={ctrlIndex}>
                    <label>
                      <input
                        type="checkbox"
                        checked={control.cumplido}
                        onChange={() => toggleControl(catIndex, ctrlIndex)}
                      />
                      <span>{control.texto}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
