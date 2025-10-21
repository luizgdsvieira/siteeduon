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
      const res = await api.post("auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login inválido");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column", // empilha verticalmente
        width: "100%",
        height: "100%",
        overflowY: "auto", // permitir scroll vertical para ver as seções abaixo
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: "#0A1128",
      }}
    >
      {/* Conteúdo principal (agora empilhado) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column", // coloca o login em cima, promo abaixo (se quiser inverter, mude para "column-reverse")
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Colocar primeiro o bloco do login (aparece em cima) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px 20px",
            boxSizing: "border-box",
            backgroundColor: "#0A1128",
          }}
        >
          <div style={{ width: "100%", maxWidth: "900px", display: "flex", gap: "40px", flexDirection: "column" }}>
            {/* Aqui você pode manter o visual promocional acima ou abaixo do formulário.
                Vou colocar apenas o formulário (login) primeiro. */}
            <div
              style={{
                background: "transparent",
                width: "100%",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  marginBottom: "12px",
                  color: "#ffffff",
                  lineHeight: "1.1",
                }}
              >
                EDUON: uma plataforma completa para sua escola
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  marginBottom: "20px",
                  color: "#ffffff",
                  lineHeight: "1.4",
                }}
              >
                Gestão de alunos, acompanhamento pedagógico e relatórios em tempo real. Transforme a educação com tecnologia.
              </p>

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: "16px" }}>
                  <input
                    type="text"
                    placeholder="Usuário ou email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "0 12px",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "10px",
                      color: "#ffffff",
                      outline: "none",
                      boxSizing: "border-box",
                      fontSize: "15px",
                      transition: "all 0.15s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#4A9EFF";
                      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.12)";
                      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "18px" }}>
                  <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "0 12px",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "10px",
                      color: "#ffffff",
                      outline: "none",
                      boxSizing: "border-box",
                      fontSize: "15px",
                      transition: "all 0.15s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#4A9EFF";
                      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.12)";
                      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    height: "48px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    fontWeight: "600",
                    backgroundColor: "#4A9EFF",
                    color: "#ffffff",
                    boxSizing: "border-box",
                    transition: "all 0.15s ease",
                    marginBottom: "12px",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#3B8BFF";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#4A9EFF";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Entrar na plataforma
                </button>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <a
                    href="#"
                    style={{
                      color: "#4A9EFF",
                      textDecoration: "none",
                      fontSize: "13px",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "#3B8BFF")}
                    onMouseOut={(e) => (e.target.style.color = "#4A9EFF")}
                  >
                    Esqueci minha senha
                  </a>
                  <a
                    href="#"
                    style={{
                      color: "#94A3B8",
                      textDecoration: "none",
                      fontSize: "13px",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "#ffffff")}
                    onMouseOut={(e) => (e.target.style.color = "#94A3B8")}
                  >
                    Precisa de ajuda?
                  </a>
                </div>
              </form>
            </div>

            {/* Promoção/branding (opcional) - fica abaixo do formulário */}
            <div
              style={{
                width: "100%",
                marginTop: "24px",
                backgroundColor: "transparent",
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <div>
                <h1 style={{ fontSize: "2.5rem", margin: 0, color: "#fff", lineHeight: 1 }}>GESTÃO</h1>
                <h1 style={{ fontSize: "2.5rem", margin: 0, color: "#fff", lineHeight: 1 }}>DE</h1>
                <h1 style={{ fontSize: "2.5rem", margin: 0, color: "#fff", lineHeight: 1 }}>ALUNOS.</h1>
                <p style={{ color: "#fff", marginTop: 8 }}>Carteirinha Digital</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Apps - agora visível abaixo do login */}
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "200px",
          boxSizing: "border-box",
        }}
      >
        {/* App Mobile EDUON */}
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

        {/* App Web EDUON */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#0A1128",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
            boxSizing: "border-box",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ffffff", marginBottom: "8px" }}>
            EDUON Web
          </h3>
          <p style={{ fontSize: "1rem", color: "#ffffff", marginBottom: "20px", textAlign: "center" }}>
            Acesse a plataforma web completa
          </p>

          <button
            style={{
              backgroundColor: "#4A9EFF",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Acessar Plataforma
          </button>
        </div>
      </div>

      {/* Nova Seção com Ícones de Aplicativos */}
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
          {/* (Ícones...) */}
          {/* ... reutilizei exatamente os blocos de ícone que você já tinha */}
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
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
