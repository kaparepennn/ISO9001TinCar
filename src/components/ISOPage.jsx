import React from 'react'
import logo from '../assets/logo.png'

export default function ISOPage({ norma, onBack, user }) {
  const is9001 = norma === 'ISO 9001'
  return (
    <div className="page-wrap">
      <header className="topbar">
        <div className="brand">
          <img src={logo} alt="TinCar" className="brand-logo" />
          <span className="brand-title">TinCar</span>
        </div>
      </header>

      <main className="iso-page">
        <div className="iso-header">
          <h1>{norma} - Plataforma TinCar</h1>
          <p>Usuario: <strong>{user.fullName}</strong></p>
          <div className="iso-actions">
            <button className="btn" onClick={onBack}>Volver</button>
          </div>
        </div>

        <section className="iso-content">
          {is9001 ? (
            <>
              <h2>Checklist básico para ISO 9001</h2>
              <ol>
                <li>Definir el alcance del SGC.</li>
                <li>Identificar procesos y responsables.</li>
                <li>Documentar procedimientos clave.</li>
                <li>Implementar controles y evidencias.</li>
                <li>Auditorías internas y mejora continua.</li>
              </ol>
            </>
          ) : (
            <>
              <h2>Checklist básico para ISO 27001</h2>
              <ol>
                <li>Definir el alcance del SGSI.</li>
                <li>Realizar análisis de riesgos.</li>
                <li>Definir políticas y controles de seguridad.</li>
                <li>Gestionar accesos y respaldos.</li>
                <li>Auditorías internas y revisión periódica.</li>
              </ol>
            </>
          )}

          <p>Estas páginas son plantillas iniciales; puedes ampliar con documentos, plantillas y listas de verificación en la carpeta <code>docs/</code> (manual) o añadir más componentes para gestionar evidencias.</p>
        </section>
      </main>
    </div>
  )
}
