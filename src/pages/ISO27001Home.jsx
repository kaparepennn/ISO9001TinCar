import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#FFB300", "#E88E2E", "#FFEFCA", "#2C2C2C"];

export default function ISO27001Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dominios = ["organizacional", "personas", "fisico", "tecnologico"];
    const resumen = dominios.map((dominio) => {
      const lista = JSON.parse(localStorage.getItem(`iso27001_checklist_${dominio}`)) || [];
      const total = lista.length || 0;
      const cumple = lista.filter((x) => x.estado === "Cumple").length;
      const parcial = lista.filter((x) => x.estado === "Parcial").length;
      const noCumple = lista.filter((x) => x.estado === "No cumple").length;
      const enProceso = lista.filter((x) => x.estado === "En proceso").length;
      return {
        dominio,
        total,
        cumple,
        parcial,
        noCumple,
        enProceso,
      };
    });
    setData(resumen);
  }, []);

  const pieData = data.map((d) => ({
    name: d.dominio.charAt(0).toUpperCase() + d.dominio.slice(1),
    value: d.cumple,
  }));

  return (
    <div className="iso-dashboard">
      <h1>Dashboard ISO 27001</h1>
      <p>Monitoreo general de cumplimiento basado en los checklists de cada dominio.</p>

      <div className="charts-container">
        <div className="chart-box">
          <h3>Cumplimiento General</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Estado por Dominio</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="dominio" stroke="#FFB300" />
              <YAxis stroke="#FFB300" />
              <Tooltip />
              <Legend />
              <Bar dataKey="cumple" fill="#FFB300" name="Cumple" />
              <Bar dataKey="parcial" fill="#E88E2E" name="Parcial" />
              <Bar dataKey="noCumple" fill="#d9534f" name="No cumple" />
              <Bar dataKey="enProceso" fill="#999" name="En proceso" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
