import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Análisis", value: 20 },
  { name: "Documentación", value: 30 },
  { name: "Procesos", value: 25 },
  { name: "Capacitación", value: 15 },
  { name: "Auditoría", value: 10 },
]

const COLORS = ["#FFB300", "#E88E2E", "#FFEFCA", "#2C2C2C", "#1A1919"]

export default function ISO9001Home() {
  return (
    <div className="iso-dashboard">
      <h1>Dashboard ISO 9001</h1>
      <p>Visualización general de las etapas de implementación.</p>

      <div className="chart-box">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
