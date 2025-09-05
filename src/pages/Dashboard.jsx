import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    api.get("/alunos").then((res) => setAlunos(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Lista de Alunos</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          {alunos.length === 0 ? (
            <p className="text-gray-600">Nenhum aluno cadastrado.</p>
          ) : (
            <ul className="space-y-2">
              {alunos.map((a) => (
                <li key={a.id} className="border-b py-2">
                  <span className="font-medium">{a.name}</span> —{" "}
                  <span className="text-gray-600">Matrícula: {a.matricula}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
