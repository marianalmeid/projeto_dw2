import React from 'react';

const FiltroMes = ({ mesSelecionado, setMesSelecionado }) => {
  const handleMesChange = (e) => {
      setMesSelecionado(e.target.value)}
  return (
    <div className="selectmes">
      <label>Selecionar mês: </label>
      <input
         id="mes-selecionado"
         type="month"
         value={mesSelecionado}
         onChange={handleMesChange}
        
      />
    </div>
  );
};

export default FiltroMes;
