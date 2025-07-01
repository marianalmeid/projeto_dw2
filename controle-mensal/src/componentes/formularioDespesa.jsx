import React from 'react';

const FormularioDespesa = ({ form, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <input name="nome" placeholder="Nome" value={form.nome} onChange={onChange} required />
      <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={onChange} required />
      <select name="tipo" value={form.tipo} onChange={onChange}>
        <option value="fixa">Despesa Fixa</option>
        <option value="variavel">Despesa Variável</option>
      </select>
      <input name="valor" type="number" placeholder="Valor" value={form.valor} onChange={onChange} required />
      <input name="data" type="date" value={form.data} onChange={onChange} required />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default FormularioDespesa;
