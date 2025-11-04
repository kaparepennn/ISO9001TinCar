import React from "react";
import ChecklistTemplate from "./ChecklistTemplate";

export default function ChecklistOrganizacionales() {
  const controles = [
    { codigo: "A.5.1", descripcion: "Política de seguridad de la información" },
    { codigo: "A.5.2", descripcion: "Roles y responsabilidades de seguridad" },
    { codigo: "A.5.3", descripcion: "Contacto con autoridades y grupos de interés" },
    { codigo: "A.5.9", descripcion: "Inventario y uso aceptable de activos" },
    { codigo: "A.5.11", descripcion: "Seguridad en proyectos" },
    { codigo: "A.5.24", descripcion: "Gestión de incidentes de seguridad" },
    { codigo: "A.5.29", descripcion: "Continuidad del negocio" },
    { codigo: "A.5.34", descripcion: "Cumplimiento normativo y revisión legal" },
  ];

  return (
    <ChecklistTemplate
      titulo="Checklist - Dominio Organizacionales"
      storageKey="iso27001_checklist_organizacional"
      controlesIniciales={controles}
    />
  );
}
