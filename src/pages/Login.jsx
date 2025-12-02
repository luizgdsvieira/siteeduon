import { useState, useRef, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const loginWrapperRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("🔐 Tentando login com:", { username, password: password ? '***' : '' });
      console.log("🌍 Ambiente:", import.meta.env.DEV ? "Desenvolvimento" : "Produção");
      console.log("📡 URL da API:", api.defaults.baseURL);
      
      const res = await api.post("/auth/login", { username, password });
      
      console.log("✅ Resposta completa:", res);
      console.log("✅ Status:", res.status);
      console.log("✅ Dados:", res.data);
      
      // Verificar se a resposta tem os dados necessários
      if (res.data && res.data.token) {
        console.log("✅ Login bem-sucedido! Salvando token...");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        console.log("✅ Redirecionando para dashboard...");
        navigate("/dashboard");
      } else {
        console.warn("⚠️ Resposta sem token:", res.data);
        alert("Erro: Resposta do servidor inválida. Tente novamente.");
      }
    } catch (err) {
      console.error("❌ Erro no login:", err);
      console.error("❌ Tipo de erro:", err.constructor?.name);
      console.error("❌ Código do erro:", err.code);
      console.error("❌ Mensagem:", err.message);
      console.error("❌ Resposta do servidor:", err.response?.data);
      console.error("❌ Status:", err.response?.status);
      console.error("❌ URL completa tentada:", err.config?.baseURL + err.config?.url);
      console.error("❌ Request completo:", err.request);
      
      let errorMessage = "Erro ao fazer login";
      
      // Verificar se é um erro de autenticação (401)
      if (err.response?.status === 401) {
        errorMessage = err.response.data?.error || "Usuário ou senha inválidos";
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = "Tempo de conexão esgotado. Verifique sua internet.";
      } else if (err.code === 'ERR_NETWORK' || !err.response) {
        // Se não há resposta, pode ser CORS ou API offline
        errorMessage = "Erro de conexão. Verifique se a API está online e acessível.";
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert(`Login inválido: ${errorMessage}`);
    }
  };

  const scrollToTop = () => {
    if (containerRef.current && typeof containerRef.current.scrollTo === "function") {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fechar cartão ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginWrapperRef.current && !loginWrapperRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
    };

    if (isLoginOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoginOpen]);

  const toggleLoginCard = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {/* ========= HEADER FIXO ========= */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          {/* Logo EDUON */}
          <div className={styles.logo}>
            <h1 className={styles.logoText}>EDUON</h1>
          </div>

          {/* Botão e Cartão de Login */}
          <div ref={loginWrapperRef} className={styles.loginWrapper}>
            <button 
              onClick={toggleLoginCard}
              className={styles.accessButton}
            >
              Acesse sua conta
            </button>
            <div className={`${styles.loginCard} ${isLoginOpen ? styles.loginCardOpen : ''}`}>
              <h2 className={styles.loginTitle}>Login</h2>
              <form onSubmit={handleLogin} className={styles.loginForm}>
                <input
                  type="text"
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
                <button type="submit" className={styles.submitButton}>
                  Entrar
                </button>
                <div className={styles.forgotLink}>
                  <a href="#">Esqueci minha senha</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ========= SEÇÃO HERO ========= */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroImage}>
            <img src="/images/professor1.jpg" alt="Professor" />
          </div>
          <div className={styles.heroText}>
            <h2 className={styles.heroTitle}>
              Quer dar um novo passo na gestão da sua escola?
            </h2>
            <p className={styles.heroSubtitle}>
              Conheça a Eduon. Gestão de alunos e carteirinha digital.
            </p>
          </div>
        </div>
      </div>

      {/* ========= SEÇÃO MOBILE ========= */}
      <div className={styles.mobileSection}>
        <div className={styles.mobileContent}>
          <h3 className={styles.mobileTitle}>EDUON Mobile</h3>
          <div className={styles.mobileImage}>
            <img src="/images/celular.png" alt="EDUON Mobile" />
          </div>
          <p className={styles.mobileDescription}>
            Baixe o app para gestão educacional
          </p>
          <button className={styles.mobileButton}>
            <img src="/images/logoplay.png" alt="Play Store" style={{ width: "25px", height: "25px" }} />
            <span>Disponível em Play Store</span>
          </button>
        </div>
      </div>

      {/* ========= SEÇÃO FEATURES ========= */}
      <div className={styles.featuresSection}>
        <div className={styles.featuresContent}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <span>👥</span>
            </div>
            <h4 className={styles.featureTitle}>Gestão de Alunos</h4>
            <p className={styles.featureDescription}>Controle completo dos estudantes</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <span>📊</span>
            </div>
            <h4 className={styles.featureTitle}>Relatórios</h4>
            <p className={styles.featureDescription}>Análises e dados em tempo real</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <span>🎫</span>
            </div>
            <h4 className={styles.featureTitle}>Carteirinha Digital</h4>
            <p className={styles.featureDescription}>Identificação digital dos alunos</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <span>💬</span>
            </div>
            <h4 className={styles.featureTitle}>Comunicação</h4>
            <p className={styles.featureDescription}>Conecte escola e família</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <span>📈</span>
            </div>
            <h4 className={styles.featureTitle}>Acompanhamento</h4>
            <p className={styles.featureDescription}>Progresso pedagógico dos alunos</p>
          </div>
        </div>
      </div>

      {/* Botão Voltar ao Topo */}
      <button onClick={scrollToTop} className={styles.scrollTopButton}>
        <span>↑</span>
      </button>
    </div>
  );
}
