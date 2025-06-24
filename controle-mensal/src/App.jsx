import React, { useState, useEffect } from 'react';
import './App.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const App = () => {
  const [despesas, setDespesas] = useState(() => {
    const dadosSalvos = localStorage.getItem('despesas');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [form, setForm] = useState({
    nome: '',
    categoria: 'fixa',
    valor: '',
    data: ''
  });

  useEffect(() => {
    localStorage.setItem('despesas', JSON.stringify(despesas));
  }, [despesas]);

  const adicionarDespesa = (e) => {
    e.preventDefault();
    const novaDespesa = { ...form, valor: parseFloat(form.valor) };
    setDespesas([...despesas, novaDespesa]);
    setForm({ nome: '', categoria: 'fixa', valor: '', data: '' });
  };

  const mudanca = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [indiceEdicao, setIndiceEdicao] = useState(null); // precisa disso também no topo

const editarDespesa = (index) => {
  setForm(despesas[index]);         // Preenche o formulário com os dados da linha
  setIndiceEdicao(index);           // Marca qual está sendo editado
};

const excluirDespesa = (index) => {
  const novaLista = despesas.filter((_, i) => i !== index);
  setDespesas(novaLista);
  if (indiceEdicao === index) setIndiceEdicao(null); // cancela edição se excluir o que estava editando
};

  // Dados para o gráfico
  const dadosGrafico = [
    {
      categoria: 'Fixa',
      valor: despesas
        .filter(d => d.categoria === 'fixa')
        .reduce((total, d) => total + d.valor, 0)
    },
    {
      categoria: 'Variável',
      valor: despesas
        .filter(d => d.categoria === 'variavel')
        .reduce((total, d) => total + d.valor, 0)
    }
  ];
  const cores = ['#6A0DAD', '#9370DB'];


  return (
    <div className="container-centralizado">
      <h1>Controle de Gastos Mensais</h1>

      <form onSubmit={adicionarDespesa}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={mudanca} required />
        <select name="categoria" value={form.categoria} onChange={mudanca}>
          <option value="fixa">Despesa Fixa</option>
          <option value="variavel">Despesa Variável</option>
        </select>
        <input name="valor" type="number" placeholder="Valor" value={form.valor} onChange={mudanca} required />
        <input name="data" type="date" value={form.data} onChange={mudanca} required />
        <button type="submit">Adicionar</button>
      </form>

      <div className='lista'>
        <h2>Despesas</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {despesas.map((d, i) => (
              <tr key={i}>
                <td>{d.nome}</td>
                <td>{d.categoria}</td>
                <td>R$ {d.valor.toFixed(2)}</td>
                <td>{d.data}</td>
                <td><button onClick={() => excluirDespesa(i)}>excluir</button></td>
                <td><button onClick={() => editarDespesa(i)}>editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Gráfico de Gastos por Categoria</h2>
      <div style={{ width: '100%', maxWidth: 1200, height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={dadosGrafico}
              dataKey="valor"
              nameKey="categoria"
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
    </div>
  );
};

export default App;
