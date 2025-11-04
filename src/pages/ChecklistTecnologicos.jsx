import React from "react";
import ChecklistTemplate from "./ChecklistTemplate";

export default function ChecklistTecnologicos() {
  const controles = [
    { codigo: "A.8.1", descripcion: "Controles criptográficos" },
    { codigo: "A.8.2", descripcion: "Gestión de configuración de sistemas" },
    { codigo: "A.8.3", descripcion: "Seguridad en el desarrollo de software" },
    { codigo: "A.8.7", descripcion: "Registro y monitoreo de eventos" },
    { codigo: "A.8.11", descripcion: "Seguridad en redes y comunicaciones" },
    { codigo: "A.8.21", descripcion: "Gestión de vulnerabilidades" },
    { codigo: "A.8.26", descripcion: "Control de acceso a sistemas" },
    { codigo: "A.8.31", descripcion: "Protección de datos y filtrado web" },
  ];

  return (
    <ChecklistTemplate
      titulo="Checklist - Dominio Tecnológicos"
      storageKey="iso27001_checklist_tecnologico"
      controlesIniciales={controles}
    />
  );
}
