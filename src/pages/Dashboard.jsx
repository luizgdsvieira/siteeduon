import { useState } from "react";
import Alunos from "./Alunos";
import Funcionarios from "./Funcionarios";
import Escola from "./Escola";

export default function Dashboard() {
  const [tab, setTab] = useState("alunos");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4">EDUON</h2>
        <button onClick={() => setTab("alunos")} className="p-4 hover:bg-gray-700">Alunos</button>
        <button onClick={() => setTab("funcionarios")} className="p-4 hover:bg-gray-700">Funcionários</button>
        <button onClick={() => setTab("escola")} className="p-4 hover:bg-gray-700">Escola</button>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-6">
        {tab === "alunos" && <Alunos />}
        {tab === "funcionarios" && <Funcionarios />}
        {tab === "escola" && <Escola />}
      </div>
    </div>
  );
}



/*
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

*/