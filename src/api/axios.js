import axios from "axios";

// Configuração mais explícita para produção
const getBaseURL = () => {
  // Se VITE_API_URL estiver definida, use ela
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Se window.API_BASE_URL estiver definida (produção), use ela
  if (typeof window !== 'undefined' && window.API_BASE_URL) {
    return window.API_BASE_URL;
  }
  
  // Se estiver em desenvolvimento, use localhost
  if (import.meta.env.DEV) {
    return "http://localhost:3000/api";
  }
  
  // Em produção, use a API do Render
  return "https://projetoeduon.onrender.com/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
});

// Log para debug
console.log("🔧 API Base URL:", getBaseURL());
console.log("🌍 Ambiente:", import.meta.env.DEV ? "Desenvolvimento" : "Produção");

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de resposta para tratar apenas erros reais
api.interceptors.response.use(
  (response) => {
    // Respostas bem-sucedidas (status 2xx)
    return response;
  },
  (error) => {
    // Apenas tratar como erro se for realmente um erro HTTP
    if (error.response) {
      // Erro com resposta do servidor (status 4xx, 5xx)
      return Promise.reject(error);
    } else if (error.request) {
      // Erro de rede (sem resposta)
      console.error('Erro de rede:', error.request);
      return Promise.reject(error);
    } else {
      // Erro na configuração da requisição
      console.error('Erro na configuração:', error.message);
      return Promise.reject(error);
    }
  }
);

export default api;
