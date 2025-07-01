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
      <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} required />
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
