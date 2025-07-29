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

  return (
    <div className="App">
      {temaSelecionado === 'Redação' ? (
        <>
          <h1>Envie sua redação para correção:</h1>
          <Redacao />
          <button onClick={() => setTemaSelecionado(null)}>Voltar</button>
        </>
      ) : temaSelecionado ? (
        <>
          <h1>Quiz: {temaSelecionado}</h1>
          <Quiz perguntas={temas[temaSelecionado]} />
          <button onClick={() => setTemaSelecionado(null)}>Voltar</button>
        </>
      ) : (
        <>
          <h1>Escolha um tema para começar o quiz:</h1>
          {Object.keys(temas).map((tema, index) => (
            <button key={index} onClick={() => setTemaSelecionado(tema)}>
              {tema}
            </button>
          ))}
        </>
      )}

      <div className="social-icons">
        <a href="https://github.com/palomarocha" target="_blank" rel="noopener noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub"
            width="30"
            height="30"
          />
        </a>
        <a href="https://linkedin.com/in/paloma-rocha-amaral-02239031a/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="LinkedIn"
            width="30"
            height="30"
          />
        </a>
      </div>
    </div>
  );
}

export default App;
