import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    // Busca todos os funcionários da escola logada
    api.get("/funcionarios")
      .then((res) => setFuncionarios(res.data))
      .catch((err) => console.error("Erro ao buscar funcionários:", err));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Funcionários</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Cargo</th>
            <th className="p-2 border">Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((f) => (
            <tr key={f.id} className="border">
              <td className="p-2 border">{f.name}</td>
              <td className="p-2 border">{f.cargo}</td>
              <td className="p-2 border">{new Date(f.nascimento).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
