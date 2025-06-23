
import React, { useState, useEffect } from 'react';
import './App.css'


const App = () => {
  const [despesas, setDespesas] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    categoria: 'fixa',
    valor: '',
    data: ''
  });

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



return (
  <div>
    <h1>Controle de Gatsos mensais</h1>

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

    <h2>Despesas</h2>
    <table>
     <tread>
       <tr>
        <th>Nome</th>
        <th>Categoria</th>
        <th>Valor</th>
        <th>Data</th>
      </tr>
     </tread>
      <tbody>
          {despesas.map((d, i) => (
            <tr key={i}>
              <td>{d.nome}</td>
              <td>{d.categoria}</td>
              <td>{d.valor.toFixed(2)}</td>
              <td>{d.data}</td>
            </tr>
          ))}
        </tbody>
    </table>

  </div>
);
};
export default App;