import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function ChecklistOrganizacionales() {
  const storageKey = "checklist_organizacionales";

  // === Controles base ISO 27001 – Organizacionales ===
  const controlesBase = [
    { codigo: "A.5.1", descripcion: "Política de seguridad de la información" },
    { codigo: "A.5.2", descripcion: "Roles y responsabilidades de seguridad" },
    { codigo: "A.5.3", descripcion: "Contacto con autoridades relevantes" },
    { codigo: "A.5.4", descripcion: "Contacto con grupos de interés" },
    { codigo: "A.5.5", descripcion: "Amenazas de inteligencia" },
    { codigo: "A.5.6", descripcion: "Seguridad de la cadena de suministro" },
    { codigo: "A.5.7", descripcion: "Política de control de acceso" },
    { codigo: "A.5.8", descripcion: "Gestión de identidades" },
    { codigo: "A.5.9", descripcion: "Inventario de activos" },
    { codigo: "A.5.10", descripcion: "Uso aceptable de los activos" },
    { codigo: "A.5.11", descripcion: "Seguridad en proyectos" },
    { codigo: "A.5.12", descripcion: "Clasificación de la información" },
    { codigo: "A.5.13", descripcion: "Etiquetado de la información" },
    { codigo: "A.5.14", descripcion: "Gestión de medios removibles" },
    { codigo: "A.5.15", descripcion: "Eliminación segura de información" },
    { codigo: "A.5.16", descripcion: "Gestión de copias de seguridad" },
    { codigo: "A.5.17", descripcion: "Seguridad en la transferencia de información" },
    { codigo: "A.5.18", descripcion: "Acuerdos de confidencialidad" },
    { codigo: "A.5.19", descripcion: "Gestión de incidentes de seguridad" },
    { codigo: "A.5.20", descripcion: "Responsabilidades durante los incidentes" },
    { codigo: "A.5.21", descripcion: "Lecciones aprendidas de incidentes" },
    { codigo: "A.5.22", descripcion: "Comunicación durante incidentes" },
    { codigo: "A.5.23", descripcion: "Gestión de continuidad del negocio" },
    { codigo: "A.5.24", descripcion: "Pruebas y revisiones de continuidad" },
    { codigo: "A.5.25", descripcion: "Evaluaciones post-incidente" },
    { codigo: "A.5.26", descripcion: "Cumplimiento de requisitos legales" },
    { codigo: "A.5.27", descripcion: "Revisión de cumplimiento" },
    { codigo: "A.5.28", descripcion: "Protección de registros" },
    { codigo: "A.5.29", descripcion: "Privacidad y protección de datos personales" },
    { codigo: "A.5.30", descripcion: "Control de acceso a sistemas críticos" },
    { codigo: "A.5.31", descripcion: "Continuidad operativa" },
    { codigo: "A.5.32", descripcion: "Evaluación de riesgos de negocio" },
    { codigo: "A.5.33", descripcion: "Integración de la seguridad en procesos" },
    { codigo: "A.5.34", descripcion: "Cumplimiento normativo de seguridad" },
    { codigo: "A.5.35", descripcion: "Revisión de políticas de seguridad" },
    { codigo: "A.5.36", descripcion: "Monitoreo de cumplimiento interno" },
    { codigo: "A.5.37", descripcion: "Auditoría de controles de seguridad" },
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

  // === Funciones ===
  const handleChange = (index, field, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

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
    if (!item.evidencia) return;
    const link = document.createElement("a");
    link.href = item.evidencia;
    link.download = item.evidenciaName;
    link.click();
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
    XLSX.utils.book_append_sheet(wb, ws, "Checklist_Organizacionales");
    XLSX.writeFile(wb, "Checklist_ISO27001_Organizacionales.xlsx");
  };

  // === Exportar PDF ===
  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.text("Checklist ISO 27001 – Organizacionales", 14, 20);
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
    doc.save("Checklist_ISO27001_Organizacionales.pdf");
  };

  return (
    <div className="checklist-page">
      <h1 style={{ color: "var(--gold)" }}>Checklist ISO 27001 – Organizacionales</h1>
      <p style={{ color: "#ddd" }}>
        Controles sobre políticas, roles, responsabilidades, continuidad y cumplimiento.
      </p>

      <div className="btn-row" style={{ marginBottom: "15px" }}>
        <button className="btn primary" onClick={exportToExcel}>Exportar a Excel</button>
        <button className="btn secondary" onClick={exportToPDF} style={{ marginLeft: 8 }}>
          Exportar a PDF
        </button>
      </div>

      <div className="table-container" style={{ overflowX: "auto" }}>
        <table className="checklist-table">
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
                      className="input-select"
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
                        <div style={{ marginTop: 6, color: "#aaa" }}>
                          {item.evidenciaName}
                        </div>
                      )}
                    </>
                  ) : item.evidencia ? (
                    <button className="btn small" onClick={() => downloadEvidence(item)}>
                      Descargar
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
                      className="input-text"
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
                      className="input-date"
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
                      className="input-text"
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
