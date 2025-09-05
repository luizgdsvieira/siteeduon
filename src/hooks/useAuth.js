import { useState } from "react";
import api from "../api";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login(username, password) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      return true;
    } catch (err) {
      setError("Usuário ou senha inválidos");
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  return { login, logout, loading, error };
}
