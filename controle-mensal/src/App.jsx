import React, { useState, useEffect } from 'react';
import FormularioDespesa from './componentes/formularioDespesa';
import ListaDespesas from './componentes/listaDespesa';
import GraficoDespesas from './componentes/filtroMes';
import FiltroMes from './componentes/grafico';
import './App.css'

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

  const mudarForm = (e) => {
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

  const despesasFiltradas = despesas.filter((d) => d.data.startsWith(mesSelecionado));

  const dadosGrafico = [
    {
      tipo: 'Fixa',
      valor: despesasFiltradas.filter((d) => d.tipo === 'fixa').reduce((acc, d) => acc + d.valor, 0)
    },
    {
      tipo: 'Variável',
      valor: despesasFiltradas.filter((d) => d.tipo === 'variavel').reduce((acc, d) => acc + d.valor, 0)
    }
  ];

  const cores = ['#6A0DAD', '#9370DB'];

  return (
    <div className="container-centralizado">
      <h1>Controle de Gastos Mensais</h1>
      <FormularioDespesa form={form} onSubmit={adicionarDespesa} onChange={mudarForm} />
      <ListaDespesas despesas={despesasFiltradas} onExcluir={excluirDespesa} onEditar={editarDespesa} />
      <FiltroMes mesSelecionado={mesSelecionado} onChange={setMesSelecionado} />
      <GraficoDespesas dadosGrafico={dadosGrafico} cores={cores} />
    </div>
  );
};

export default App;
