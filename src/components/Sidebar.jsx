export default function Sidebar({ tab, setTab }) {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">EDUON</h2>
      <button
        onClick={() => setTab("alunos")}
        className={`p-4 text-left hover:bg-gray-700 ${
          tab === "alunos" ? "bg-gray-700" : ""
        }`}
      >
        Alunos
      </button>
      <button
        onClick={() => setTab("funcionarios")}
        className={`p-4 text-left hover:bg-gray-700 ${
          tab === "funcionarios" ? "bg-gray-700" : ""
        }`}
      >
        Funcionários
      </button>
      <button
        onClick={() => setTab("escola")}
        className={`p-4 text-left hover:bg-gray-700 ${
          tab === "escola" ? "bg-gray-700" : ""
        }`}
      >
        Escola
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="mt-auto p-4 bg-red-600 hover:bg-red-700"
      >
        Sair
      </button>
    </div>
  );
}
