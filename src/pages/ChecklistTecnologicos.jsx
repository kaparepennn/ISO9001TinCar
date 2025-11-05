import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function ChecklistTecnologicos() {
  const storageKey = "checklist_tecnologicos";

  // === Controles base ISO 27001 – Tecnológicos ===
  const controlesBase = [
    { codigo: "A.8.1", descripcion: "Controles criptográficos" },
    { codigo: "A.8.2", descripcion: "Gestión de configuración" },
    { codigo: "A.8.3", descripcion: "Seguridad en desarrollo de software" },
    { codigo: "A.8.4", descripcion: "Seguridad en los entornos de prueba" },
    { codigo: "A.8.5", descripcion: "Protección de la información en desarrollo" },
    { codigo: "A.8.6", descripcion: "Validación de código y pruebas" },
    { codigo: "A.8.7", descripcion: "Registro de eventos de seguridad" },
    { codigo: "A.8.8", descripcion: "Monitoreo del sistema" },
    { codigo: "A.8.9", descripcion: "Protección de registros" },
    { codigo: "A.8.10", descripcion: "Auditoría de actividades del sistema" },
    { codigo: "A.8.11", descripcion: "Seguridad en redes" },
    { codigo: "A.8.12", descripcion: "Seguridad de los servicios en red" },
    { codigo: "A.8.13", descripcion: "Seguridad de los sistemas de comunicación" },
    { codigo: "A.8.14", descripcion: "Separación de redes y control de tráfico" },
    { codigo: "A.8.15", descripcion: "Control de acceso a sistemas y aplicaciones" },
    { codigo: "A.8.16", descripcion: "Autenticación de usuarios" },
    { codigo: "A.8.17", descripcion: "Gestión de contraseñas y credenciales" },
    { codigo: "A.8.18", descripcion: "Control de acceso remoto" },
    { codigo: "A.8.19", descripcion: "Protección frente a malware" },
    { codigo: "A.8.20", descripcion: "Seguridad en la transferencia de información" },
    { codigo: "A.8.21", descripcion: "Gestión de vulnerabilidades" },
    { codigo: "A.8.22", descripcion: "Evaluaciones de seguridad técnicas" },
    { codigo: "A.8.23", descripcion: "Gestión de parches de seguridad" },
    { codigo: "A.8.24", descripcion: "Respuesta ante vulnerabilidades detectadas" },
    { codigo: "A.8.25", descripcion: "Monitoreo continuo de vulnerabilidades" },
    { codigo: "A.8.26", descripcion: "Control de acceso basado en roles" },
    { codigo: "A.8.27", descripcion: "Gestión de identidades y privilegios" },
    { codigo: "A.8.28", descripcion: "Revisión periódica de accesos" },
    { codigo: "A.8.29", descripcion: "Desactivación de cuentas inactivas" },
    { codigo: "A.8.30", descripcion: "Protección de sesiones activas" },
    { codigo: "A.8.31", descripcion: "Protección de datos personales" },
    { codigo: "A.8.32", descripcion: "Prevención de fugas de información" },
    { codigo: "A.8.33", descripcion: "Filtrado web y correo electrónico" },
    { codigo: "A.8.34", descripcion: "Control de acceso a recursos en la nube" },
  ];

  const [items, setItems] = useState([]);

  // === Cargar o inicializar ===
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setItems(JSON.parse(saved));
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

  // === Guardado automático ===
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

  // === Evidencias ===
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
    if (window.confirm("¿Eliminar este control del checklist?")) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const downloadEvidence = (item) => {
    if (!item || !item.evidencia) return;
    const link = document.createElement("a");
    link.href = item.evidencia;
    link.download = item.evidenciaName || "evidencia";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // === Exportar Excel ===
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
    XLSX.utils.book_append_sheet(wb, ws, "Checklist_Tecnologicos");
    XLSX.writeFile(wb, "Checklist_ISO27001_Tecnologicos.xlsx");
  };

  // === Exportar PDF ===
  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(12);
    doc.text("Checklist ISO 27001 – Tecnológicos", 14, 20);
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
    doc.save("Checklist_ISO27001_Tecnologicos.pdf");
  };

  return (
    <div className="checklist-page">
      <h1 style={{ color: "var(--gold)" }}>Checklist ISO 27001 – Tecnológicos</h1>
      <p style={{ color: "#ddd" }}>
        Controles sobre seguridad en redes, sistemas, desarrollo y protección de datos.
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
