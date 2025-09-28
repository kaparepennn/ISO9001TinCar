import React, { useState, useEffect } from "react";

export default function Capacitacion() {
  const [videoWatched, setVideoWatched] = useState(false);
  const [capacitaciones, setCapacitaciones] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    cargo: "",
    archivo: null,
  });

  // Cargar registros desde localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("capacitaciones")) || [];
    setCapacitaciones(saved);
  }, []);

  // Guardar registros en localStorage
  useEffect(() => {
    localStorage.setItem("capacitaciones", JSON.stringify(capacitaciones));
  }, [capacitaciones]);

  const handleWatchVideo = () => {
    window.open("https://youtube.com/watch?v=C1qEQOyne8A&feature=shared", "_blank"); // 🔗 tu enlace de YouTube o Drive
    setVideoWatched(true);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/docs/capacitacion-iso9001.pdf"; // 📌 coloca tu PDF en /public/docs/
    link.download = "Capacitacion_ISO9001.pdf";
    link.click();
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, archivo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.cargo || !formData.archivo) {
      alert("Por favor complete todos los campos y cargue el documento.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      nombre: formData.nombre,
      cargo: formData.cargo,
      archivo: formData.archivo.name,
      fecha: new Date().toLocaleString(),
    };

    setCapacitaciones([...capacitaciones, newRecord]);

    // Reset form
    setFormData({
      nombre: "",
      cargo: "",
      archivo: null,
    });
  };

  return (
    <div className="capacitacion-page">
      <h1>Capacitación ISO 9001</h1>
      <p>
        En esta sección podrás acceder a la capacitación sobre la norma ISO
        9001:2015. Para descargar el documento, primero debes visualizar el
        video de capacitación.
      </p>

      {/* Paso 1: Video */}
      <div className="capacitacion-box">
        <h2>Ver Video de Capacitación</h2>
        <button className="btn primary" onClick={handleWatchVideo}>
          Ver Video
        </button>
      </div>

      {/* Paso 2: Descargar documento */}
      <div className="capacitacion-box">
        <h2>Documento de Capacitación</h2>
        <button
          className={`btn ${videoWatched ? "primary" : "disabled"}`}
          onClick={videoWatched ? handleDownload : undefined}
          disabled={!videoWatched}
        >
          Descargar Documento
        </button>
        {!videoWatched && (
          <p className="muted">
            🔒 Debes ver el video antes de poder descargar el documento.
          </p>
        )}
      </div>

      {/* Paso 3: Registrar capacitación */}
      <div className="capacitacion-box">
        <h2>Registrar Capacitación</h2>
        <form onSubmit={handleRegister} className="capacitacion-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del participante"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={formData.cargo}
            onChange={handleChange}
          />
          <input type="file" accept=".pdf" onChange={handleChange} />
          <button type="submit" className="btn primary">
            Registrar Capacitación
          </button>
        </form>
      </div>

      {/* Paso 4: Registro de capacitaciones */}
      <div className="capacitacion-box">
        <h2>Capacitaciones Registradas</h2>
        {capacitaciones.length === 0 ? (
          <p className="muted">No hay capacitaciones registradas aún.</p>
        ) : (
          <ul className="registro-list">
            {capacitaciones.map((cap) => (
              <li key={cap.id}>
                <div>
                  <strong>{cap.nombre}</strong> - {cap.cargo} <br />
                  <span className="muted">{cap.fecha}</span>
                </div>
                <div>
                  📄 <em>{cap.archivo}</em>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}