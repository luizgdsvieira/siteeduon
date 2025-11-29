import { useState } from "react";
import Alunos from "./Alunos";
import Funcionarios from "./Funcionarios";
import Escola from "./Escola";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [tab, setTab] = useState("alunos");
  const role = localStorage.getItem("role") || "admin";

  const getRoleIcon = () => {
    if (role === "admin") return "👑";
    if (role === "staff") return "👤";
    return "🎓";
  };

  const getTabTitle = () => {
    if (tab === "alunos") return "👥 Gestão de Alunos";
    if (tab === "funcionarios") return "👨‍💼 Gestão de Funcionários";
    if (tab === "escola") return "🏫 Informações da Escola";
    return "";
  };

  const getTabSubtitle = () => {
    if (tab === "alunos") return "Gerencie os estudantes da instituição";
    if (tab === "funcionarios") return "Administre a equipe de funcionários";
    if (tab === "escola") return "Visualize e edite dados da escola";
    return "";
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Coluna Esquerda - Informações */}
      <div className={styles.sidebar}>
        {/* Header com Logo */}
        <div className={styles.sidebarHeader}>
          <h1 className={styles.sidebarLogo}>
            EDUON
          </h1>
          <p className={styles.sidebarSubtitle}>Sistema de Gestão Escolar</p>
        </div>

        {/* Informações do Usuário */}
        <div className={styles.userInfoSection}>
          <div className={styles.userInfoCard}>
            <div className={styles.userInfoHeader}>
              <div className={styles.userAvatar}>
                {getRoleIcon()}
              </div>
              <div className={styles.userInfoText}>
                <h3 className={styles.userInfoTitle}>Usuário Logado</h3>
                <p className={styles.userInfoRole}>{role}</p>
              </div>
            </div>
            <div className={styles.userInfoDetails}>
              <div className={styles.userInfoRow}>
                <span className={styles.userInfoLabel}>Status:</span>
                <span className={styles.statusOnline}>● Online</span>
              </div>
              <div className={styles.userInfoRow}>
                <span className={styles.userInfoLabel}>Sessão:</span>
                <span className={styles.userInfoValue}>Ativa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação */}
        <div className={styles.navSection}>
          <button
            onClick={() => setTab("alunos")}
            className={`${styles.navButton} ${
              tab === "alunos" ? styles.navButtonActive : styles.navButtonInactive
            }`}
          >
            <div className={styles.navButtonContent}>
              <span className={styles.navButtonIcon}>👥</span>
              <div className={styles.navButtonText}>
                <div className={styles.navButtonTitle}>Alunos</div>
                <div className={styles.navButtonSubtitle}>Gerenciar estudantes</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setTab("funcionarios")}
            className={`${styles.navButton} ${
              tab === "funcionarios" ? styles.navButtonActive : styles.navButtonInactive
            }`}
          >
            <div className={styles.navButtonContent}>
              <span className={styles.navButtonIcon}>👨‍💼</span>
              <div className={styles.navButtonText}>
                <div className={styles.navButtonTitle}>Funcionários</div>
                <div className={styles.navButtonSubtitle}>Gerenciar equipe</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setTab("escola")}
            className={`${styles.navButton} ${
              tab === "escola" ? styles.navButtonActive : styles.navButtonInactive
            }`}
          >
            <div className={styles.navButtonContent}>
              <span className={styles.navButtonIcon}>🏫</span>
              <div className={styles.navButtonText}>
                <div className={styles.navButtonTitle}>Escola</div>
                <div className={styles.navButtonSubtitle}>Informações gerais</div>
              </div>
            </div>
          </button>
        </div>

        {/* Botão de Sair */}
        <div className={styles.logoutSection}>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              window.location.href = "/";
            }}
            className={styles.logoutButton}
          >
            <span style={{ marginRight: "8px" }}>🚪</span>
            Sair do Sistema
          </button>
        </div>
      </div>

      {/* Área de Conteúdo Principal */}
      <div className={styles.mainArea}>
        {/* Header do Conteúdo */}
        <div className={styles.contentHeader}>
          <h2 className={styles.contentTitle}>
            {getTabTitle()}
          </h2>
          <p className={styles.contentSubtitle}>
            {getTabSubtitle()}
          </p>
        </div>

        {/* Conteúdo */}
        <div className={styles.contentArea}>
          <div className={styles.contentWrapper}>
            {tab === "alunos" && <Alunos />}
            {tab === "funcionarios" && <Funcionarios />}
            {tab === "escola" && <Escola />}
          </div>
        </div>
      </div>
    </div>
  );
}

/*
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Alunos from "./Alunos";
import Funcionarios from "./Funcionarios";
import Escola from "./Escola";

export default function Dashboard() {
  const [tab, setTab] = useState("alunos");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar tab={tab} setTab={setTab} />
      <div className="flex-1 p-6 overflow-y-auto">
        {tab === "alunos" && <Alunos />}
        {tab === "funcionarios" && <Funcionarios />}
        {tab === "escola" && <Escola />}
      </div>
    </div>
  );
}
*/



/*
import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    api.get("/alunos").then((res) => setAlunos(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Lista de Alunos</h2>
        <div className="bg-white p-4 shadow">
          {alunos.length === 0 ? (
            <p className="text-gray-600">Nenhum aluno cadastrado.</p>
          ) : (
            <ul className="space-y-2">
              {alunos.map((a) => (
                <li key={a.id} className="border-b py-2">
                  <span className="font-medium">{a.name}</span> —{" "}
                  <span className="text-gray-600">Matrícula: {a.matricula}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

*/