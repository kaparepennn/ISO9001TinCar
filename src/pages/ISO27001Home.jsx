import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "../styles/index.css";

const COLORS = ["#FFB300", "#E88E2E", "#FFEFCA", "#C0392B"];

export default function ISO27001Home() {
  const [dataPie, setDataPie] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [resumen, setResumen] = useState({});

  useEffect(() => {
    const controles =
      JSON.parse(localStorage.getItem("iso27001_checklist_organizacional")) || [];
    const total = controles.length || 1;
    const estados = {
      cumple: controles.filter((c) => c.estado === "Cumple").length,
      parcial: controles.filter((c) => c.estado === "Parcial").length,
      noCumple: controles.filter((c) => c.estado === "No cumple").length,
      proceso: controles.filter((c) => c.estado === "En proceso").length,
    };

    setResumen({
      total,
      ...estados,
      porcentaje: ((estados.cumple / total) * 100).toFixed(1),
    });

    setDataPie([
      { name: "Cumple", value: estados.cumple },
      { name: "Parcial", value: estados.parcial },
      { name: "No cumple", value: estados.noCumple },
      { name: "En proceso", value: estados.proceso },
    ]);

    setDataBar([
      { estado: "Cumple", cantidad: estados.cumple },
      { estado: "Parcial", cantidad: estados.parcial },
      { estado: "No cumple", cantidad: estados.noCumple },
      { estado: "En proceso", cantidad: estados.proceso },
    ]);
  }, []);

  return (
    <div className="iso-dashboard">
      <h1>Dashboard ISO 27001</h1>
      <p>
        Tablero general con el estado actual de cumplimiento basado en los
        controles registrados en el checklist.
      </p>

      {/* === Indicador de progreso general === */}
      <div className="dashboard-progress">
        <h3>Cumplimiento general: {resumen.porcentaje || 0}%</h3>
        <progress
          value={resumen.porcentaje || 0}
          max="100"
          className="progress-bar"
        ></progress>
      </div>

      {/* === Contenedores de gráficos alineados === */}
      <div className="charts-row">
        {/* === Gráfico de torta === */}
        <div className="chart-box">
          <h3>Distribución porcentual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {dataPie.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#1A1919"
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* === Gráfico de barras === */}
        <div className="chart-box">
          <h3>Controles por estado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataBar}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="estado" stroke="#FFB300" />
              <YAxis stroke="#FFB300" />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#E88E2E" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === Resumen numérico general === */}
      <div className="resumen-dashboard">
        <div className="card">
          <h4>Total de controles</h4>
          <p>{resumen.total || 0}</p>
        </div>
        <div className="card">
          <h4>Cumple</h4>
          <p>{resumen.cumple || 0}</p>
        </div>
        <div className="card">
          <h4>Parcial</h4>
          <p>{resumen.parcial || 0}</p>
        </div>
        <div className="card">
          <h4>No cumple</h4>
          <p>{resumen.noCumple || 0}</p>
        </div>
        <div className="card">
          <h4>En proceso</h4>
          <p>{resumen.proceso || 0}</p>
        </div>
      </div>
    </div>
  );
}
