import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficoDespesas = ({ dadosGrafico }) => {
  if (!dadosGrafico || dadosGrafico.length === 0) {
    return <p></p>;
  }

  const cores = ['#6A0DAD', '#9370DB'];

  return (
    <div className="grafico">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dadosGrafico}
            dataKey="valor"
            nameKey="tipo"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {dadosGrafico.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoDespesas;
