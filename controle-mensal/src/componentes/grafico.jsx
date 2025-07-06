import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GraficoDespesas = ({ despesasFiltradas }) => {
  const dadosGrafico = [
    {
      tipo: 'Fixa',
      valor: despesasFiltradas
        .filter(d => d.tipo === 'fixa')
        .reduce((total, d) => total + d.valor, 0)
    },
    {
      tipo: 'Variável',
      valor: despesasFiltradas
        .filter(d => d.tipo === 'variavel')
        .reduce((total, d) => total + d.valor, 0)
    }
  ];

  const cores = ['#580c81', '#af2ab6'];

  return (
    <div style={{ width: '100%', maxWidth: 1600, height: 300 }}>
      <ResponsiveContainer>
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
