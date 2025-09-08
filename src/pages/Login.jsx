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
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#1a1a1a] via-[#232323] to-[#2d2d2d] font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        {/* Logo BTG-like */}
        <div className="mb-8">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#FFD600" />
            <text x="45" y="28" fontFamily="Montserrat, Arial, sans-serif" fontWeight="bold" fontSize="28" fill="#232323">EDUON</text>
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-[#232323] tracking-wide">Bem-vindo</h1>
        <p className="mb-8 text-gray-500 text-sm text-center">Acesse sua conta para continuar</p>
        <form className="w-full" onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-700 mb-2" htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD600] text-gray-900 bg-gray-50 transition"
              autoComplete="username"
            />
          </div>
          <div className="mb-8">
            <label className="block text-xs font-semibold text-gray-700 mb-2" htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD600] text-gray-900 bg-gray-50 transition"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FFD600] text-[#232323] font-bold py-3 rounded-lg hover:bg-[#ffe066] transition text-lg shadow"
          >
            Entrar
          </button>
        </form>
        <div className="mt-6 text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} EDUON. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
}


/*
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
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="relative w-full max-w-4xl flex items-center">
        <div className="w-1/2 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">EDUON - Gestão Educacional</h1>
          <p className="mb-6">Gerencie alunos e otimize processos.</p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-700 border-none rounded-lg text-white placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border-none rounded-lg text-white placeholder-gray-400"
            />
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Acessar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
*/

/*
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
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 shadow-lg rounded-xl p-8 w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">EDUON - Gestão Educacional</h1>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border-none ng-gray-700 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
*/


/*

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          EDUON - Login
        </h1>

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

*/