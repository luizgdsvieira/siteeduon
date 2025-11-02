import { useState } from "react";
import Alunos from "./Alunos";
import Funcionarios from "./Funcionarios";
import Escola from "./Escola";

export default function Dashboard() {
  const [tab, setTab] = useState("alunos");
  const role = localStorage.getItem("role") || "admin";

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Coluna Esquerda - Informações */}
      <div className="w-80 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 text-white flex flex-col shadow-2xl">
        {/* Header com Logo */}
        <div className="p-6 border-b border-blue-500/30">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            EDUON
          </h1>
          <p className="text-blue-200 text-sm">Sistema de Gestão Escolar</p>
        </div>

        {/* Informações do Usuário */}
        <div className="p-6 border-b border-blue-500/30">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/30">
                {role === "admin" ? "👑" : role === "staff" ? "👤" : "🎓"}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">Usuário Logado</h3>
                <p className="text-blue-200 text-sm capitalize">{role}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-blue-200">Status:</span>
                <span className="font-semibold text-green-300">● Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-200">Sessão:</span>
                <span className="font-semibold">Ativa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação */}
        <div className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setTab("alunos")}
            className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
              tab === "alunos"
                ? "bg-white text-blue-700 shadow-lg transform scale-105"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">👥</span>
              <div>
                <div className="font-semibold">Alunos</div>
                <div className="text-xs opacity-75">Gerenciar estudantes</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setTab("funcionarios")}
            className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
              tab === "funcionarios"
                ? "bg-white text-blue-700 shadow-lg transform scale-105"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">👨‍💼</span>
              <div>
                <div className="font-semibold">Funcionários</div>
                <div className="text-xs opacity-75">Gerenciar equipe</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setTab("escola")}
            className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
              tab === "escola"
                ? "bg-white text-blue-700 shadow-lg transform scale-105"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">🏫</span>
              <div>
                <div className="font-semibold">Escola</div>
                <div className="text-xs opacity-75">Informações gerais</div>
              </div>
            </div>
          </button>
        </div>

        {/* Botão de Sair */}
        <div className="p-4 border-t border-blue-500/30">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              window.location.href = "/";
            }}
            className="w-full p-3 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-xl text-white font-semibold transition-all duration-200 hover:scale-105"
          >
            <span className="mr-2">🚪</span>
            Sair do Sistema
          </button>
        </div>
      </div>

      {/* Área de Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header do Conteúdo */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200/50 px-8 py-6 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-800">
            {tab === "alunos" && "👥 Gestão de Alunos"}
            {tab === "funcionarios" && "👨‍💼 Gestão de Funcionários"}
            {tab === "escola" && "🏫 Informações da Escola"}
          </h2>
          <p className="text-blue-600 text-sm mt-1">
            {tab === "alunos" && "Gerencie os estudantes da instituição"}
            {tab === "funcionarios" && "Administre a equipe de funcionários"}
            {tab === "escola" && "Visualize e edite dados da escola"}
          </p>
      </div>

      {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
        {tab === "alunos" && <Alunos />}
        {tab === "funcionarios" && <Funcionarios />}
        {tab === "escola" && <Escola />}
          </div>
        </div>
      </div>
    </div>
  );
}

/*
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Alunos from "./Alunos";
import Funcionarios from "./Funcionarios";
import Escola from "./Escola";

export default function Dashboard() {
  const [tab, setTab] = useState("alunos");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar tab={tab} setTab={setTab} />
      <div className="flex-1 p-6 overflow-y-auto">
        {tab === "alunos" && <Alunos />}
        {tab === "funcionarios" && <Funcionarios />}
        {tab === "escola" && <Escola />}
      </div>
    </div>
  );
}
*/



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