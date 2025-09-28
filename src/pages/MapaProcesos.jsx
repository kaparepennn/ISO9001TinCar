import React, { useState, useEffect } from "react";

export default function MapaProcesos() {
  const [procesos, setProcesos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    responsable: "",
    entradas: "",
    salidas: "",
    indicadores: "",
    observaciones: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [detailProceso, setDetailProceso] = useState(null);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("mapaProcesos");
    if (stored) {
      setProcesos(JSON.parse(stored));
    }
  }, []);

  // Guardar en localStorage al actualizar procesos
  useEffect(() => {
    localStorage.setItem("mapaProcesos", JSON.stringify(procesos));
  }, [procesos]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.responsable) {
      alert("Por favor completa al menos el nombre del proceso y el responsable.");
      return;
    }

    if (editIndex !== null) {
      const updated = [...procesos];
      updated[editIndex] = form;
      setProcesos(updated);
      setEditIndex(null);
    } else {
      setProcesos([...procesos, form]);
    }

    setForm({
      nombre: "",
      responsable: "",
      entradas: "",
      salidas: "",
      indicadores: "",
      observaciones: "",
    });
  };

  const handleEdit = (index) => {
    setForm(procesos[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("¿Eliminar este proceso?")) {
      setProcesos(procesos.filter((_, i) => i !== index));
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copiado al portapapeles: " + text);
  };

  return (
    <div className="registro-page">
      <h1>Elaboración del Mapa de Procesos</h1>
      <p>
        En esta fase, se identifican y registran los procesos existentes en la organización con el objetivo 
        de tener una visualización clara de los mismos y analizar sus interrelaciones. Una vez registrados, 
        se lleva a cabo un análisis para detectar áreas de mejora e implementar buenas prácticas.
      </p>
      <p>
        A través de esta identificación de procesos, se obtiene una mayor comprensión de los indicadores 
        de calidad y los controles necesarios para garantizar el correcto funcionamiento de nuestro Sistema 
        de Gestión de la Calidad.
      </p>

      {/* Formulario de registro */}
      <form className="empresa-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre del Proceso"
          />
          <input
            name="responsable"
            value={form.responsable}
            onChange={handleChange}
            placeholder="Responsable"
          />
          <input
            name="entradas"
            value={form.entradas}
            onChange={handleChange}
            placeholder="Entradas"
          />
          <input
            name="salidas"
            value={form.salidas}
            onChange={handleChange}
            placeholder="Salidas"
          />
          <input
            name="indicadores"
            value={form.indicadores}
            onChange={handleChange}
            placeholder="Indicadores"
          />
          <input
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            placeholder="Observaciones"
          />
        </div>
        <button className="btn primary" type="submit">
          {editIndex !== null ? "Actualizar Proceso" : "Registrar Proceso"}
        </button>
      </form>

      {/* Listado de procesos */}
      <div className="empresa-list">
        <h2>Procesos Registrados</h2>
        {procesos.length === 0 ? (
          <p>No hay procesos registrados aún.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Responsable</th>
                <th>Entradas</th>
                <th>Salidas</th>
                <th>Indicadores</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {procesos.map((p, i) => (
                <tr key={i}>
                  <td>{p.nombre}</td>
                  <td>{p.responsable}</td>
                  <td>{p.entradas}</td>
                  <td>{p.salidas}</td>
                  <td>{p.indicadores}</td>
                  <td>
                    <button className="btn small" onClick={() => setDetailProceso(p)}>
                      Ver Detalle
                    </button>
                    <button className="btn small secondary" onClick={() => handleEdit(i)}>
                      Editar
                    </button>
                    <button className="btn small danger" onClick={() => handleDelete(i)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de detalle */}
      {detailProceso && (
        <div className="modal-backdrop" onClick={() => setDetailProceso(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Detalle del Proceso</h2>
            <p><strong>Nombre:</strong> {detailProceso.nombre}</p>
            <p><strong>Responsable:</strong> {detailProceso.responsable}</p>
            <p><strong>Entradas:</strong> {detailProceso.entradas}</p>
            <p><strong>Salidas:</strong> {detailProceso.salidas}</p>
            <p><strong>Indicadores:</strong> {detailProceso.indicadores}</p>
            <p><strong>Observaciones:</strong> {detailProceso.observaciones}</p>

            <div className="modal-actions">
              <button
                className="btn secondary"
                onClick={() => handleCopy(detailProceso.responsable)}
              >
                Copiar Responsable
              </button>
              <button className="btn ghost" onClick={() => setDetailProceso(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
