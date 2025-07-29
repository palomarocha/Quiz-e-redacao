export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { texto } = req.body;

  if (!texto || texto.trim().length === 0) {
    return res.status(400).json({ error: 'O texto da redação é obrigatório.' });
  }

  const resposta = corrigirRedacaoBasico(texto);
  res.status(200).json({ correcao: resposta });
}

function corrigirRedacaoBasico(texto) {
  const tamanho = texto.trim().length;
  let nota = 0;
  let comentarios = [];

  if (tamanho < 50) {
    nota = 1;
    comentarios.push('Redação muito curta, precisa desenvolver mais suas ideias.');
  } else if (tamanho < 150) {
    nota = 4;
    comentarios.push('Texto curto, procure desenvolver melhor os argumentos.');
  } else {
    nota = 7;
    comentarios.push('Boa extensão do texto, mas pode melhorar a clareza e coerência.');
  }

  if (!texto.toLowerCase().includes('proposta')) {
    comentarios.push('Faltou apresentar uma proposta clara de intervenção.');
    nota = Math.min(nota, 6);
  } else {
    nota = Math.max(nota, 7);
  }

  let resposta = `Nota final: ${nota}/10\n\nComentários:\n- ${comentarios.join('\n- ')}`;

  return resposta;
}