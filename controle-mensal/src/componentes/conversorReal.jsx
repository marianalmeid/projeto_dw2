import React, { useState } from 'react';
import MoneyIcon from '@mui/icons-material/AttachMoney';

function ConversorReal() { 
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('');
   const [aberto, setAberto] = useState(false);

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
     <div className="conversor">
      {aberto ? (
        <div className="conversorReal-container">
          <button className="fechar-btn" onClick={() => setAberto(false)}>X</button>
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
        </div>
      ) : (
        <button className="bolinha-conversor" onClick={() => setAberto(true)}> <MoneyIcon /></button>
      )}
    </div>
  );
}

export default ConversorReal; 