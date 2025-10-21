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
        width: "100%",
        height: "100%",
        overflow: "hidden",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: "#0A1128", // Cor de fundo escura similar ao BTG Pactual
      }}
    >
      {/* Lado esquerdo - Conteúdo principal */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: "60px",
          boxSizing: "border-box",
        }}
      >
        {/* Logo circular inspirado no BTG Pactual */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            border: "2px solid #4A9EFF", // Azul claro similar ao BTG
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#4A9EFF",
            }}
          >
            EDUON
          </span>
        </div>

        {/* Título principal */}
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#ffffff",
            textAlign: "center",
            lineHeight: "1.1",
          }}
        >
          EDUON: uma plataforma completa para sua escola
        </h1>

        {/* Descrição */}
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "40px",
            color: "#ffffff",
            textAlign: "center",
            maxWidth: "500px",
            lineHeight: "1.4",
          }}
        >
          Gestão de alunos, acompanhamento pedagógico e relatórios em tempo real. Transforme a educação com tecnologia.
        </p>

        {/* Elemento visual destacado */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <span
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            EDUCAÇÃO
          </span>
          <div
            style={{
              width: "60px",
              height: "4px",
              backgroundColor: "#4A9EFF",
              borderRadius: "2px",
              transform: "rotate(-15deg)",
            }}
          />
          <span
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            DIGITAL
          </span>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "#0A1128",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "40px",
            boxSizing: "border-box",
          }}
        >
          {/* Cabeçalho do formulário */}
          <div style={{ marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#ffffff",
              }}
            >
              Acesse sua conta
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#94A3B8",
                lineHeight: "1.5",
              }}
            >
              Entre com suas credenciais para acessar o sistema de gestão educacional
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Usuário ou email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  height: "56px",
                  padding: "0 16px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  outline: "none",
                  boxSizing: "border-box",
                  fontSize: "16px",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4A9EFF";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  height: "56px",
                  padding: "0 16px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  outline: "none",
                  boxSizing: "border-box",
                  fontSize: "16px",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4A9EFF";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: "600",
                backgroundColor: "#4A9EFF",
                color: "#ffffff",
                boxSizing: "border-box",
                transition: "all 0.2s ease",
                marginBottom: "20px",
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

            {/* Links auxiliares */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <a
                href="#"
                style={{
                  color: "#4A9EFF",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "color 0.2s ease",
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
                  fontSize: "14px",
                  transition: "color 0.2s ease",
                }}
                onMouseOver={(e) => (e.target.style.color = "#ffffff")}
                onMouseOut={(e) => (e.target.style.color = "#94A3B8")}
              >
                Precisa de ajuda?
              </a>
            </div>

            {/* Footer */}
            <p
              style={{
                color: "#64748B",
                fontSize: "12px",
                textAlign: "center",
                margin: "0",
              }}
            >
              Powered by EDUON - Transformando a educação através da tecnologia
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}