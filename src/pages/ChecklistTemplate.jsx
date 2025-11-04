import React, { useState, useEffect } from "react";

export default function ChecklistTemplate({ titulo, storageKey, controlesIniciales }) {
  const [controles, setControles] = useState(() => JSON.parse(localStorage.getItem(storageKey)) || controlesIniciales);
  const [modoEdicion, setModoEdicion] = useState(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(controles));
  }, [controles]);

  const actualizar = (i, campo, valor) => {
    const copia = [...controles];
    copia[i][campo] = valor;
    setControles(copia);
  };

  const eliminar = (i) => {
    const nuevo = controles.filter((_, idx) => idx !== i);
    setControles(nuevo);
  };

  return (
    <div className="checklist-page">
      <h1>{titulo}</h1>

      <table className="checklist-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Evidencia</th>
            <th>Responsable</th>
            <th>Fecha</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {controles.map((c, i) => (
            <tr key={i}>
              <td>{c.codigo}</td>
              <td>{c.descripcion}</td>
              <td>
                <select value={c.estado} onChange={(e) => actualizar(i, "estado", e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="Cumple">✅ Cumple</option>
                  <option value="Parcial">⚠️ Parcial</option>
                  <option value="No cumple">❌ No cumple</option>
                  <option value="En proceso">⏳ En proceso</option>
                </select>
              </td>
              <td><input value={c.evidencia} onChange={(e) => actualizar(i, "evidencia", e.target.value)} /></td>
              <td><input value={c.responsable} onChange={(e) => actualizar(i, "responsable", e.target.value)} /></td>
              <td><input type="date" value={c.fecha} onChange={(e) => actualizar(i, "fecha", e.target.value)} /></td>
              <td><input value={c.observaciones} onChange={(e) => actualizar(i, "observaciones", e.target.value)} /></td>
              <td>
                <button className="btn small" onClick={() => setModoEdicion(i)}>✏️</button>
                <button className="btn small danger" onClick={() => eliminar(i)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
