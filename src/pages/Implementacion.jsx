import React, { useEffect, useState } from "react";

export default function Implementacion() {
  const initialForm = {
    area: "",
    titulo: "",
    descripcion: "",
    responsable: "",
    indicadores: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "Pendiente",
    observaciones: "",
  };

  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);
  const [detailItem, setDetailItem] = useState(null);

  // Cargar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("implementacionISO9001");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("implementacionISO9001", JSON.stringify(items));
  }, [items]);

  // Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Guardar / actualizar
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.area || !form.titulo || !form.responsable) {
      alert("Por favor completa: Área, Título y Responsable.");
      return;
    }

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = { ...form, updatedAt: new Date().toISOString() };
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, { ...form, createdAt: new Date().toISOString() }]);
    }

    setForm(initialForm);
  };

  const handleEdit = (index) => {
    setForm(items[index]);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    if (!window.confirm("¿Eliminar este elemento?")) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copiado al portapapeles."))
      .catch(() => alert("Error al copiar."));
  };

  // Exportar CSV
  const exportCSV = () => {
    if (items.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const header = [
      "Área",
      "Título",
      "Descripción",
      "Responsable",
      "Indicadores",
      "Fecha Inicio",
      "Fecha Fin",
      "Estado",
      "Observaciones",
    ];

    const rows = items.map((it) => [
      it.area,
      it.titulo,
      it.descripcion,
      it.responsable,
      it.indicadores,
      it.fechaInicio,
      it.fechaFin,
      it.estado,
      it.observaciones,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((r) => r.map((c) => `"${c || ""}"`).join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "implementacion_ISO9001.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Estadísticas rápidas
  const stats = {
    total: items.length,
    pendientes: items.filter((it) => it.estado === "Pendiente").length,
    enProgreso: items.filter((it) => it.estado === "En progreso").length,
    completados: items.filter((it) => it.estado === "Completado").length,
  };

  // Badge para estado
  const EstadoBadge = ({ estado }) => {
    let color = "#aaa";
    if (estado === "Pendiente") color = "var(--orange)";
    if (estado === "En progreso") color = "var(--gold)";
    if (estado === "Completado") color = "limegreen";

    return (
      <span
        style={{
          background: color,
          color: "#1A1919",
          padding: "4px 10px",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: "bold",
        }}
      >
        {estado}
      </span>
    );
  };

  return (
    <div className="registro-page">
      <h1>Implementación ISO 9001</h1>

      <p>
        En esta etapa se pone en práctica lo planificado. Registra acciones y
        controles por área (Contexto, Liderazgo, Planificación, Apoyo,
        Operación, Evaluación, Mejora). Todo se guarda localmente.
      </p>

      {/* Resumen */}
      <div className="empresa-form" style={{ marginBottom: "18px" }}>
        <h2>Resumen</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div className="chart-box" style={{ padding: 12 }}>
            <strong>Total</strong>
            <div style={{ fontSize: 22 }}>{stats.total}</div>
          </div>
          <div className="chart-box" style={{ padding: 12 }}>
            <strong>Pendientes</strong>
            <div style={{ fontSize: 22 }}>{stats.pendientes}</div>
          </div>
          <div className="chart-box" style={{ padding: 12 }}>
            <strong>En progreso</strong>
            <div style={{ fontSize: 22 }}>{stats.enProgreso}</div>
          </div>
          <div className="chart-box" style={{ padding: 12 }}>
            <strong>Completados</strong>
            <div style={{ fontSize: 22 }}>{stats.completados}</div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <form className="empresa-form" onSubmit={handleSubmit}>
        <h2>{editIndex !== null ? "Editar elemento" : "Registrar elemento"}</h2>
        <div className="form-grid">
          <select name="area" value={form.area} onChange={handleChange} required>
            <option value="">Selecciona área</option>
            <option value="Contexto de la organización">Contexto</option>
            <option value="Liderazgo">Liderazgo</option>
            <option value="Planificación">Planificación</option>
            <option value="Apoyo">Apoyo</option>
            <option value="Operación">Operación</option>
            <option value="Evaluación del desempeño">Evaluación</option>
            <option value="Mejora">Mejora</option>
          </select>

          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            placeholder="Título"
            required
          />
          <input
            name="responsable"
            value={form.responsable}
            onChange={handleChange}
            placeholder="Responsable"
            required
          />
          <input
            type="date"
            name="fechaInicio"
            value={form.fechaInicio}
            onChange={handleChange}
          />
          <input
            type="date"
            name="fechaFin"
            value={form.fechaFin}
            onChange={handleChange}
          />
          <input
            name="indicadores"
            value={form.indicadores}
            onChange={handleChange}
            placeholder="Indicadores"
          />
          <select name="estado" value={form.estado} onChange={handleChange}>
            <option>Pendiente</option>
            <option>En progreso</option>
            <option>Completado</option>
          </select>
          <input
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            placeholder="Observaciones"
          />
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción detallada"
            style={{ gridColumn: "1 / -1", minHeight: 100 }}
          />
        </div>
        <button className="btn primary" type="submit">
          {editIndex !== null ? "Actualizar" : "Registrar"}
        </button>
      </form>

      {/* Listado */}
      <div className="empresa-list" style={{ marginTop: 20 }}>
        <h2>
          Elementos de Implementación{" "}
          <button className="btn secondary small" onClick={exportCSV}>
            Exportar CSV
          </button>
        </h2>

        {items.length === 0 ? (
          <p>No hay elementos registrados aún.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Área</th>
                <th>Título</th>
                <th>Responsable</th>
                <th>Indicador</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={idx}>
                  <td>{it.area}</td>
                  <td>{it.titulo}</td>
                  <td>{it.responsable}</td>
                  <td>{it.indicadores}</td>
                  <td>
                    <EstadoBadge estado={it.estado} />
                  </td>
                  <td>
                    <button className="btn small" onClick={() => setDetailItem(it)}>
                      Ver
                    </button>
                    <button className="btn small secondary" onClick={() => handleEdit(idx)}>
                      Editar
                    </button>
                    <button className="btn small danger" onClick={() => handleDelete(idx)}>
                      Eliminar
                    </button>
                    <button
                      className="btn small ghost"
                      onClick={() => handleCopy(it.responsable)}
                    >
                      📋
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal detalle */}
      {detailItem && (
        <div className="modal-backdrop" onClick={() => setDetailItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{detailItem.titulo}</h2>
            <p><strong>Área:</strong> {detailItem.area}</p>
            <p><strong>Responsable:</strong> {detailItem.responsable}</p>
            <p><strong>Fechas:</strong> {detailItem.fechaInicio || "-"} → {detailItem.fechaFin || "-"}</p>
            <p><strong>Indicadores:</strong> {detailItem.indicadores || "-"}</p>
            <p><strong>Estado:</strong> <EstadoBadge estado={detailItem.estado} /></p>
            <div style={{ marginTop: 12 }}>
              <strong>Descripción:</strong>
              <div style={{ background: "rgba(255,255,255,0.05)", padding: 10, borderRadius: 6, marginTop: 6 }}>
                {detailItem.descripcion || "-"}
              </div>
            </div>
            {detailItem.observaciones && (
              <p><strong>Observaciones:</strong> {detailItem.observaciones}</p>
            )}
            <div className="modal-actions" style={{ marginTop: 16 }}>
              <button className="btn primary" onClick={() => handleCopy(detailItem.titulo)}>
                Copiar título
              </button>
              <button className="btn ghost" onClick={() => setDetailItem(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
