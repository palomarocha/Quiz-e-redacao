import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function corrigirRedacaoBasico(texto) {
  const tamanho = texto.trim().length;
  let nota = 0;
  let comentarios = [];

  if (tamanho < 50) {
    nota = 1;
    comentarios.push("Redação muito curta, precisa desenvolver mais suas ideias.");
  } else if (tamanho < 150) {
    nota = 4;
    comentarios.push("Texto curto, procure desenvolver melhor os argumentos.");
  } else {
    nota = 7;
    comentarios.push("Boa extensão do texto, mas pode melhorar a clareza e coerência.");
  }

  if (!texto.toLowerCase().includes("proposta")) {
    comentarios.push("Faltou apresentar uma proposta clara de intervenção.");
    nota = Math.min(nota, 6);
  } else {
    nota = Math.max(nota, 7);
  }

  const competencias = {
    "Competência 1": nota >= 7 ? 160 : 80,
    "Competência 2": nota >= 7 ? 160 : 80,
    "Competência 3": nota >= 7 ? 160 : 80,
    "Competência 4": nota >= 7 ? 160 : 80,
    "Competência 5": nota >= 7 ? 160 : 80,
  };

  const notaFinal = Object.values(competencias).reduce((a, b) => a + b, 0);

  let resposta = `Nota final: ${notaFinal}\n\nComentários:\n- ${comentarios.join("\n- ")}\n\nDetalhes das competências:\n`;

  for (const [comp, val] of Object.entries(competencias)) {
    resposta += `${comp}: ${val}/200\n`;
  }

  return resposta;
}

app.post("/corrigir-basico", (req, res) => {
  const { texto } = req.body;

  if (!texto || texto.trim().length === 0) {
    return res.status(400).json({ error: "O texto da redação é obrigatório." });
  }

  const correcao = corrigirRedacaoBasico(texto);

  res.json({ correcao });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
