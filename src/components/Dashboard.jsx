import React from 'react'
import logo from '../assets/logo.png'

export default function Dashboard({ user, onNavigate, onLogout }) {
  return (
    <div className="page-wrap">
      <header className="topbar">
        <div className="brand">
          <img src={logo} alt="TinCar" className="brand-logo" />
          <span className="brand-title">TinCar</span>
        </div>

        <div className="top-actions">
          <button className="btn ghost" onClick={onLogout}>Cerrar sesión</button>
        </div>
      </header>

      <main className="hero">
        <div className="hero-left">
          <h1>Sistema de Gestión de Calidad de TinCar</h1>
          <p className="welcome">Bienvenido/a <strong>{user.fullName}</strong>, selecciona la norma a la que quieres acceder a continuación.</p>

          <div className="cta-row">
            <button className="btn big" onClick={() => onNavigate('iso9001')}>ISO9001</button>
            <button className="btn big secondary" onClick={() => onNavigate('iso27001')}>ISO27001</button>
          </div>
        </div>
      </main>

      <footer className="bottom-bar beige">
        <div className="footer-inner">
          <div className="about">
            <h3>Acerca de</h3>
            <p>Interfaz ligera sin conexiones externas.</p>
          </div>
          <div>
            <button className="btn secondary" onClick={() => alert('Función de descarga no implementada en esta versión local.')}>Descargar plantillas</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
