import React, { useState } from 'react'
import logo from '../assets/logo.png'

function capitalize(s) {
  if (!s) return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    const parts = username.trim().split('.')
    if (parts.length < 2 || parts.some((p) => p.length === 0)) {
      setError('El usuario debe tener formato nombre.apellido (ej: juan.perez)')
      return
    }
    if (password !== "Tincar123*") {
      setError('Contraseña incorrecta.')
      return
    }

    const fullName = parts.map((p) => capitalize(p)).join(' ')
    onLogin({ username: username.trim(), fullName })
  }

  return (
    <div className="page-wrap">
      <header className="topbar">
        <div className="brand">
          <img src={logo} alt="TinCar" className="brand-logo" />
          <span className="brand-title">TinCar</span>
        </div>
      </header>

      <main className="hero center">
        <div className="centered-box">
          <h1 className="title-centered">Sistema de Gestión de Calidad</h1>
          <img src={logo} alt="Logo TinCar" className="hero-logo centered-img" />

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <label>Usuario</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Ej: juan.perez" />
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="contraseña genérica" />
            <div className="actions">
              <button className="btn primary" type="submit">Ingresar</button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bottom-bar">
        <div>© {new Date().getFullYear()} TinCar</div>
      </footer>
    </div>
  )
}
