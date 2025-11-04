import React from "react";
import ChecklistTemplate from "./ChecklistTemplate";

export default function ChecklistPersonas() {
  const controles = [
    { codigo: "A.6.1", descripcion: "Evaluación del personal antes del empleo" },
    { codigo: "A.6.2", descripcion: "Términos y condiciones de empleo" },
    { codigo: "A.6.3", descripcion: "Concienciación y capacitación en seguridad" },
    { codigo: "A.6.4", descripcion: "Procedimiento disciplinario por violaciones" },
    { codigo: "A.6.5", descripcion: "Responsabilidades post-empleo" },
    { codigo: "A.6.6", descripcion: "Acuerdos de confidencialidad / no divulgación" },
    { codigo: "A.6.7", descripcion: "Trabajo remoto seguro" },
    { codigo: "A.6.8", descripcion: "Reporte de incidentes por el personal" },
  ];

  return (
    <ChecklistTemplate
      titulo="Checklist - Dominio Personas"
      storageKey="iso27001_checklist_personas"
      controlesIniciales={controles}
    />
  );
}
