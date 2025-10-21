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
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: "#0A1128",
      }}
    >
      {/* Conteúdo principal */}
      <div
        style={{
          flex: 1,
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Lado esquerdo - Conteúdo promocional */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "#0A1128",
            padding: "60px",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          {/* Padrão geométrico sutil */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                linear-gradient(45deg, transparent 25%, rgba(74, 158, 255, 0.05) 25%, rgba(74, 158, 255, 0.05) 50%, transparent 50%, transparent 75%, rgba(74, 158, 255, 0.05) 75%),
                linear-gradient(-45deg, transparent 25%, rgba(74, 158, 255, 0.03) 25%, rgba(74, 158, 255, 0.03) 50%, transparent 50%, transparent 75%, rgba(74, 158, 255, 0.03) 75%)
              `,
              backgroundSize: "20px 20px",
              opacity: 0.3,
            }}
          />

          {/* Texto grande em destaque */}
          <div
            style={{
              textAlign: "left",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <h1
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
                color: "#ffffff",
                margin: "0 0 10px 0",
                lineHeight: "0.9",
              }}
            >
              GESTÃO
            </h1>
            <h1
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
                color: "#ffffff",
                margin: "0 0 10px 0",
                lineHeight: "0.9",
              }}
            >
              DE
            </h1>
            <h1
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
                color: "#ffffff",
                margin: "0 0 30px 0",
                lineHeight: "0.9",
              }}
            >
              ALUNOS.
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#ffffff",
                margin: "0",
                fontWeight: "400",
              }}
            >
              Carteirinha Digital
            </p>
          </div>
        </div>

        {/* Lado direito - Formulário de login */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "#0A1128",
            padding: "60px",
            boxSizing: "border-box",
          }}
        >
          {/* Conteúdo do lado direito */}
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
          >
            {/* Título principal */}
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#ffffff",
                lineHeight: "1.1",
              }}
            >
              EDUON: uma plataforma completa para sua escola
            </h2>

            {/* Descrição */}
            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "40px",
                color: "#ffffff",
                lineHeight: "1.4",
              }}
            >
              Gestão de alunos, acompanhamento pedagógico e relatórios em tempo real. Transforme a educação com tecnologia.
            </p>

            {/* Formulário de login */}
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
            </form>

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
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                EDUCAÇÃO
              </span>
              <div
                style={{
                  width: "40px",
                  height: "3px",
                  backgroundColor: "#4A9EFF",
                  borderRadius: "2px",
                }}
              />
              <span
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                DIGITAL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Apps - Inspirada no BTG Pactual */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "200px",
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
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            EDUON Mobile
          </h3>
          <p
            style={{
              fontSize: "1rem",
              color: "#ffffff",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Baixe o app para gestão educacional
          </p>
          
          {/* Botões de download */}
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
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
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            EDUON Web
          </h3>
          <p
            style={{
              fontSize: "1rem",
              color: "#ffffff",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Acesse a plataforma web completa
          </p>

          {/* Botão de acesso */}
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
    </div>
  );
}