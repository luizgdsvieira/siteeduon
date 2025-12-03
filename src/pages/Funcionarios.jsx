import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [form, setForm] = useState({ nome: "", cargo: "", nascimento: "" });
  const [funcionarioParaDeletar, setFuncionarioParaDeletar] = useState(null);
  const [deletando, setDeletando] = useState(false);
  
  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  });

  const fetchFuncionarios = async (page = 1) => {
    try {
      const res = await api.get(`/funcionarios?page=${page}&limit=50`);
      // Verificar se a resposta tem estrutura paginada ou é array direto (compatibilidade)
      if (res.data && res.data.data) {
        setFuncionarios(res.data.data || []);
        setPagination(res.data.pagination || pagination);
      } else {
        // Fallback para resposta antiga (array direto)
        setFuncionarios(res.data || []);
      }
    } catch (err) {
      console.error("Erro ao buscar funcionários:", err);
      setFuncionarios([]);
    }
  };

  useEffect(() => {
    fetchFuncionarios(currentPage);
  }, [currentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Converter nome para name (formato esperado pelo backend)
      const funcionarioData = {
        ...form,
        name: form.nome, // Adiciona 'name' com o valor de 'nome'
      };
      delete funcionarioData.nome; // Remove 'nome' para evitar confusão
      
      const response = await api.post("/funcionarios", funcionarioData);
      console.log('✅ Resposta do servidor:', response);
      console.log('✅ Status:', response.status);
      console.log('✅ Dados:', response.data);
      
      // Verificar se a resposta foi bem-sucedida
      if (response.status === 201 || response.status === 200) {
        alert("Funcionário cadastrado com sucesso!");
        setForm({ nome: "", cargo: "", nascimento: "" });
        fetchFuncionarios(currentPage);
      }
    } catch (err) {
      console.error("Erro ao cadastrar funcionário:", err);
      alert("Erro ao cadastrar funcionário: " + (err.response?.data?.error || err.message));
    }
  };

  // Função para deletar funcionário
  const handleDeleteFuncionario = async (funcionarioId) => {
    setDeletando(true);
    try {
      const response = await api.delete(`/funcionarios/${funcionarioId}`);
      console.log('✅ Funcionário deletado com sucesso:', response.data);
      alert("Funcionário deletado com sucesso!");
      setFuncionarioParaDeletar(null);
      fetchFuncionarios(currentPage); // Atualizar lista
    } catch (err) {
      console.error("❌ Erro ao deletar funcionário:", err);
      const errorMessage = err.response?.data?.error || err.response?.data?.details || err.message;
      alert("Erro ao deletar funcionário: " + errorMessage);
    } finally {
      setDeletando(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Cadastro de Funcionários</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="p-2 border"
            required
          />
          <input
            type="text"
            placeholder="Cargo"
            value={form.cargo}
            onChange={(e) => setForm({ ...form, cargo: e.target.value })}
            className="p-2 border"
          />
          <input
            type="date"
            placeholder="Nascimento"
            value={form.nascimento}
            onChange={(e) => setForm({ ...form, nascimento: e.target.value })}
            className="p-2 border"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">
          Cadastrar Funcionário
        </button>
      </form>

      {/* Modal de Confirmação de Exclusão */}
      {funcionarioParaDeletar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 shadow-lg max-w-md w-full mx-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-red-600">⚠️ Confirmar Exclusão</h2>
            <p className="mb-4 text-gray-700">
              Tem certeza que deseja excluir o funcionário <strong>{funcionarioParaDeletar.name || funcionarioParaDeletar.nome}</strong>?
            </p>
            {funcionarioParaDeletar.cargo && (
              <p className="mb-4 text-sm text-gray-600">
                Cargo: {funcionarioParaDeletar.cargo}
              </p>
            )}
            <p className="mb-6 text-sm text-red-600 font-medium">
              ⚠️ Esta ação não pode ser desfeita!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setFuncionarioParaDeletar(null)}
                disabled={deletando}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors font-medium disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteFuncionario(funcionarioParaDeletar.id)}
                disabled={deletando}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
              >
                {deletando ? "Excluindo..." : "Sim, Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-4 shadow mb-6">
        <h2 className="text-lg font-bold mb-4">Funcionários Cadastrados</h2>
        <ul className="space-y-2">
          {funcionarios.length === 0 ? (
            <li className="text-gray-500 p-4 text-center">Nenhum funcionário cadastrado ainda.</li>
          ) : (
            funcionarios.map((f) => (
              <li 
                key={f.id}
                className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800">{f.name || f.nome}</span>
                      <span className="text-gray-600 ml-2">— Cargo: {f.cargo || 'N/A'}</span>
                    </div>
                    {f.nascimento && (
                      <div className="text-sm text-gray-500 mt-1">
                        Nascimento: {new Date(f.nascimento).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setFuncionarioParaDeletar(f)}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
                    title="Excluir funcionário"
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        
        {/* Controles de Paginação */}
        {pagination.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between bg-white p-4 shadow rounded-lg">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newPage = currentPage - 1;
                  if (newPage >= 1) {
                    setCurrentPage(newPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                disabled={!pagination.hasPrevPage || currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                ← Anterior
              </button>
              
              <span className="px-4 py-2 text-gray-700">
                Página {currentPage} de {pagination.totalPages}
              </span>
              
              <button
                onClick={() => {
                  const newPage = currentPage + 1;
                  if (newPage <= pagination.totalPages) {
                    setCurrentPage(newPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                disabled={!pagination.hasNextPage || currentPage === pagination.totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Próxima →
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              Total: {pagination.total} funcionário(s)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



/*
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    // Busca todos os funcionários da escola logada
    api.get("/funcionarios")
      .then((res) => setFuncionarios(res.data))
      .catch((err) => console.error("Erro ao buscar funcionários:", err));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Funcionários</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Cargo</th>
            <th className="p-2 border">Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((f) => (
            <tr key={f.id} className="border">
              <td className="p-2 border">{f.name}</td>
              <td className="p-2 border">{f.cargo}</td>
              <td className="p-2 border">{new Date(f.nascimento).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
*/