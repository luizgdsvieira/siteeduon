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
          <p className="mb-6">Acesse sua conta e aproveite todos os benefícios exclusivos.</p>
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
          <p className="mt-4 text-sm text-gray-400">Esqueceu sua senha? <a href="#" className="text-blue-400">Recuperar</a></p>
        </div>
        <div className="w-1/2 bg-gray-800 h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white mb-4">IOF</h2>
            <h3 className="text-6xl font-bold text-white">ZERO</h3>
            <div className="mt-6">
              <span className="inline-block bg-gray-700 p-3 rounded-lg text-white">Card 1</span>
              <span className="inline-block bg-gray-700 p-3 rounded-lg text-white ml-2">Card 2</span>
              <span className="inline-block bg-gray-700 p-3 rounded-lg text-white ml-2">Card 3</span>
            </div>
          </div>
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