import React from 'react';

const FiltroMes = ({ mesSelecionado, onChange }) => {
  return (
    <div className="selectmes">
      <label>Selecionar mês: </label>
      <input
        type="month"
        value={mesSelecionado}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FiltroMes;
