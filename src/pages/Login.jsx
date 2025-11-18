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
      console.log("🔐 Tentando login com:", { username, password });
      console.log("🌍 Ambiente:", import.meta.env.DEV ? "Desenvolvimento" : "Produção");
      console.log("📡 URL da API:", api.defaults.baseURL);
      
      const res = await api.post("/auth/login", { username, password });
      console.log("✅ Login bem-sucedido:", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Erro no login:", err);
      console.error("❌ Resposta do servidor:", err.response?.data);
      console.error("❌ Status:", err.response?.status);
      console.error("❌ URL completa tentada:", err.config?.baseURL + err.config?.url);
      console.error("❌ Tipo de erro:", err.code || 'UNKNOWN');
      
      let errorMessage = "Erro ao fazer login";
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = "Tempo de conexão esgotado. Verifique sua internet.";
      } else if (err.code === 'ERR_NETWORK' || !err.response) {
        errorMessage = "Erro de conexão. Verifique se a API está online.";
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

  const HEADER_HEIGHT = 120; // mantenha consistente com styles abaixo

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
      {/* =========  PRIMEIRA SEÇÃO (FIXA NO TOPO)  ========= */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: `${HEADER_HEIGHT}px`,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          zIndex: 1200,
          borderBottom: "1px solid rgba(10,17,40,0.06)",
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
                margin: 5,
                color: "rgba(10, 17, 40)",
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
              width: "480px",
              height: "120px",
              transform: "scale(0.92)",
              transformOrigin: "top right",
              backgroundColor: "#0A1128",
              color: "#ffffff",
              borderRadius: "8px",
              padding: "10px 10px 10px 10px", // mais espaço no topo
              marginTop: "10px",
              boxShadow: "0 8px 30px rgba(10, 17, 40, 0.25)",
              boxSizing: "border-box",
            }}
          >
            <h2 style={{ marginBottom: 6, fontSize: "1rem", fontWeight: 700 }}>Login</h2>
            

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
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* =========  NOVA SEÇÃO - Professor e chamada (abaixo da seção fixa)  ========= */}
      <div
        style={{
          marginTop: `${HEADER_HEIGHT}px`, // desloca conteúdo para baixo do header fixo
          display: "flex",
          width: "100%",
          minHeight: "580px",
          boxSizing: "border-box",
          background:
            "linear-gradient(135deg, #1E3A8A 0%, #0A66FF 40%, #4A9EFF 100%)",
          padding: "60px 40px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "1200px",
            alignItems: "center",
            gap: "60px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Imagem do professor */}
          <div
            style={{
              flex: "0 0 600px",
              maxWidth: "600px",
              minWidth: "380px",
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
            }}
          >
            <img
              src="/images/professor1.jpg"
              alt="Professor"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "20px",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Texto da chamada */}
          <div
            style={{
              flex: "1 1 400px",
              minWidth: "280px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "#rgba(10, 17, 40)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: "bold",
                // color: "#011029",
                color: "#ffffff",
                marginBottom: "20px",
                lineHeight: "1.2",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              Quer dar um novo passo na gestão da sua escola?
            </h2>
            <p
              style={{
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                fontWeight: "600",
                // color: "#011029",
                color: "#ffffff",
                marginTop: "10px",
                opacity: 0.95,
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              Conheça a Eduon. Gestão de alunos e carteirinha digital.
            </p>
          </div>
        </div>
      </div>

      {/* =========  SEGUNDA SEÇÃO (com margem-top para não ficar abaixo do header fixo)  ========= */}
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "580px", // aumentei ainda mais para destacar
          boxSizing: "border-box",
          // degradê de fundo solicitado
          background:"#ffffff",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
            boxSizing: "border-box",
            color: "#ffffff",
          }}
        >
          <h3 style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#011029", marginBottom: "12px" }}>
            EDUON Mobile
          </h3>

          {/* imagem exemplo (se existir no public): */}
          <div style={{ width: "320px", maxWidth: "90%", marginBottom: 12 }}>
            <img src="/images/celular.png" alt="EDUON Mobile" style={{ width: "100%", borderRadius: 12 }} />
          </div>

          <p style={{ fontSize: "1.05rem", color: "#011029", marginBottom: "24px", textAlign: "center" }}>
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
                boxShadow: "0 4px 12px rgba(74, 158, 255, 0.3)",
                gap: "8px",
              }}
            >
              <image><img src="/images/logoplay.png" alt="Play Store" style={{ width: "25px", height: "25px" }} /></image>
              <p>Disponível em Play Store.</p>

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
          zIndex: 1300,
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
