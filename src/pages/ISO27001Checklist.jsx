import React, { useState, useEffect } from "react";
import "../styles/index.css";

const controlesIniciales = [
  { codigo: "A.5.1", descripcion: "Política de seguridad de la información", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.2", descripcion: "Roles y responsabilidades de seguridad", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.3", descripcion: "Contacto con autoridades", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.4", descripcion: "Contacto con grupos de interés", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.9", descripcion: "Inventario de activos", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.10", descripcion: "Uso aceptable de activos", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.11", descripcion: "Seguridad en proyectos", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.24", descripcion: "Gestión de incidentes de seguridad", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.29", descripcion: "Planificación de continuidad del negocio", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.30", descripcion: "Implementación de la continuidad del negocio", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.31", descripcion: "Verificación y pruebas de continuidad", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.32", descripcion: "Evaluación post-incidente", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.33", descripcion: "Revisión y mejora del plan de continuidad", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.34", descripcion: "Cumplimiento con requisitos legales y contractuales", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.35", descripcion: "Propiedad intelectual", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.36", descripcion: "Protección de registros", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
  { codigo: "A.5.37", descripcion: "Privacidad y protección de datos personales", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" },
];

export default function ISO27001Checklist() {
  const [controles, setControles] = useState(() => {
    const guardado = localStorage.getItem("iso27001_checklist_organizacional");
    return guardado ? JSON.parse(guardado) : controlesIniciales;
  });

  useEffect(() => {
    localStorage.setItem("iso27001_checklist_organizacional", JSON.stringify(controles));
  }, [controles]);

  const actualizarCampo = (index, campo, valor) => {
    const nuevos = [...controles];
    nuevos[index][campo] = valor;
    setControles(nuevos);
  };

  const calcularPorcentaje = () => {
    const total = controles.length;
    const cumplidos = controles.filter((c) => c.estado === "Cumple").length;
    return ((cumplidos / total) * 100).toFixed(1);
  };

  return (
    <div className="checklist-container">
      <h1 className="titulo-checklist">Checklist ISO 27001 – Dominio Organizacional</h1>
      <p className="descripcion-checklist">
        Evalúa los controles organizacionales según la norma ISO 27001. Los datos se guardan automáticamente en tu navegador.
      </p>

      <div className="resumen-progreso">
        <h3>Progreso general: {calcularPorcentaje()}%</h3>
        <progress value={calcularPorcentaje()} max="100"></progress>
      </div>

      <div className="tabla-checklist">
        <table>
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
                    onChange={(e) => actualizarCampo(i, "estado", e.target.value)}
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
                    type="file"
                    onChange={(e) =>
                      actualizarCampo(i, "evidencia", e.target.files[0]?.name || "")
                    }
                  />
                  {ctrl.evidencia && <small>{ctrl.evidencia}</small>}
                </td>
                <td>
                  <input
                    type="text"
                    value={ctrl.responsable}
                    placeholder="Nombre"
                    onChange={(e) => actualizarCampo(i, "responsable", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={ctrl.fecha}
                    onChange={(e) => actualizarCampo(i, "fecha", e.target.value)}
                  />
                </td>
                <td>
                  <textarea
                    value={ctrl.observaciones}
                    onChange={(e) => actualizarCampo(i, "observaciones", e.target.value)}
                    placeholder="Comentarios u observaciones"
                  ></textarea>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
