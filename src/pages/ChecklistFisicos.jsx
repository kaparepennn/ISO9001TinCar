import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function ChecklistFisicos() {
  const storageKey = "checklist_fisicos";

  // === Controles base según ISO 27001 ===
  const controlesBase = [
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

  const [items, setItems] = useState([]);

  // === Cargar desde localStorage o inicializar ===
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setItems(parsed);
    } else {
      const inicial = controlesBase.map((c) => ({
        ...c,
        estado: "",
        evidencia: null,
        evidenciaName: "",
        responsable: "",
        fecha: "",
        observaciones: "",
        editMode: true,
      }));
      setItems(inicial);
      localStorage.setItem(storageKey, JSON.stringify(inicial));
    }
  }, []);

  // === Guardar automáticamente ===
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items]);

  // === Manejar cambios ===
  const handleChange = (index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  // === Manejar archivo de evidencia ===
  const handleFileChange = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      setItems((prev) => {
        const updated = [...prev];
        updated[index].evidencia = base64;
        updated[index].evidenciaName = file.name;
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleEditToggle = (index) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index].editMode = !updated[index].editMode;
      return updated;
    });
  };

  const handleDelete = (index) => {
    if (!window.confirm("¿Deseas eliminar este control del checklist?")) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // === Descargar evidencia ===
  const downloadEvidence = (item) => {
    if (!item || !item.evidencia) return;
    const link = document.createElement("a");
    link.href = item.evidencia;
    link.download = item.evidenciaName || "evidencia";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // === Exportar a Excel ===
  const exportToExcel = () => {
    const data = items.map((i) => ({
      Código: i.codigo,
      Descripción: i.descripcion,
      Estado: i.estado,
      Evidencia: i.evidenciaName || "",
      Responsable: i.responsable,
      Fecha: i.fecha,
      Observaciones: i.observaciones,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Checklist_Fisicos");
    XLSX.writeFile(wb, "Checklist_ISO27001_Fisicos.xlsx");
  };

  // === Exportar a PDF ===
  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(12);
    doc.text("Checklist ISO 27001 – Físicos", 14, 20);
    const tableData = items.map((i) => [
      i.codigo,
      i.descripcion,
      i.estado,
      i.evidenciaName || "",
      i.responsable,
      i.fecha,
      i.observaciones,
    ]);
    doc.autoTable({
      head: [["Código", "Descripción", "Estado", "Evidencia", "Responsable", "Fecha", "Observaciones"]],
      body: tableData,
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [255, 179, 0] },
    });
    doc.save("Checklist_ISO27001_Fisicos.pdf");
  };

  return (
    <div className="checklist-page">
      <h1 style={{ color: "var(--gold)" }}>Checklist ISO 27001 – Físicos</h1>
      <p style={{ color: "#ddd" }}>
        Evalúa los controles relacionados con la seguridad física y ambiental de las instalaciones.
      </p>

      <div className="btn-row" style={{ marginBottom: "15px" }}>
        <button className="btn primary" onClick={exportToExcel}>Exportar a Excel</button>
        <button className="btn secondary" onClick={exportToPDF} style={{ marginLeft: 8 }}>
          Exportar a PDF
        </button>
      </div>

      <div className="table-container" style={{ overflowX: "auto" }}>
        <table className="checklist-table" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Evidencia</th>
              <th>Responsable</th>
              <th>Fecha revisión</th>
              <th>Observaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.codigo}>
                <td>{item.codigo}</td>
                <td>{item.descripcion}</td>

                {/* Estado */}
                <td>
                  {item.editMode ? (
                    <select
                      value={item.estado}
                      onChange={(e) => handleChange(index, "estado", e.target.value)}
                      style={{
                        padding: "6px",
                        borderRadius: "6px",
                        background: "rgba(255,255,255,0.05)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <option value="">Seleccionar</option>
                      <option value="Cumple">Cumple</option>
                      <option value="Parcial">Parcial</option>
                      <option value="No cumple">No cumple</option>
                      <option value="En proceso">En proceso</option>
                    </select>
                  ) : (
                    item.estado || "-"
                  )}
                </td>

                {/* Evidencia */}
                <td>
                  {item.editMode ? (
                    <>
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                        style={{ color: "#ddd" }}
                      />
                      {item.evidenciaName && (
                        <div style={{ marginTop: 6, color: "rgba(255,255,255,0.8)" }}>
                          {item.evidenciaName}
                        </div>
                      )}
                    </>
                  ) : item.evidencia ? (
                    <button
                      className="btn small"
                      onClick={() => downloadEvidence(item)}
                    >
                      Descargar evidencia
                    </button>
                  ) : (
                    "-"
                  )}
                </td>

                {/* Responsable */}
                <td>
                  {item.editMode ? (
                    <input
                      type="text"
                      value={item.responsable}
                      onChange={(e) => handleChange(index, "responsable", e.target.value)}
                      placeholder="Responsable"
                      style={{
                        padding: "6px",
                        borderRadius: "6px",
                        width: "100%",
                        background: "rgba(255,255,255,0.05)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  ) : (
                    item.responsable || "-"
                  )}
                </td>

                {/* Fecha */}
                <td>
                  {item.editMode ? (
                    <input
                      type="date"
                      value={item.fecha}
                      onChange={(e) => handleChange(index, "fecha", e.target.value)}
                      style={{
                        padding: "6px",
                        borderRadius: "6px",
                        background: "rgba(255,255,255,0.05)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  ) : (
                    item.fecha || "-"
                  )}
                </td>

                {/* Observaciones */}
                <td>
                  {item.editMode ? (
                    <input
                      type="text"
                      value={item.observaciones}
                      onChange={(e) => handleChange(index, "observaciones", e.target.value)}
                      placeholder="Observaciones"
                      style={{
                        padding: "6px",
                        borderRadius: "6px",
                        width: "100%",
                        background: "rgba(255,255,255,0.05)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  ) : (
                    item.observaciones || "-"
                  )}
                </td>

                {/* Acciones */}
                <td>
                  <button
                    className="btn small"
                    onClick={() => handleEditToggle(index)}
                    style={{ marginRight: 6 }}
                  >
                    {item.editMode ? "Guardar" : "Editar"}
                  </button>
                  <button
                    className="btn small danger"
                    onClick={() => handleDelete(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
