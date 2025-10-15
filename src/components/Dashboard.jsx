import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard({ user, onNavigate, onLogout }) {
  const [metrics, setMetrics] = useState({
    empresas: 0,
    capacitaciones: 0,
    documentos: 0,
    auditorias: 0,
  });

  // === Actualización en tiempo real de localStorage ===
  useEffect(() => {
    const updateMetrics = () => {
      try {
        const empresas = JSON.parse(localStorage.getItem("empresas")) || [];
        const capacitaciones =
          JSON.parse(localStorage.getItem("capacitaciones")) || [];
        const documentos = JSON.parse(localStorage.getItem("documentos")) || [];
        const auditorias = JSON.parse(localStorage.getItem("auditorias")) || [];

        setMetrics({
          empresas: empresas.length,
          capacitaciones: capacitaciones.length,
          documentos: documentos.length,
          auditorias: auditorias.length,
        });
      } catch (error) {
        console.error("Error cargando métricas:", error);
      }
    };

    // Primera carga
    updateMetrics();

    // Escucha cambios en localStorage (sin recargar)
    window.addEventListener("storage", updateMetrics);
    return () => window.removeEventListener("storage", updateMetrics);
  }, []);

  const chartData = [
    { name: "Empresas", value: metrics.empresas },
    { name: "Capacitaciones", value: metrics.capacitaciones },
    { name: "Documentos", value: metrics.documentos },
    { name: "Auditorías", value: metrics.auditorias },
  ];

  const COLORS = ["#FFB300", "#E88E2E", "#FFEFCA", "#FFD56B"];

  return (
    <div className="page-wrap">
      {/* Header */}
      <header className="topbar">
        <div className="brand">
          <img src={logo} alt="TinCar" className="brand-logo" />
          <span className="brand-title">TinCar</span>
        </div>

        <div className="top-actions">
          <button className="btn ghost" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Main Hero */}
      <main className="hero center">
        <div className="centered-box">
          <h1 className="title-centered">Sistema de Gestión de Calidad</h1>
          <p className="welcome">
            Bienvenido/a <strong>{user.fullName}</strong>, selecciona la norma
            que deseas gestionar.
          </p>

          {/* Botones centrados */}
          <div className="dashboard-buttons">
            <button className="btn big" onClick={() => onNavigate("iso9001")}>
              ISO 9001
            </button>
            <button
              className="btn big secondary"
              onClick={() => onNavigate("iso27001")}
            >
              ISO 27001
            </button>
          </div>

          {/* === Sección de Dashboard Interactivo === */}
          <section className="dashboard-section">
            <h2 className="metrics-title">Resumen General</h2>

            <div className="dashboard-charts">
              {/* --- Gráfico de Barras --- */}
              <div className="chart-box">
                <h3>Resumen por Categoría</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#FFB300" />
                    <YAxis stroke="#FFB300" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#2C2C2C",
                        borderRadius: "8px",
                        border: "1px solid #FFB300",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="value" fill="#FFB300" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* --- Gráfico de Torta --- */}
              <div className="chart-box">
                <h3>Distribución General</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#2C2C2C",
                        borderRadius: "8px",
                        border: "1px solid #FFB300",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}