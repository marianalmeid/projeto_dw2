import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const categoriasNomes = {
  alim: "Alimentação",
  luz: "Luz",
  agua: "Água",
  inter: "Internet",
  alug: "Aluguel",
  transp: "Transporte",
  saude: "Plano de Saúde",
  lazer: "Lazer",
  roupa: "Vestuário",
  outros: "Outros",
  "": "Sem categoria"
};

const tiposNomes = {
  fixa: "Despesa Fixa",
  variavel: "Despesa Variável"
};


const TabelaDespesas = ({ despesas, editarDespesa, excluirDespesa }) => {
  const [categoriaAberta, setCategoriaAberta] = useState(null);

  const formatarData = (data) => {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};
  console.log("despesas:", despesas);
 const despesasPorCategoria = Array.isArray(despesas)
  ? despesas.reduce((acc, despesa, index) => {
      const categoria = despesa.categoria?.trim() || "Sem categoria";
      if (!acc[categoria]) acc[categoria] = [];
      acc[categoria].push({ ...despesa, index });
      return acc;
    }, {})
  : {};

  const toggleCategoria = (categoria) => {
    setCategoriaAberta(categoriaAberta === categoria ? null : categoria);
  };

  return (
    <div className="lista">
      <h2>Despesas</h2>
      <table>
        <thead>
          <tr>
           <th style={{ width: '25%' }}>Categoria</th>
           <th style={{ width: '20%' }}>Valor Total</th>
           <th style={{ width: '15%' }}></th>
            <th style={{ width: '20%' }}></th>
           <th style={{ width: '20%' }} colSpan="2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(despesasPorCategoria).map(([categoria, lista]) => {
            const valorTotal = lista.reduce((soma, d) => soma + d.valor, 0);
            return (
              <React.Fragment key={categoria}>
                <tr onClick={() => toggleCategoria(categoria)} style={{ cursor: 'pointer' }}>
                  <td><strong>{categoriasNomes[categoria] || categoria}</strong></td>
                  <td><strong>R$ {valorTotal.toFixed(2)}</strong></td>
                  <td></td>
                  <td></td>
                  <td colSpan="2">{categoriaAberta === categoria ? '▲' : '▼'}</td>
                </tr>

                {categoriaAberta === categoria &&
                  lista.map((d) => (
                    <tr key={d.index} className="linha-despesa">
                      <td style={{ width: '25%'}}>{d.nome}</td>
                      <td style={{ width: '25%'}}>R$ {d.valor.toFixed(2)}</td>
                      <td style={{ width: '25%'}}>{formatarData(d.data)}</td>
                     <td style={{ width: '25%'}}>{tiposNomes[d.tipo]}</td>
                      <td style={{ width: '12.5%'}}>
                        <button onClick={() => editarDespesa(d.index)}>
                          <EditIcon />
                        </button>
                      </td>
                      <td style={{ width: '12.5%'}}>
                        <button onClick={() => excluirDespesa(d.index)}>
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaDespesas;
