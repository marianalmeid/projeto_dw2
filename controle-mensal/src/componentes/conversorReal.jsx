import React, { useState } from 'react';

function ConversorReal() { 
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('');

  const converterMoeda = async () => {
    if (!valor || isNaN(valor)) {
      alert('Digite um valor válido.');
      return;
    }

    try {
      const response = await fetch('https://economia.awesomeapi.com.br/last/BRL-USD');
      const data = await response.json();

      const cotacao = parseFloat(data.BRLUSD.bid);
      const convertido = (parseFloat(valor) * cotacao).toFixed(2);

      setResultado(`R$ ${valor} = USD $${convertido}`);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar cotação.');
    }
  };

  return (
    <div className="conversorReal">
      <h3>Conversor de Moedas</h3>
      <input
        type="number"
        placeholder="Valor em BRL"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <button onClick={converterMoeda}>Converter</button>
      {resultado && <p>{resultado}</p>}
    </div>
  );
}

export default ConversorReal; 