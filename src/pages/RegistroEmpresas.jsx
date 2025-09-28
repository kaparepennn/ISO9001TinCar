import React, { useState, useEffect } from "react";

export default function RegistroEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null); // para ver detalle
  const [formData, setFormData] = useState({
    razonSocial: "",
    numeroEmpresa: "",
    nit: "",
    email: "",
    representante: "",
    paginaWeb: "",
    sector: "",
    tipoEmpresa: "",
    direccion: "",
    redes: "",
  });

  // Cargar empresas guardadas
  useEffect(() => {
    const stored = localStorage.getItem("empresas");
    if (stored) {
      setEmpresas(JSON.parse(stored));
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("empresas", JSON.stringify(empresas));
  }, [empresas]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...empresas];
      updated[editingIndex] = formData;
      setEmpresas(updated);
      setEditingIndex(null);
    } else {
      setEmpresas([...empresas, formData]);
    }
    setFormData({
      razonSocial: "",
      numeroEmpresa: "",
      nit: "",
      email: "",
      representante: "",
      paginaWeb: "",
      sector: "",
      tipoEmpresa: "",
      direccion: "",
      redes: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(empresas[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("¿Seguro que quieres eliminar esta empresa?")) {
      setEmpresas(empresas.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="registro-page">
      <h1>Registro de Empresas</h1>
      <p className="muted">
        Aquí puedes registrar, editar o eliminar empresas vinculadas al SGC.
      </p>

      {/* Formulario */}
      <form className="empresa-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            type="text"
            name="razonSocial"
            placeholder="Razón Social"
            value={formData.razonSocial}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="numeroEmpresa"
            placeholder="Número de Empresa"
            value={formData.numeroEmpresa}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nit"
            placeholder="NIT"
            value={formData.nit}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="representante"
            placeholder="Representante Legal"
            value={formData.representante}
            onChange={handleChange}
          />
          <input
            type="text"
            name="paginaWeb"
            placeholder="Página Web"
            value={formData.paginaWeb}
            onChange={handleChange}
          />
          <input
            type="text"
            name="sector"
            placeholder="Sector Económico"
            value={formData.sector}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tipoEmpresa"
            placeholder="Tipo de Empresa"
            value={formData.tipoEmpresa}
            onChange={handleChange}
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
          />
          <input
            type="text"
            name="redes"
            placeholder="Redes Sociales"
            value={formData.redes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn primary">
          {editingIndex !== null ? "Actualizar Empresa" : "Registrar Empresa"}
        </button>
      </form>

      {/* Lista de empresas */}
      <div className="empresa-list">
        <h2>Empresas Registradas</h2>
        {empresas.length === 0 && (
          <p className="muted">No hay empresas registradas aún.</p>
        )}
        <table>
          <thead>
            <tr>
              <th>Razón Social</th>
              <th>NIT</th>
              <th>Email</th>
              <th>Representante</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((e, i) => (
              <tr key={i}>
                <td>{e.razonSocial}</td>
                <td>{e.nit}</td>
                <td>{e.email}</td>
                <td>{e.representante}</td>
                <td>
                  <button
                    className="btn secondary small"
                    onClick={() => handleEdit(i)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn danger small"
                    onClick={() => handleDelete(i)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn ghost small"
                    onClick={() => setSelectedEmpresa(e)}
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal detalle */}
      {selectedEmpresa && (
        <div className="modal-backdrop" onClick={() => setSelectedEmpresa(null)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
          >
            <h2>{selectedEmpresa.razonSocial}</h2>
            <p>
              <strong>Número de Empresa:</strong>{" "}
              {selectedEmpresa.numeroEmpresa}
            </p>
            <p>
              <strong>NIT:</strong> {selectedEmpresa.nit}
            </p>
            <p>
              <strong>Email:</strong> {selectedEmpresa.email}
            </p>
            <p>
              <strong>Representante Legal:</strong>{" "}
              {selectedEmpresa.representante}
            </p>
            <p>
              <strong>Página Web:</strong> {selectedEmpresa.paginaWeb}
            </p>
            <p>
              <strong>Sector Económico:</strong> {selectedEmpresa.sector}
            </p>
            <p>
              <strong>Tipo de Empresa:</strong> {selectedEmpresa.tipoEmpresa}
            </p>
            <p>
              <strong>Dirección:</strong> {selectedEmpresa.direccion}
            </p>
            <p>
              <strong>Redes Sociales:</strong> {selectedEmpresa.redes}
            </p>

            {/* Botones de acción */}
            <div className="modal-actions">
              {selectedEmpresa.paginaWeb && (
                <button
                  className="btn secondary"
                  onClick={() =>
                    window.open(selectedEmpresa.paginaWeb, "_blank")
                  }
                >
                  🌐 Abrir Página Web
                </button>
              )}
              {selectedEmpresa.email && (
                <button
                  className="btn primary"
                  onClick={() =>
                    (window.location.href = `mailto:${selectedEmpresa.email}`)
                  }
                >
                  ✉️ Enviar Correo
                </button>
              )}
              {selectedEmpresa.redes && (
                <button
                  className="btn ghost"
                  onClick={() => window.open(selectedEmpresa.redes, "_blank")}
                >
                  🔗 Redes Sociales
                </button>
              )}
            </div>

            <button
              className="btn danger"
              onClick={() => setSelectedEmpresa(null)}
              style={{ marginTop: "15px" }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
