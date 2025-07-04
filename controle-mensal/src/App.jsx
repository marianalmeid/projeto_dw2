import React, { useState, useEffect } from 'react';
import FormDespesa from './componentes/formularioDespesa';
import TabelaDespesas from './componentes/listaDespesa';
import FiltroMes from './componentes/filtroMes';
import GraficoDespesas from './componentes/grafico';
import ConversorReal from './componentes/conversorReal'; 
import './App.css';

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
    data: '',
    subcategorias: []
  });

  const [indiceEdicao, setIndiceEdicao] = useState(null);

  const [mesSelecionado, setMesSelecionado] = useState(() => {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    localStorage.setItem('despesas', JSON.stringify(despesas));
  }, [despesas]);

  const adicionarDespesa = (novaDespesa) => {
    if (indiceEdicao !== null) {
      const atualizadas = [...despesas];
      atualizadas[indiceEdicao] = novaDespesa;
      setDespesas(atualizadas);
      setIndiceEdicao(null);
    } else {
      setDespesas([...despesas, {
        ...novaDespesa,
        valor: novaDespesa.tipo === 'fixa'
          ? parseFloat(novaDespesa.valor)
          : novaDespesa.subcategorias.reduce((total, sub) => total + parseFloat(sub.valor), 0)
      }]);
    }
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

  return (
    <div className="container-centralizado">
      <h1>Controle de Gastos Mensais</h1>

      <FormDespesa
        form={form}
        setForm={setForm}
        adicionarDespesa={adicionarDespesa}
      />

      <TabelaDespesas
        despesas={despesas}
        editarDespesa={editarDespesa}
        excluirDespesa={excluirDespesa}
      />

      <FiltroMes
        mesSelecionado={mesSelecionado}
        setMesSelecionado={setMesSelecionado}
      />

      <GraficoDespesas despesasFiltradas={despesasFiltradas} />

    
      <div className="conversorReal-container">
        <ConversorReal /> 
      </div>
    </div>
  );
};

export default App;
