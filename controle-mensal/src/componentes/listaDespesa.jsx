import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TabelaDespesas = ({ despesas, editarDespesa, excluirDespesa }) => {
  return (
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
    <React.Fragment key={i}>
      <tr>
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
      {d.tipo === 'variável' && d.subcategorias && d.subcategorias.map((sub, subIndex) => (
        <tr key={`${i}-${subIndex}`} className="subcategoria">
          <td>{sub.nome}</td>
          <td colSpan="2">Subcategoria</td>
          <td>R$ {sub.valor}</td>
          <td colSpan="3"></td>
        </tr>
      ))}
    </React.Fragment>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default TabelaDespesas;
