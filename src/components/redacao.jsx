import { useState } from "react";
import '../App.css';

function Redacao() {
    const [texto, setTexto] = useState("");
    const [resultado, setResultado] = useState("");
    const [carregando, setCarregando] = useState(false);

    const enviarRedacao = async () => {
        if (!texto.trim()) return;

        setCarregando(true);
        setResultado("");

        try {
      const res = await fetch("http://localhost:4000/corrigir-basico", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texto }),
        });

            if (!res.ok) throw new Error("Erro na requisição");

            const data = await res.json();
            setResultado(data.correcao || "Nota: 0 - Redação não avaliada.");
        } catch {
            setResultado("Nota: 0 - Redação não avaliada.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="redacao-container">
            <textarea
                className="redacao-textarea"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Digite sua redação aqui..."
            />
            <button
                className="redacao-button"
                onClick={enviarRedacao}
                disabled={carregando || texto.trim() === ""}
            >
                {carregando ? "Corrigindo..." : "Enviar redação"}
            </button>

            {resultado && (
                <div className="redacao-result">
                    <h3>Correção:</h3>
                    <pre>{resultado}</pre>
                </div>
            )}
        </div>
    );
}

export default Redacao;
