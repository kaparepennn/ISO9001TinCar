import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function ChecklistPersonas() {
  const storageKey = "checklist_personas";

  // === Controles base según ISO 27001 ===
  const controlesBase = [
    { codigo: "A.6.1", descripcion: "Evaluación del personal antes del empleo" },
    { codigo: "A.6.2", descripcion: "Términos y condiciones de empleo" },
    { codigo: "A.6.3", descripcion: "Concienciación y capacitación en seguridad" },
    { codigo: "A.6.4", descripcion: "Procedimiento disciplinario por violaciones" },
    { codigo: "A.6.5", descripcion: "Responsabilidades post-empleo" },
    { codigo: "A.6.6", descripcion: "Acuerdos de confidencialidad / no divulgación" },
    { codigo: "A.6.7", descripcion: "Trabajo remoto (Remote Working)" },
    { codigo: "A.6.8", descripcion: "Reporte de incidentes por el personal" },
  ];

  const [items, setItems] = useState([]);

  // === Cargar datos desde localStorage o inicializar ===
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);

        // Si faltan controles, los completa (preserva datos ya diligenciados)
        if (!Array.isArray(parsed) || parsed.length < controlesBase.length) {
          const nuevos = controlesBase.map((base) => {
            const existente = Array.isArray(parsed) ? parsed.find((p) => p.codigo === base.codigo) : null;
            return (
              existente || {
                ...base,
                estado: "",
                evidencia: null,        // base64 string
                evidenciaName: "",
                responsable: "",
                fecha: "",
                observaciones: "",
                editMode: true,
              }
            );
          });
          setItems(nuevos);
          localStorage.setItem(storageKey, JSON.stringify(nuevos));
        } else {
          // Asegura shape correcto si vienen elementos sin campos
          const normalized = parsed.map((p) => ({
            codigo: p.codigo,
            descripcion: p.descripcion,
            estado: p.estado || "",
            evidencia: p.evidencia || null,
            evidenciaName: p.evidenciaName || "",
            responsable: p.responsable || "",
            fecha: p.fecha || "",
            observaciones: p.observaciones || "",
            editMode: typeof p.editMode === "boolean" ? p.editMode : true,
          }));
          setItems(normalized);
        }
      } else {
        // inicial
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
    } catch (err) {
      console.error("Error cargando checklist_personas:", err);
      // en caso de error, inicializar
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // === Guardar cambios en localStorage ===
  useEffect(() => {
    // guardamos sólo cuando items tiene contenido
    if (items && items.length) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(items));
      } catch (err) {
        console.error("Error guardando checklist_personas:", err);
      }
    }
  }, [items]);

  // === Manejar cambios simples ===
  const handleChange = (index, field, value) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // === Manejo de archivo: convierte a base64 antes de guardar ===
  const handleFileChange = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      setItems((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          evidencia: base64,
          evidenciaName: file.name,
        };
        return copy;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (index) => {
    if (!window.confirm("¿Deseas eliminar este control del checklist?")) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditToggle = (index) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], editMode: !copy[index].editMode };
      return copy;
    });
  };

  // === Exportar a Excel ===
  const exportToExcel = () => {
    const dataToExport = items.map((item) => ({
      Código: item.codigo,
      Descripción: item.descripcion,
      Estado: item.estado,
      Evidencia: item.evidenciaName || "",
      Responsable: item.responsable,
      Fecha: item.fecha,
      Observaciones: item.observaciones,
    }));
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Checklist_Personas");
    XLSX.writeFile(wb, "Checklist_ISO27001_Personas.xlsx");
  };

  // === Exportar a PDF ===
  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(12);
    doc.text("Checklist ISO 27001 - Personas", 14, 20);
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
      head: [
        ["Código", "Descripción", "Estado", "Evidencia", "Responsable", "Fecha", "Observaciones"],
      ],
      body: tableData,
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [255, 179, 0] },
    });
    doc.save("Checklist_ISO27001_Personas.pdf");
  };

  // === Descargar evidencia (cuando exista base64) ===
  const downloadEvidence = (item) => {
    if (!item || !item.evidencia) return;
    const link = document.createElement("a");
    link.href = item.evidencia;
    link.download = item.evidenciaName || "evidencia";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="checklist-page">
      <h1 style={{ color: "var(--gold)" }}>Checklist ISO 27001 – Personas</h1>
      <p style={{ color: "#ddd" }}>
        Evalúa los controles relacionados con el personal y sus responsabilidades.
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
              <th style={{ textAlign: "left", padding: 8 }}>Código</th>
              <th style={{ textAlign: "left", padding: 8 }}>Descripción</th>
              <th style={{ textAlign: "left", padding: 8 }}>Estado</th>
              <th style={{ textAlign: "left", padding: 8 }}>Evidencia</th>
              <th style={{ textAlign: "left", padding: 8 }}>Responsable</th>
              <th style={{ textAlign: "left", padding: 8 }}>Fecha revisión</th>
              <th style={{ textAlign: "left", padding: 8 }}>Observaciones</th>
              <th style={{ textAlign: "left", padding: 8 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.codigo} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <td style={{ padding: 8 }}>{item.codigo}</td>
                <td style={{ padding: 8 }}>{item.descripcion}</td>

                {/* Estado */}
                <td style={{ padding: 8, minWidth: 140 }}>
                  {item.editMode ? (
                    <select
                      value={item.estado}
                      onChange={(e) => handleChange(index, "estado", e.target.value)}
                      style={{
                        padding: "6px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.03)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.08)",
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
                <td style={{ padding: 8, minWidth: 160 }}>
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
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ color: "var(--gold)" }}>{item.evidenciaName}</span>
                      <button
                        className="btn small"
                        onClick={() => downloadEvidence(item)}
                        style={{ marginLeft: 6 }}
                      >
                        Descargar
                      </button>
                    </div>
                  ) : (
                    "-"
                  )}
                </td>

                {/* Responsable */}
                <td style={{ padding: 8, minWidth: 160 }}>
                  {item.editMode ? (
                    <input
                      type="text"
                      value={item.responsable}
                      onChange={(e) => handleChange(index, "responsable", e.target.value)}
                      placeholder="Nombre responsable"
                      style={{
                        padding: "6px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.03)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.08)",
                        width: "100%",
                      }}
                    />
                  ) : (
                    item.responsable || "-"
                  )}
                </td>

                {/* Fecha */}
                <td style={{ padding: 8 }}>
                  {item.editMode ? (
                    <input
                      type="date"
                      value={item.fecha}
                      onChange={(e) => handleChange(index, "fecha", e.target.value)}
                      style={{
                        padding: "6px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.03)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                  ) : (
                    item.fecha || "-"
                  )}
                </td>

                {/* Observaciones */}
                <td style={{ padding: 8, minWidth: 200 }}>
                  {item.editMode ? (
                    <input
                      type="text"
                      value={item.observaciones}
                      onChange={(e) => handleChange(index, "observaciones", e.target.value)}
                      placeholder="Observaciones"
                      style={{
                        padding: "6px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.03)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.08)",
                        width: "100%",
                      }}
                    />
                  ) : (
                    item.observaciones || "-"
                  )}
                </td>

                {/* Acciones */}
                <td style={{ padding: 8 }}>
                  <button
                    className="btn small"
                    onClick={() => handleEditToggle(index)}
                    style={{ marginRight: 6 }}
                  >
                    {item.editMode ? "Guardar" : "Editar"}
                  </button>
                  <button className="btn small danger" onClick={() => handleDelete(index)}>
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
