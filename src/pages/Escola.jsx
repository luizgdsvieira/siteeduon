import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Escola() {
  const [escola, setEscola] = useState(null);

  useEffect(() => {
    // Busca os dados da escola logada
    api.get("/escola")
      .then((res) => setEscola(res.data))
      .catch((err) => console.error("Erro ao buscar escola:", err));
  }, []);

  if (!escola) return <p>Carregando dados da escola...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dados da Escola</h1>
      <div className="bg-white p-4 shadow space-y-2">
        <p><strong>Nome:</strong> {escola.name}</p>
        <p><strong>CNPJ:</strong> {escola.cnpj}</p>
        <p><strong>Criada em:</strong> {new Date(escola.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
