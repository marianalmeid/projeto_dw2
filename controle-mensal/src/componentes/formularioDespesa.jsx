import React from 'react';

const FormDespesa = ({ form, setForm, adicionarDespesa }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarDespesa({ ...form, valor: parseFloat(form.valor) });
    setForm({ nome: '', categoria: '', tipo: 'fixa', valor: '', data: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
      <select name="categoria" value={form.categoria} onChange={handleChange}>
        <option value="alim">Alimentação</option>
        <option value="luz">Luz</option>
        <option value="agua">Água</option>
        <option value="inter">Internet</option>
        <option value="alug">Aluguel</option>
        <option value="transp">Transporte</option>
        <option value="saude">Plano de Saúde</option>
        <option value="lazer">Lazer</option>
        <option value="roupa">Vestuário</option>
        <option value="outros">Outros</option>
      </select>
      <select name="tipo" value={form.tipo} onChange={handleChange}>
        <option value="fixa">Despesa Fixa</option>
        <option value="variavel">Despesa Variável</option>
      </select>
      <input name="valor" type="number" placeholder="Valor" value={form.valor} onChange={handleChange} required />
      <input name="data" type="date" value={form.data} onChange={handleChange} required />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default FormDespesa;
