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
        {/* Lado esquerdo - Imagem */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            height: "100%",
          }}
        >
          <img
            src="/images/eduonback.png"
            alt="Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Lado direito - Conteúdo principal */}
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
      </div>

      {/* Seção de Apps - Inspirada no BTG Pactual */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "300px",
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
            padding: "40px",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "10px",
            }}
          >
            EDUON Mobile
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#ffffff",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Baixe o app para gestão educacional
          </p>
          
          {/* Mockup do smartphone */}
          <div
            style={{
              width: "120px",
              height: "200px",
              backgroundColor: "#000000",
              borderRadius: "20px",
              padding: "10px",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "15px",
                padding: "15px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#4A9EFF",
                  borderRadius: "50%",
                  marginBottom: "10px",
                }}
              />
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#000000",
                  textAlign: "center",
                  marginBottom: "5px",
                }}
              >
                EDUON
              </div>
              <div
                style={{
                  fontSize: "8px",
                  color: "#666666",
                  textAlign: "center",
                }}
              >
                Gestão Educacional
              </div>
            </div>
          </div>

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
            padding: "40px",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "10px",
            }}
          >
            EDUON Web
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#ffffff",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Acesse a plataforma web completa
          </p>
          
          {/* Mockup do desktop */}
          <div
            style={{
              width: "150px",
              height: "120px",
              backgroundColor: "#000000",
              borderRadius: "10px",
              padding: "8px",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "10px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#4A9EFF",
                  borderRadius: "50%",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: "#000000",
                  textAlign: "center",
                  marginBottom: "3px",
                }}
              >
                EDUON
              </div>
              <div
                style={{
                  fontSize: "7px",
                  color: "#666666",
                  textAlign: "center",
                }}
              >
                Plataforma Web
              </div>
            </div>
          </div>

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

      {/* Barra branca no rodapé com login */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px 40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Informações da empresa */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#4A9EFF",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                E
              </span>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#000000",
                  margin: "0 0 5px 0",
                }}
              >
                EDUON - Gestão Educacional
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666666",
                  margin: "0",
                }}
              >
                Transformando a educação através da tecnologia
              </p>
            </div>
          </div>

          {/* Formulário de login */}
          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                height: "40px",
                padding: "0 12px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderRadius: "6px",
                color: "#000000",
                outline: "none",
                boxSizing: "border-box",
                fontSize: "14px",
                width: "150px",
              }}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                height: "40px",
                padding: "0 12px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderRadius: "6px",
                color: "#000000",
                outline: "none",
                boxSizing: "border-box",
                fontSize: "14px",
                width: "150px",
              }}
            />
            <button
              type="submit"
              style={{
                height: "40px",
                padding: "0 20px",
                backgroundColor: "#4A9EFF",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3B8BFF")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4A9EFF")}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}