import React, { useState } from "react";

export default function ISO27001Checklist() {
  const [selectedDomain, setSelectedDomain] = useState("Organizacional");

  const controls = {
    Organizacional: [
      { code: "A.5.1", description: "Política de seguridad de la información" },
      { code: "A.5.2", description: "Roles y responsabilidades de seguridad" },
      { code: "A.5.3", description: "Contacto con autoridades" },
      { code: "A.5.4", description: "Contacto con grupos de interés" },
      { code: "A.5.9", description: "Inventario de activos" },
      { code: "A.5.10", description: "Uso aceptable de activos" },
      { code: "A.5.11", description: "Seguridad en proyectos" },
      { code: "A.5.24", description: "Gestión de incidentes" },
      { code: "A.5.29", description: "Continuidad del negocio" },
      { code: "A.5.34", description: "Cumplimiento normativo" },
    ],
    Personas: [
      { code: "A.6.1", description: "Evaluación del personal antes del empleo" },
      { code: "A.6.2", description: "Términos y condiciones de empleo" },
      { code: "A.6.3", description: "Concienciación y capacitación en seguridad" },
      { code: "A.6.4", description: "Procedimiento disciplinario" },
      { code: "A.6.5", description: "Responsabilidades post-empleo" },
      { code: "A.6.6", description: "Acuerdos de confidencialidad" },
      { code: "A.6.7", description: "Trabajo remoto" },
      { code: "A.6.8", description: "Reporte de incidentes por el personal" },
    ],
    Físico: [
      { code: "A.7.1", description: "Perímetro de seguridad física" },
      { code: "A.7.2", description: "Entrada física a áreas sensibles" },
      { code: "A.7.3", description: "Seguridad de oficinas e instalaciones" },
      { code: "A.7.4", description: "Monitoreo de accesos no autorizados" },
      { code: "A.7.5", description: "Protección contra incendios e inundaciones" },
      { code: "A.7.6", description: "Trabajo en áreas seguras" },
      { code: "A.7.7", description: "Limpieza de escritorio/pantalla" },
      { code: "A.7.8", description: "Protección de equipos físicos" },
      { code: "A.7.9", description: "Seguridad de activos fuera del sitio" },
      { code: "A.7.10", description: "Medios de almacenamiento" },
      { code: "A.7.11", description: "Servicios públicos de soporte" },
      { code: "A.7.12", description: "Seguridad del cableado" },
      { code: "A.7.13", description: "Mantenimiento físico del equipo" },
      { code: "A.7.14", description: "Eliminación o reutilización segura de equipos" },
    ],
    Tecnológico: [
      { code: "A.8.1", description: "Controles criptográficos" },
      { code: "A.8.2", description: "Gestión de configuración" },
      { code: "A.8.3", description: "Seguridad en desarrollo" },
      { code: "A.8.7", description: "Registro y monitoreo" },
      { code: "A.8.11", description: "Seguridad en redes y sistemas" },
      { code: "A.8.21", description: "Gestión de vulnerabilidades" },
      { code: "A.8.26", description: "Control de acceso" },
      { code: "A.8.31", description: "Protección de datos y filtrado web" },
    ],
  };

  const [checklistData, setChecklistData] = useState({});

  const handleChange = (code, field, value) => {
    setChecklistData((prev) => ({
      ...prev,
      [code]: { ...prev[code], [field]: value },
    }));
  };

  return (
    <div className="page-wrap">
      <header className="topbar">
        <div className="brand">
          <span className="brand-title">ISO 27001 - Checklist</span>
        </div>
      </header>

      <main className="content">
        <h1>Checklist ISO 27001 (Anexo A)</h1>
        <p>Selecciona un dominio para visualizar y registrar los controles correspondientes.</p>

        <div className="filter-bar">
          <label>Dominio: </label>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="select-domain"
          >
            {Object.keys(controls).map((domain) => (
              <option key={domain}>{domain}</option>
            ))}
          </select>
        </div>

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
            </tr>
          </thead>
          <tbody>
            {controls[selectedDomain].map((ctrl) => (
              <tr key={ctrl.code}>
                <td>{ctrl.code}</td>
                <td>{ctrl.description}</td>
                <td>
                  <select
                    value={checklistData[ctrl.code]?.estado || ""}
                    onChange={(e) => handleChange(ctrl.code, "estado", e.target.value)}
                  >
                    <option value="">Seleccione</option>
                    <option value="Cumple">✅ Cumple</option>
                    <option value="Parcial">⚠️ Parcial</option>
                    <option value="No cumple">❌ No cumple</option>
                    <option value="En proceso">⏳ En proceso</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Ruta o evidencia"
                    value={checklistData[ctrl.code]?.evidencia || ""}
                    onChange={(e) => handleChange(ctrl.code, "evidencia", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Responsable"
                    value={checklistData[ctrl.code]?.responsable || ""}
                    onChange={(e) => handleChange(ctrl.code, "responsable", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={checklistData[ctrl.code]?.fecha || ""}
                    onChange={(e) => handleChange(ctrl.code, "fecha", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Observaciones"
                    value={checklistData[ctrl.code]?.observaciones || ""}
                    onChange={(e) => handleChange(ctrl.code, "observaciones", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
