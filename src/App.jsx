import { useState } from 'react';
import './App.css';
import Quiz from './components/quiz';
import Redacao from './components/redacao';

import { perguntas as legislacao } from './components/data/legislacao.js';
import { perguntas as complexos } from './components/data/matematica_complexos_polinomios';
import { perguntas as racionais } from './components/data/matematica_racionais_reais';
import { perguntas as docente } from './components/data/formacao_geral_docente';
import { perguntas as direitos } from './components/data/direitos_humanos';
import { perguntas as portugues } from './components/data/lingua_portuguesa';

function App() {
  const [temaSelecionado, setTemaSelecionado] = useState(null);

  const temas = {
    'Legislação Educacional': legislacao,
    'Números Complexos e Polinômios': complexos,
    'Números Racionais e Reais': racionais,
    'Formação Geral Docente': docente,
    'Direitos Humanos': direitos,
    'Língua Portuguesa': portugues,
    'Redação': null 
  };

  if (temaSelecionado === 'Redação') {
    return (
      <div className="App">
        <h1>Envie sua redação para correção:</h1>
        <Redacao />
        <button onClick={() => setTemaSelecionado(null)}>Voltar</button>
      </div>
    );
  }

  if (temaSelecionado) {
    return (
      <div className="App">
        <h1>Quiz: {temaSelecionado}</h1>
        <Quiz perguntas={temas[temaSelecionado]} />
        <button onClick={() => setTemaSelecionado(null)}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Escolha um tema para começar o quiz:</h1>
      {Object.keys(temas).map((tema, index) => (
        <button key={index} onClick={() => setTemaSelecionado(tema)}>
          {tema}
        </button>
      ))}
    </div>
  );
}

export default App;
