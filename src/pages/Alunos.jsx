import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    api.get("/alunos").then((res) => setAlunos(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Alunos</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Matrícula</th>
            <th className="p-2 border">Ano</th>
            <th className="p-2 border">Turma</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((a) => (
            <tr key={a.id} className="border">
              <td className="p-2 border">{a.nome}</td>
              <td className="p-2 border">{a.matricula}</td>
              <td className="p-2 border">{a.ano}</td>
              <td className="p-2 border">{a.turma}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
