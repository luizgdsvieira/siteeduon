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
        backgroundColor: "#0A1128",
      }}
    >
      {/* =========  PRIMEIRA SEÇÃO (reduzida)  ========= */}
      <div
        style={{
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: "#ffffff", // área branca
          height: "180px", // altura reduzida conforme pedido
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          {/* Lado esquerdo: texto EDUON em preto */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <h1
              style={{
                margin: 0,
                color: "#000000",
                fontSize: "2.25rem",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              EDUON
            </h1>
          </div>

          {/* Lado direito: cartão de login (menor) */}
          <div
            style={{
              width: "420px",
              transform: "scale(0.95)",
              transformOrigin: "top right",
              backgroundColor: "#0A1128",
              color: "#ffffff",
              borderRadius: "14px",
              padding: "16px",
              boxShadow: "0 8px 30px rgba(10, 17, 40, 0.25)",
              boxSizing: "border-box",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>Entrar na EDUON</h2>
            <p style={{ marginTop: 6, marginBottom: 10, fontSize: "0.85rem", color: "rgba(255,255,255,0.85)" }}>
              Gestão de alunos e carteirinha digital
            </p>

            {/* FORM: agora os campos ficam em linha (email | senha | botão) */}
            <form onSubmit={handleLogin}>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                {/* Email (expande) */}
                <input
                  type="text"
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    flex: 1,
                    height: "40px",
                    padding: "0 10px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.35)";
                    e.target.style.backgroundColor = "rgba(255,255,255,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.12)";
                    e.target.style.backgroundColor = "rgba(255,255,255,0.08)";
                  }}
                />

                {/* Senha (tamanho fixo) */}
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "150px",
                    height: "40px",
                    padding: "0 10px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    outline: "none",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.35)";
                    e.target.style.backgroundColor = "rgba(255,255,255,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.12)";
                    e.target.style.backgroundColor = "rgba(255,255,255,0.08)";
                  }}
                />

                {/* Botão Entrar (ao lado) */}
                <button
                  type="submit"
                  style={{
                    width: "110px",
                    height: "40px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: "600",
                    backgroundColor: "#003DBA",
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
              </div>

              {/* Links menores abaixo (opcional) */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12 }}>
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

      {/* =========  SEGUNDA SEÇÃO (altura aumentada)  ========= */}
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "420px", // aumentei a altura da segunda seção
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
            padding: "40px",
            boxSizing: "border-box",
          }}
        >
          <h3 style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#ffffff", marginBottom: "12px" }}>
            EDUON Mobile
          </h3>
          <p style={{ fontSize: "1.05rem", color: "#ffffff", marginBottom: "24px", textAlign: "center" }}>
            Baixe o app para gestão educacional
          </p>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "none",
                borderRadius: "10px",
                padding: "10px 18px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              📱 App Store
            </button>
            <button
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "none",
                borderRadius: "10px",
                padding: "10px 18px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              🤖 Google Play
            </button>
          </div>
        </div>
      </div>

      {/* =========  TERCEIRA SEÇÃO - ícones (mantive igual)  ========= */}
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
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#4A9EFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "15px",
                boxShadow: "0 4px 12px rgba(74, 158, 255, 0.3)",
              }}
            >
              <span style={{ fontSize: "32px" }}>👥</span>
            </div>
            <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: "0 0 5px 0" }}>
              Gestão de Alunos
            </h4>
            <p style={{ fontSize: "12px", color: "#94A3B8", margin: "0", maxWidth: "120px" }}>
              Controle completo dos estudantes
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#4A9EFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "15px",
                boxShadow: "0 4px 12px rgba(74, 158, 255, 0.3)",
              }}
            >
              <span style={{ fontSize: "32px" }}>📊</span>
            </div>
            <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: "0 0 5px 0" }}>
              Relatórios
            </h4>
            <p style={{ fontSize: "12px", color: "#94A3B8", margin: "0", maxWidth: "120px" }}>Análises e dados em tempo real</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#4A9EFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "15px",
                boxShadow: "0 4px 12px rgba(74, 158, 255, 0.3)",
              }}
            >
              <span style={{ fontSize: "32px" }}>🎫</span>
            </div>
            <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: "0 0 5px 0" }}>
              Carteirinha Digital
            </h4>
            <p style={{ fontSize: "12px", color: "#94A3B8", margin: "0", maxWidth: "120px" }}>Identificação digital dos alunos</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#4A9EFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "15px",
                boxShadow: "0 4px 12px rgba(74, 158, 255, 0.3)",
              }}
            >
              <span style={{ fontSize: "32px" }}>💬</span>
            </div>
            <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: "0 0 5px 0" }}>
              Comunicação
            </h4>
            <p style={{ fontSize: "12px", color: "#94A3B8", margin: "0", maxWidth: "120px" }}>Conecte escola e família</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#4A9EFF",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "15px",
                boxShadow: "0 4px 12px rgba(74, 158, 255, 0.3)",
              }}
            >
              <span style={{ fontSize: "32px" }}>📈</span>
            </div>
            <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", margin: "0 0 5px 0" }}>
              Acompanhamento
            </h4>
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
