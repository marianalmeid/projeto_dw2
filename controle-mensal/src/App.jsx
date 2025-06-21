import React, { useState, useEffect } from 'react';


const App = () => {
  const [despesas, setDespesas] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    categoria: 'fixa',
    valor: '',
    data: ''
  });


return (
  <div>
    <h1>Controle de Gatsos mensais</h1>

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
    </table>

  </div>
);
};
export default App;