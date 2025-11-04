import React from "react";
import ChecklistTemplate from "./ChecklistTemplate";

export default function ChecklistFisicos() {
  const controles = [
    { codigo: "A.7.1", descripcion: "Perímetro de seguridad física" },
    { codigo: "A.7.2", descripcion: "Control de acceso físico a áreas sensibles" },
    { codigo: "A.7.3", descripcion: "Seguridad de oficinas, salas y áreas de trabajo" },
    { codigo: "A.7.4", descripcion: "Monitoreo de accesos no autorizados" },
    { codigo: "A.7.5", descripcion: "Protección contra incendios e inundaciones" },
    { codigo: "A.7.7", descripcion: "Limpieza de escritorio y pantalla" },
    { codigo: "A.7.8", descripcion: "Protección de equipos en ubicaciones físicas" },
    { codigo: "A.7.9", descripcion: "Seguridad de activos fuera del sitio" },
    { codigo: "A.7.10", descripcion: "Gestión de medios de almacenamiento" },
    { codigo: "A.7.11", descripcion: "Servicios públicos de soporte (energía, agua, etc.)" },
    { codigo: "A.7.12", descripcion: "Seguridad del cableado" },
    { codigo: "A.7.13", descripcion: "Mantenimiento físico del equipo" },
    { codigo: "A.7.14", descripcion: "Eliminación o reutilización segura de equipos" },
  ];

  return (
    <ChecklistTemplate
      titulo="Checklist - Dominio Físicos"
      storageKey="iso27001_checklist_fisico"
      controlesIniciales={controles}
    />
  );
}
