import React, { useState, useEffect } from 'react';
import './App.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const App = () => {
  const [despesas, setDespesas] = useState(() => {
    const dadosSalvos = localStorage.getItem('despesas');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [form, setForm] = useState({
    nome: '',
    categoria: '',
    tipo: 'fixa',
    valor: '',
    data: ''
  });

  const [indiceEdicao, setIndiceEdicao] = useState(null);

  // ✅ Mês atual como padrão
  const [mesSelecionado, setMesSelecionado] = useState(() => {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    localStorage.setItem('despesas', JSON.stringify(despesas));
  }, [despesas]);

  const adicionarDespesa = (e) => {
    e.preventDefault();
    const novaDespesa = { ...form, valor: parseFloat(form.valor) };

    if (indiceEdicao !== null) {
      const novasDespesas = [...despesas];
      novasDespesas[indiceEdicao] = novaDespesa;
      setDespesas(novasDespesas);
      setIndiceEdicao(null);
    } else {
      setDespesas([...despesas, novaDespesa]);
    }

    setForm({ nome: '', categoria: '', tipo: 'fixa', valor: '', data: '' });
  };

  const mudanca = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const editarDespesa = (index) => {
    setForm(despesas[index]);
    setIndiceEdicao(index);
  };

  const excluirDespesa = (index) => {
    const novaLista = despesas.filter((_, i) => i !== index);
    setDespesas(novaLista);
    if (indiceEdicao === index) setIndiceEdicao(null);
  };

  // ✅ Filtrar despesas do mês selecionado
  const despesasFiltradas = despesas.filter((d) => {
    return d.data.startsWith(mesSelecionado);
  });

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

  const cores = ['#6A0DAD', '#9370DB'];

  return (
    <div className="container-centralizado">
      <h1>Controle de Gastos Mensais</h1>

      {/* ✅ Seletor de mês */}
      <div style={{ textAlign: 'center', margin: '10px 0', color: 'black'}}>
        <label>Selecionar mês: </label>
        <input
          type="month"
          value={mesSelecionado}
          onChange={(e) => setMesSelecionado(e.target.value)}
        />
      </div>

      <form onSubmit={adicionarDespesa}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={mudanca} required />
        <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={mudanca} required />
        <select name="tipo" value={form.tipo} onChange={mudanca}>
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
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
              <th colSpan="2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {despesas.map((d, i) => (
              <tr key={i}>
                <td>{d.nome}</td>
                <td>{d.categoria}</td>
                <td>{d.tipo}</td>
                <td>R$ {d.valor.toFixed(2)}</td>
                <td>{d.data}</td>
                <td>
                  <button onClick={() => excluirDespesa(i)}>
                    <DeleteIcon />
                  </button>
                </td>
                <td>
                  <button onClick={() => editarDespesa(i)}>
                    <EditIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Gráfico de Gastos no Mês</h2>
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
    </div>
  );
};

export default App;
