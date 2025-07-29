import { useState } from "react";

function Quiz({ perguntas }) {
  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [respondido, setRespondido] = useState(false);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);

  const atual = perguntas[indice];

  const handleResposta = (index) => {
    if (respondido) return;
    setRespostaSelecionada(index);
    setRespondido(true);

    if (index === atual.respostaCorreta) {
      setAcertos((a) => a + 1);
    }

    setTimeout(() => {
      setIndice((i) => i + 1);
      setRespondido(false);
      setRespostaSelecionada(null);
    }, 1500);
  };

  if (indice >= perguntas.length) {
    return <h2>Você acertou {acertos} de {perguntas.length} perguntas!</h2>;
  }

  return (
    <div className="quiz">
      <h3>{atual.pergunta}</h3>
      {atual.opcoes.map((opcao, i) => {
        let classe = "";

        if (respondido) {
          if (i === atual.respostaCorreta) {
            classe = "correct";
          } else if (i === respostaSelecionada) {
            classe = "false";
          }
        }

        return (
          <button
            key={i}
            onClick={() => handleResposta(i)}
            className={classe}
            disabled={respondido}
          >
            {opcao}
          </button>
        );
      })}
    </div>
  );
}

export default Quiz;