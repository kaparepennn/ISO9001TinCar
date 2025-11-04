import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#FFB300", "#E88E2E", "#FFEFCA", "#8884d8"];

export default function ISO27001Home() {
  const [stats, setStats] = useState({
    Organizacionales: 0,
    Personas: 0,
    Fisicos: 0,
    Tecnologicos: 0,
  });

  useEffect(() => {
    const dominios = ["organizacional", "personas", "fisico", "tecnologico"];
    const resumen = {};

    dominios.forEach((d) => {
      const data = JSON.parse(localStorage.getItem(`iso27001_checklist_${d}`)) || [];
      if (data.length === 0) resumen[d] = 0;
      else {
        const total = data.length;
        const cumple = data.filter((x) => x.estado === "Cumple").length;
        resumen[d] = Math.round((cumple / total) * 100);
      }
    });

    setStats({
      Organizacionales: resumen.organizacional || 0,
      Personas: resumen.personas || 0,
      Fisicos: resumen.fisico || 0,
      Tecnologicos: resumen.tecnologico || 0,
    });
  }, []);

  const pieData = Object.entries(stats).map(([name, value]) => ({ name, value }));

  return (
    <div className="iso-dashboard">
      <h1>Dashboard ISO 27001</h1>
      <p>Estado general de cumplimiento basado en los checklists de cada dominio.</p>

      <div className="chart-container">
        <div className="chart-box">
          <h3>Distribución General</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100} label>
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
          <h3>Resumen por Categoría (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" fill="#FFB300" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
