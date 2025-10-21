import { useState, useRef } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login inválido");
    }
  };

  const scrollToTop = () => {
    if (containerRef.current && typeof containerRef.current.scrollTo === "function") {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflowY: "auto",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: "#0A1128", // mantém o fundo geral escuro por trás das seções
      }}
    >
      {/* Área do topo: agora com fundo branco onde o formulário fica destacado */}
      <div
        style={{
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: "#ffffff", // fundo branco da área de login (invertido)
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "flex-end", // posiciona o conteúdo à direita
            alignItems: "flex-start",
          }}
        >
          {/* Cartão de login em azul, menor (escala reduzida) e alinhado ao canto direito */}
          <div
            style={{
              width: "360px", // escala menor
              transform: "scale(0.95)",
              transformOrigin: "top right",
              backgroundColor: "#0A66FF", // formulário em azul
              color: "#ffffff",
              borderRadius: "14px",
              padding: "24px",
              boxShadow: "0 8px 30px rgba(10, 17, 40, 0.25)",
              boxSizing: "border-box",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>Entrar na EDUON</h2>
            <p style={{ marginTop: 8, marginBottom: 18, fontSize: "0.95rem", color: "rgba(255,255,255,0.85)" }}>
              Gestão de alunos e carteirinha digital
            </p>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "12px" }}>
                <input
                  type="text"
                  placeholder="Usuário ou email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: "100%",
                    height: "44px",
                    padding: "0 12px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "10px",
                    color: "#ffffff",
                    outline: "none",
                    boxSizing: "border-box",
                    fontSize: "14px",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.4)";
                    e.target.style.backgroundColor = "rgba(255,255,255,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.15)";
                    e.target.style.backgroundColor = "rgba(255,255,255,0.08)";
                  }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    height: "44px",
                    padding: "0 12px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "10px",
                    color: "#ffffff",
                    outline: "none",
                    boxSizing: "border-box",
                    fontSize: "14px",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.4)";
                    e.target.style.backgroundColor = "rgba(255,255,255,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.15)";
                    e.target.style.backgroundColor = "rgba(255,255,255,0.08)";
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  height: "44px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  backgroundColor: "#003DBA", // tom mais escuro para botão dentro do cartão azul
                  color: "#ffffff",
                  boxSizing: "border-box",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#0031a0";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#003DBA";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Entrar
              </button>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 13 }}>
                <a
                  href="#"
                  style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}
                  onMouseOver={(e) => (e.target.style.color = "#ffffff")}
                  onMouseOut={(e) => (e.target.style.color = "rgba(255,255,255,0.85)")}
                >
                  Esqueci minha senha
                </a>
                <a
                  href="#"
                  style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                  onMouseOver={(e) => (e.target.style.color = "#ffffff")}
                  onMouseOut={(e) => (e.target.style.color = "rgba(255,255,255,0.7)")}
                >
                  Ajuda
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Seções de apps e ícones abaixo (mantive como estavam) */}
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "200px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: "#1E3A8A",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
            boxSizing: "border-box",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ffffff", marginBottom: "8px" }}>
            EDUON Mobile
          </h3>
          <p style={{ fontSize: "1rem", color: "#ffffff", marginBottom: "20px", textAlign: "center" }}>
            Baixe o app para gestão educacional
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              📱 App Store
            </button>
            <button
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              🤖 Google Play
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "250px",
          backgroundColor: "#0A1128",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Ícones - mantidos */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#4A9EFF",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
              boxShadow: "0 4px 12px rgba(74, 158, 255, 0.3)",
            }}>
              <span style={{ fontSize: "32px" }}>👥</span>
            </div>
            <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: "0 0 5px 0" }}>Gestão de Alunos</h4>
            <p style={{ fontSize: "12px", color: "#94A3B8", margin: "0", maxWidth: "120px" }}>Controle completo dos estudantes</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#4A9EFF",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
              boxShadow: "0 4px 12px rgba(74, 158, 255, 0.3)",
            }}>
              <span style={{ fontSize: "32px" }}>📊</span>
            </div>
            <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: "0 0 5px 0" }}>Relatórios</h4>
            <p style={{ fontSize: "12px", color: "#94A3B8", margin: "0", maxWidth: "120px" }}>Análises e dados em tempo real</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#4A9EFF",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
              boxShadow: "0 4px 12px rgba(74, 158, 255, 0.3)",
            }}>
              <span style={{ fontSize: "32px" }}>🎫</span>
            </div>
            <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: "0 0 5px 0" }}>Carteirinha Digital</h4>
            <p style={{ fontSize: "12px", color: "#94A3B8", margin: "0", maxWidth: "120px" }}>Identificação digital dos alunos</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#4A9EFF",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
              boxShadow: "0 4px 12px rgba(74, 158, 255, 0.3)",
            }}>
              <span style={{ fontSize: "32px" }}>💬</span>
            </div>
            <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: "0 0 5px 0" }}>Comunicação</h4>
            <p style={{ fontSize: "12px", color: "#94A3B8", margin: "0", maxWidth: "120px" }}>Conecte escola e família</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#4A9EFF",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
              boxShadow: "0 4px 12px rgba(74, 158, 255, 0.3)",
            }}>
              <span style={{ fontSize: "32px" }}>📈</span>
            </div>
            <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: "0 0 5px 0" }}>Acompanhamento</h4>
            <p style={{ fontSize: "12px", color: "#94A3B8", margin: "0", maxWidth: "120px" }}>Progresso pedagógico dos alunos</p>
          </div>
        </div>
      </div>

      {/* Botão Voltar ao Topo */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "50px",
          height: "50px",
          backgroundColor: "#64748B",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          transition: "all 0.2s ease",
          zIndex: 1000,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#475569";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#64748B";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: "bold" }}>↑</span>
      </button>
    </div>
  );
}
