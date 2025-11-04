import React, { useState, useEffect } from "react";
import "../styles/index.css";

export default function ChecklistFisicos() {
  const [controles, setControles] = useState(() =>
    JSON.parse(localStorage.getItem("iso27001_checklist_fisico")) || []
  );

  const [nuevo, setNuevo] = useState({
    codigo: "",
    descripcion: "",
    estado: "",
    evidencia: "",
    responsable: "",
    fecha: "",
    observaciones: "",
  });

  useEffect(() => {
    localStorage.setItem("iso27001_checklist_fisico", JSON.stringify(controles));
  }, [controles]);

  const agregarControl = () => {
    if (!nuevo.codigo || !nuevo.descripcion) return alert("Completa los campos requeridos");
    setControles([...controles, nuevo]);
    setNuevo({ codigo: "", descripcion: "", estado: "", evidencia: "", responsable: "", fecha: "", observaciones: "" });
  };

  const eliminarControl = (i) => {
    const nuevos = [...controles];
    nuevos.splice(i, 1);
    setControles(nuevos);
  };

  return (
    <div className="checklist-page">
      <h1>Checklist - Dominio Físicos</h1>
      <p>Controles A.7.1 – A.7.14: seguridad de instalaciones, control de acceso físico, áreas seguras, etc.</p>

      <div className="checklist-form">
        <input type="text" placeholder="Código (ej. A.7.1)" value={nuevo.codigo} onChange={(e) => setNuevo({ ...nuevo, codigo: e.target.value })} />
        <input type="text" placeholder="Descripción del control" value={nuevo.descripcion} onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })} />
        <select value={nuevo.estado} onChange={(e) => setNuevo({ ...nuevo, estado: e.target.value })}>
          <option value="">Seleccionar estado</option>
          <option value="Cumple">✅ Cumple</option>
          <option value="Parcial">⚠️ Parcial</option>
          <option value="No cumple">❌ No cumple</option>
          <option value="En proceso">⏳ En proceso</option>
        </select>
        <input type="text" placeholder="Evidencia" value={nuevo.evidencia} onChange={(e) => setNuevo({ ...nuevo, evidencia: e.target.value })} />
        <input type="text" placeholder="Responsable" value={nuevo.responsable} onChange={(e) => setNuevo({ ...nuevo, responsable: e.target.value })} />
        <input type="date" value={nuevo.fecha} onChange={(e) => setNuevo({ ...nuevo, fecha: e.target.value })} />
        <input type="text" placeholder="Observaciones" value={nuevo.observaciones} onChange={(e) => setNuevo({ ...nuevo, observaciones: e.target.value })} />
        <button className="btn primary" onClick={agregarControl}>Agregar control</button>
      </div>

      <table className="checklist-table">
        <thead>
          <tr><th>Código</th><th>Descripción</th><th>Estado</th><th>Evidencia</th>
          <th>Responsable</th><th>Fecha</th><th>Observaciones</th><th>Acción</th></tr>
        </thead>
        <tbody>
          {controles.map((c, i) => (
            <tr key={i}>
              <td>{c.codigo}</td><td>{c.descripcion}</td><td>{c.estado}</td>
              <td>{c.evidencia}</td><td>{c.responsable}</td><td>{c.fecha}</td><td>{c.observaciones}</td>
              <td><button className="btn small danger" onClick={() => eliminarControl(i)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
