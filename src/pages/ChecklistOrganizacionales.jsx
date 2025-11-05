import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ChecklistOrganizacionales() {
  const storageKey = "checklist_organizacionales";

  // === Estado inicial ===
  const controlesBase = [
    { codigo: "A.5.1", descripcion: "Política de seguridad de la información" },
    { codigo: "A.5.2", descripcion: "Roles y responsabilidades de seguridad" },
    { codigo: "A.5.3", descripcion: "Contacto con autoridades" },
    { codigo: "A.5.4", descripcion: "Contacto con grupos de interés" },
    { codigo: "A.5.5", descripcion: "Inteligencia de amenazas" },
    { codigo: "A.5.6", descripcion: "Planificación de cambios en seguridad" },
    { codigo: "A.5.7", descripcion: "Gestión de activos de información" },
    { codigo: "A.5.8", descripcion: "Clasificación de la información" },
    { codigo: "A.5.9", descripcion: "Inventario y uso aceptable de activos" },
    { codigo: "A.5.10", descripcion: "Uso aceptable de los activos" },
    { codigo: "A.5.11", descripcion: "Seguridad en proyectos" },
    { codigo: "A.5.12", descripcion: "Evaluación de riesgos de seguridad" },
    { codigo: "A.5.13", descripcion: "Controles de proveedores" },
    { codigo: "A.5.14", descripcion: "Política de acceso" },
    { codigo: "A.5.15", descripcion: "Gestión de credenciales" },
    { codigo: "A.5.16", descripcion: "Revisión de derechos de acceso" },
    { codigo: "A.5.17", descripcion: "Segregación de funciones" },
    { codigo: "A.5.18", descripcion: "Seguridad en dispositivos de usuario final" },
    { codigo: "A.5.19", descripcion: "Política de uso de dispositivos móviles" },
    { codigo: "A.5.20", descripcion: "Gestión de registros" },
    { codigo: "A.5.21", descripcion: "Supervisión y revisión de seguridad" },
    { codigo: "A.5.22", descripcion: "Revisión independiente de seguridad" },
    { codigo: "A.5.23", descripcion: "Gestión de cambios en TI" },
    { codigo: "A.5.24", descripcion: "Gestión de incidentes de seguridad" },
    { codigo: "A.5.25", descripcion: "Evaluación postincidente" },
    { codigo: "A.5.26", descripcion: "Gestión de continuidad del negocio" },
    { codigo: "A.5.27", descripcion: "Planes de continuidad documentados" },
    { codigo: "A.5.28", descripcion: "Pruebas de continuidad" },
    { codigo: "A.5.29", descripcion: "Disponibilidad de información" },
    { codigo: "A.5.30", descripcion: "Gestión de copias de seguridad" },
    { codigo: "A.5.31", descripcion: "Protección contra malware" },
    { codigo: "A.5.32", descripcion: "Gestión de vulnerabilidades" },
    { codigo: "A.5.33", descripcion: "Seguridad del software" },
    { codigo: "A.5.34", descripcion: "Cumplimiento con leyes y regulaciones" },
    { codigo: "A.5.35", descripcion: "Cumplimiento de políticas internas" },
    { codigo: "A.5.36", descripcion: "Auditoría de seguridad" },
    { codigo: "A.5.37", descripcion: "Gestión de mejora continua" },
  ];

  const [items, setItems] = useState([]);

  // === Cargar del LocalStorage ===
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(
        controlesBase.map((c) => ({
          ...c,
          estado: "",
          evidencia: null,
          evidenciaName: "",
          responsable: "",
          fecha: "",
          observaciones: "",
          editMode: true,
        }))
      );
    }
  }, []);

  // === Guardar en LocalStorage ===
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  // === Handlers ===
  const handleChange = (i, field, value) => {
    const updated = [...items];
    updated[i][field] = value;
    setItems(updated);
  };

  const handleFile = (i, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const updated = [...items];
      updated[i].evidencia = e.target.result;
      updated[i].evidenciaName = file.name;
      setItems(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (i) => {
    const updated = [...items];
    updated[i].editMode = false;
    setItems(updated);
  };

  const handleEdit = (i) => {
    const updated = [...items];
    updated[i].editMode = true;
    setItems(updated);
  };

  const handleDelete = (i) => {
    const updated = [...items];
    updated.splice(i, 1);
    setItems(updated);
  };

  // === Exportar a Excel ===
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(items.map(({ evidencia, ...rest }) => rest));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Checklist ISO27001");
    XLSX.writeFile(wb, "Checklist_Organizacionales.xlsx");
  };

  // === Exportar a PDF ===
  const exportToPDF = () => {
    const doc = new jsPDF("l", "pt", "a4");
    doc.text("Checklist ISO 27001 - Dominio Organizacional", 40, 40);
    const table = items.map((i) => [
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
      body: table,
      startY: 60,
    });
    doc.save("Checklist_Organizacionales.pdf");
  };

  // === Render ===
  return (
    <div className="checklist-page">
      <h1 style={{ color: "var(--gold)" }}>Checklist ISO 27001 - Dominio Organizacional</h1>
      <p style={{ color: "#ddd" }}>
        Este checklist cubre los 37 controles del dominio organizacional del Anexo A de la norma ISO 27001:2022.
      </p>

      <div className="actions" style={{ marginBottom: 20 }}>
        <button className="btn primary" onClick={exportToExcel}>📊 Exportar a Excel</button>
        <button className="btn secondary" onClick={exportToPDF}>📄 Exportar a PDF</button>
      </div>

      <div className="checklist-table">
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((ctrl, i) => (
              <tr key={i}>
                <td>{ctrl.codigo}</td>
                <td>{ctrl.descripcion}</td>

                {/* Estado */}
                <td>
                  {ctrl.editMode ? (
                    <select
                      value={ctrl.estado}
                      onChange={(e) => handleChange(i, "estado", e.target.value)}
                    >
                      <option value="">Seleccionar</option>
                      <option value="Cumple">✅ Cumple</option>
                      <option value="Parcial">⚠️ Parcial</option>
                      <option value="No cumple">❌ No cumple</option>
                      <option value="En proceso">⏳ En proceso</option>
                    </select>
                  ) : (
                    ctrl.estado || "—"
                  )}
                </td>

                {/* Evidencia */}
                <td>
                  {ctrl.editMode ? (
                    <>
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                        onChange={(e) => handleFile(i, e.target.files[0])}
                      />
                      {ctrl.evidenciaName && (
                        <small style={{ color: "#aaa" }}>{ctrl.evidenciaName}</small>
                      )}
                    </>
                  ) : ctrl.evidencia ? (
                    <a
                      href={ctrl.evidencia}
                      download={ctrl.evidenciaName}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--gold)" }}
                    >
                      {ctrl.evidenciaName || "Ver archivo"}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                {/* Responsable */}
                <td>
                  {ctrl.editMode ? (
                    <input
                      value={ctrl.responsable}
                      onChange={(e) => handleChange(i, "responsable", e.target.value)}
                    />
                  ) : (
                    ctrl.responsable || "—"
                  )}
                </td>

                {/* Fecha */}
                <td>
                  {ctrl.editMode ? (
                    <input
                      type="date"
                      value={ctrl.fecha}
                      onChange={(e) => handleChange(i, "fecha", e.target.value)}
                    />
                  ) : (
                    ctrl.fecha || "—"
                  )}
                </td>

                {/* Observaciones */}
                <td>
                  {ctrl.editMode ? (
                    <input
                      value={ctrl.observaciones}
                      onChange={(e) => handleChange(i, "observaciones", e.target.value)}
                    />
                  ) : (
                    ctrl.observaciones || "—"
                  )}
                </td>

                {/* Acciones */}
                <td>
                  {ctrl.editMode ? (
                    <button className="btn small secondary" onClick={() => handleSave(i)}>
                      Guardar
                    </button>
                  ) : (
                    <>
                      <button className="btn small" onClick={() => handleEdit(i)}>
                        Editar
                      </button>
                      <button
                        className="btn small danger"
                        onClick={() => handleDelete(i)}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
