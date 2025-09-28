import React, { useState, useEffect } from "react";

export default function UsuariosRoles() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    rol: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailUser, setDetailUser] = useState(null);

  // Cargar usuarios desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("usuariosRoles");
    if (stored) setUsuarios(JSON.parse(stored));
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("usuariosRoles", JSON.stringify(usuarios));
  }, [usuarios]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.apellido || !form.username || !form.email || !form.rol) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (selectedUser !== null) {
      const updated = [...usuarios];
      updated[selectedUser] = form;
      setUsuarios(updated);
      setSelectedUser(null);
    } else {
      setUsuarios([...usuarios, form]);
    }

    setForm({ nombre: "", apellido: "", username: "", email: "", rol: "" });
  };

  const handleEdit = (index) => {
    setForm(usuarios[index]);
    setSelectedUser(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("¿Eliminar este usuario?")) {
      setUsuarios(usuarios.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="registro-page">
      <h1>Usuarios y Roles</h1>
      <p>Administra los usuarios de la plataforma y asigna sus roles.</p>

      {/* Formulario */}
      <form className="empresa-form usuarios-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <input
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Apellido"
          />
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Usuario (ej: nombre.apellido)"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo Electrónico"
          />
          <select name="rol" value={form.rol} onChange={handleChange}>
            <option value="">Selecciona un rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Auditor">Auditor</option>
            <option value="Colaborador">Colaborador</option>
            <option value="Invitado">Invitado</option>
          </select>
        </div>
        <button className="btn primary" type="submit">
          {selectedUser !== null ? "Actualizar Usuario" : "Registrar Usuario"}
        </button>
      </form>

      {/* Lista de usuarios */}
      <div className="empresa-list">
        <h2>Usuarios Registrados</h2>
        {usuarios.length === 0 ? (
          <p>No hay usuarios registrados aún.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, i) => (
                <tr key={i}>
                  <td>{u.nombre} {u.apellido}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.rol}</td>
                  <td>
                    <button className="btn small" onClick={() => setDetailUser(u)}>
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
      {detailUser && (
        <div className="modal-backdrop" onClick={() => setDetailUser(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Detalle de Usuario</h2>
            <p><strong>Nombre:</strong> {detailUser.nombre} {detailUser.apellido}</p>
            <p><strong>Usuario:</strong> {detailUser.username}</p>
            <p><strong>Email:</strong> {detailUser.email}</p>
            <p><strong>Rol:</strong> {detailUser.rol}</p>

            <div className="modal-actions">
              <a
                className="btn secondary"
                href={`mailto:${detailUser.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar Email
              </a>
              <button className="btn ghost" onClick={() => setDetailUser(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
