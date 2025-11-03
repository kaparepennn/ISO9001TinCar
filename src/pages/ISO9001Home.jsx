import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Organizacional", value: 37 },
  { name: "Personas", value: 8 },
  { name: "Físico", value: 14 },
  { name: "Tecnológico", value: 34 },
];

const COLORS = ["#FFB300", "#E88E2E", "#FFEFCA", "#2C2C2C"];

export default function ISO9001Home() {
  const navigate = useNavigate();

  return (
    <div className="iso-dashboard">
      <h1>Dashboard ISO9001</h1>
      <p>Visualización general de las etapas de implementación.</p>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
