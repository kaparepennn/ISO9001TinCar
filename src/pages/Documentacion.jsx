import React, { useState } from "react";

// Importa tus PDFs locales
import Administracion from "../assets/docs/AdministracionyControlDeCalidadJamesREvansyWilliamMLindsayNovenaEdición.pdf";
import gestion from "../assets/docs/GestióndelConocimiento.pdf";
import Normas from "../assets/docs/NornmaBasicaDeErgonomia.pdf";

// Lista fija de documentos (locales + externos como Google Drive)
const initialDocs = [
  {
    id: "doc1",
    name: "Administraciín y control de Calidad",
    sourceType: "local",
    url: Administracion,
  },
  {
    id: "doc2",
    name: "Gestion del conocimiento",
    sourceType: "local",
    url: gestion,
  },
  
  {
    id: "doc3",
    name: "Normas básicas de ergonomía",
    sourceType: "local",
    url: Normas,
  }, 
  {
    id: "doc4",
    name: "Instructivo ISO (Drive)",
    sourceType: "url",
    // ejemplo de drive público
    url: "https://drive.google.com/drive/folders/1oZ4-NeVQSxsYVd3Mko-0r9OOE2Yip1vL",
  },
  {
    id: "doc5",
    name: "Instructivo ISO (Drive)",
    sourceType: "url",
    // ejemplo de drive público
    url: "https://drive.google.com/drive/folders/1d2AXA8215YzyH4iQBLb0qJ6HUuMe447v",
  },
];

export default function Documentacion() {
  const [docs] = useState(initialDocs);
  const [selected, setSelected] = useState(initialDocs[0]);

  function downloadDoc(doc) {
    const a = document.createElement("a");
    a.href = doc.url;
    a.download = doc.name + ".pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <div className="doc-page">
      {/* Panel izquierdo - lista */}
      <div className="doc-left">
        <div className="doc-controls">
          <h2>Documentación ISO 9001</h2>

          <div className="doc-list">
            <h3>Documentos disponibles</h3>
            <ul>
              {docs.map((d) => (
                <li
                  key={d.id}
                  className={selected && selected.id === d.id ? "active" : ""}
                >
                  <button className="doc-item" onClick={() => setSelected(d)}>
                    <div className="doc-name">{d.name}</div>
                    <div className="doc-meta">
                      {d.sourceType === "local" ? "Local" : "Drive"}
                    </div>
                  </button>
                  <div className="doc-actions">
                    <button
                      className="btn ghost small"
                      onClick={() => downloadDoc(d)}
                    >
                      Descargar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Panel derecho - visor */}
      <div className="doc-right">
        <div className="viewer-area">
          {!selected && (
            <div className="muted">
              Selecciona un documento para previsualizarlo aquí.
            </div>
          )}

          {selected && (
            <>
              <div className="viewer-header">
                <h3>{selected.name}</h3>
                <div className="viewer-actions">
                  <button
                    className="btn primary"
                    onClick={() => downloadDoc(selected)}
                  >
                    Descargar
                  </button>
                  <button
                    className="btn ghost"
                    onClick={() => window.open(selected.url, "_blank")}
                  >
                    Abrir en pestaña
                  </button>
                </div>
              </div>

              <div className="viewer-frame">
                <iframe src={selected.url} title={selected.name} />
              </div>

              <div className="viewer-info">
                <div>
                  Origen:{" "}
                  {selected.sourceType === "local"
                    ? "Cargado por TinCar"
                    : "Google Drive"}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
