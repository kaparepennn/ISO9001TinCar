import React, { useState, useEffect } from "react";

export default function Analisis() {
  const initialChecklist = [
    { id: 1, text: "Política de calidad y compromiso de la alta dirección", done: false },
    { id: 2, text: "Gestión de procesos internos y su documentación", done: false },
    { id: 3, text: "Competencias y formación del personal", done: false },
    { id: 4, text: "Gestión de riesgos y oportunidades", done: false },
    { id: 5, text: "Medición y seguimiento de la satisfacción del cliente", done: false },
  ];

  const [checklist, setChecklist] = useState(initialChecklist);

  // Cargar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("analisisChecklist");
    if (stored) {
      setChecklist(JSON.parse(stored));
    }
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("analisisChecklist", JSON.stringify(checklist));
  }, [checklist]);

  const toggleCheck = (id) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <div className="registro-page">
      <h1>Análisis de la Situación Actual</h1>
      <p>
        En esta primera etapa, se realiza una evaluación de las actividades realizadas 
        por la organización con el fin de determinar el punto de partida adecuado para 
        la implementación efectiva de la norma <strong>ISO 9001</strong>. Además, se establecen 
        los objetivos y metas a alcanzar en el <strong>Sistema de Gestión de la Calidad (SGC)</strong>.
      </p>

      {/* Caja de análisis */}
      <div className="empresa-form">
        <h2>Objetivos del Análisis</h2>
        <ul className="analysis-list">
          <li>Evaluar el estado actual de los procesos y prácticas de la organización.</li>
          <li>Identificar brechas frente a los requisitos de la norma ISO 9001.</li>
          <li>Definir objetivos y metas iniciales para el Sistema de Gestión de la Calidad.</li>
          <li>Establecer una línea base para medir la mejora continua.</li>
        </ul>
      </div>

      {/* Checklist persistente */}
      <div className="empresa-form">
        <h2>Checklist de Áreas Clave</h2>
        <ul className="checklist">
          {checklist.map((item) => (
            <li
              key={item.id}
              className={item.done ? "done" : ""}
              onClick={() => toggleCheck(item.id)}
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleCheck(item.id)}
              />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="empresa-form">
        <h2>Resultados Esperados</h2>
        <p>
          Al finalizar esta etapa, la organización debe contar con un diagnóstico claro 
          de su situación actual respecto al cumplimiento de la norma ISO 9001, así como 
          un plan preliminar de acción para avanzar en la implementación del Sistema de 
          Gestión de la Calidad.
        </p>
      </div>
    </div>
  );
}
