import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login inválido");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Div da imagem (some no mobile, aparece do md pra cima) */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="/images/eduonback.png"
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Div do login */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-900">
        <div className="max-w-md p-8">
          <h1 className="text-3xl font-bold mb-4 text-white">
            EDUON - Gestão Educacional
          </h1>
          <p className="mb-6 text-gray-300">
            Gerencie alunos e otimize processos.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-800/80 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800/80 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Acessar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
