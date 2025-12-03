import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    matricula: "",
    ano: "",
    turma: "",
    turno: "",
    nascimento: "",
  });
  const [cadastroInfo, setCadastroInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [alunoParaDeletar, setAlunoParaDeletar] = useState(null);
  const [deletando, setDeletando] = useState(false);

  // Buscar alunos cadastrados
  const fetchAlunos = async () => {
    try {
      const res = await api.get("/alunos");
      setAlunos(res.data || []);
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
      setAlunos([]);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Converter nome para name (formato esperado pelo backend)
      const alunoData = {
        ...form,
        name: form.nome, // Adiciona 'name' com o valor de 'nome'
      };
      delete alunoData.nome; // Remove 'nome' para evitar confusão
      
      console.log('📤 Enviando dados:', alunoData);
      
      const response = await api.post("/alunos", alunoData);
      console.log('✅ Resposta do servidor:', response);
      console.log('✅ Status:', response.status);
      console.log('✅ Dados:', response.data);
      
      if (response.status === 201 || response.status === 200) {
        // Verificar se foram gerados QR Code e/ou credenciais
        const responseData = response.data;
        
        if (responseData.credenciais || responseData.qrImage || responseData.geracao) {
          setCadastroInfo({
            aluno: responseData.aluno,
            credenciais: responseData.credenciais,
            qrImage: responseData.qrImage,
            geracao: responseData.geracao
          });
        } else {
          alert("Aluno cadastrado com sucesso!");
        }
        
        setForm({ nome: "", matricula: "", ano: "", turma: "", turno: "", nascimento: "" });
        fetchAlunos();
      }
    } catch (err) {
      console.error("❌ Erro ao cadastrar aluno:", err);
      console.error("📋 Detalhes do erro:", err.response?.data);
      
      // Mensagem de erro mais detalhada
      let errorMessage = "Erro ao cadastrar aluno";
      
      if (err.response?.data) {
        const errorData = err.response.data;
        errorMessage = errorData.details || errorData.error || errorMessage;
        
        if (errorData.hint) {
          errorMessage += `\n\nDica: ${errorData.hint}`;
        }
        
        if (errorData.code) {
          errorMessage += `\nCódigo: ${errorData.code}`;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert(errorMessage);
    }
  };

  // Função para deletar aluno
  const handleDeleteAluno = async (alunoId) => {
    setDeletando(true);
    try {
      const response = await api.delete(`/alunos/${alunoId}`);
      console.log('✅ Aluno deletado com sucesso:', response.data);
      alert("Aluno deletado com sucesso!");
      setAlunoParaDeletar(null);
      fetchAlunos(); // Atualizar lista
    } catch (err) {
      console.error("❌ Erro ao deletar aluno:", err);
      const errorMessage = err.response?.data?.error || err.response?.data?.details || err.message;
      alert("Erro ao deletar aluno: " + errorMessage);
    } finally {
      setDeletando(false);
    }
  };

  // Filtrar alunos baseado no termo de pesquisa
  const filteredAlunos = alunos.filter((aluno) => {
    const searchLower = searchTerm.toLowerCase();
    const nome = (aluno.name || aluno.nome || "").toLowerCase();
    const matricula = (aluno.matricula || "").toLowerCase();
    const ano = (aluno.ano || "").toLowerCase();
    const turma = (aluno.turma || "").toLowerCase();
    const turno = (aluno.turno || "").toLowerCase();
    
    return (
      nome.includes(searchLower) ||
      matricula.includes(searchLower) ||
      ano.includes(searchLower) ||
      turma.includes(searchLower) ||
      turno.includes(searchLower)
    );
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Cadastro de Alunos</h1>

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
            placeholder="Matrícula"
            value={form.matricula}
            onChange={(e) => setForm({ ...form, matricula: e.target.value })}
            className="p-2 border"
            required
          />
          <input
            type="text"
            placeholder="Ano"
            value={form.ano}
            onChange={(e) => setForm({ ...form, ano: e.target.value })}
            className="p-2 border"
          />
          <input
            type="text"
            placeholder="Turma"
            value={form.turma}
            onChange={(e) => setForm({ ...form, turma: e.target.value })}
            className="p-2 border"
          />
          <input
            type="text"
            placeholder="Turno"
            value={form.turno}
            onChange={(e) => setForm({ ...form, turno: e.target.value })}
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
          Cadastrar Aluno
        </button>
      </form>

      {/* Modal com informações do cadastro (QR Code e Credenciais) */}
      {cadastroInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-green-600">✅ Aluno cadastrado com sucesso!</h2>
            
            {/* Status da geração */}
            {cadastroInfo.geracao && (
              <div className="mb-4 p-3 bg-gray-50">
                <h3 className="font-semibold mb-2">Status da Geração:</h3>
                <p className="text-sm">
                  <strong>QR Code:</strong> {cadastroInfo.geracao.qrCode}
                </p>
                <p className="text-sm">
                  <strong>Login:</strong> {cadastroInfo.geracao.login}
                </p>
              </div>
            )}

            {/* Credenciais de Login */}
            {cadastroInfo.credenciais && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Credenciais de Login:</h3>
                <div className="bg-gray-100 p-3">
                  <p><strong>Usuário:</strong> {cadastroInfo.credenciais.username}</p>
                  <p><strong>Senha:</strong> {cadastroInfo.credenciais.password}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    ⚠️ Anote essas credenciais para informar ao aluno
                  </p>
                </div>
              </div>
            )}

            {/* QR Code */}
            {cadastroInfo.qrImage && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">QR Code Gerado:</h3>
                <div className="flex justify-center">
                  <img 
                    src={cadastroInfo.qrImage} 
                    alt="QR Code do Aluno" 
                    className="border-2 border-gray-300 max-w-full"
                  />
                </div>
              </div>
            )}

            {/* Aviso se nada foi gerado */}
            {!cadastroInfo.credenciais && !cadastroInfo.qrImage && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  ⚠️ O aluno foi cadastrado, mas não foi possível gerar automaticamente o QR Code e/ou as credenciais de login.
                </p>
              </div>
            )}

            <button
              onClick={() => setCadastroInfo(null)}
              className="w-full bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {alunoParaDeletar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 shadow-lg max-w-md w-full mx-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-red-600">⚠️ Confirmar Exclusão</h2>
            <p className="mb-4 text-gray-700">
              Tem certeza que deseja excluir o aluno <strong>{alunoParaDeletar.name || alunoParaDeletar.nome}</strong>?
            </p>
            {alunoParaDeletar.matricula && (
              <p className="mb-4 text-sm text-gray-600">
                Matrícula: {alunoParaDeletar.matricula}
              </p>
            )}
            <p className="mb-6 text-sm text-red-600 font-medium">
              ⚠️ Esta ação não pode ser desfeita!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setAlunoParaDeletar(null)}
                disabled={deletando}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors font-medium disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteAluno(alunoParaDeletar.id)}
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
        <h2 className="text-lg font-bold mb-4">Alunos Cadastrados</h2>
        
        {/* Barra de Pesquisa */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Pesquisar por nome, matrícula, ano, turma ou turno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title="Limpar pesquisa"
              >
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-600">
              {filteredAlunos.length === 0
                ? "Nenhum aluno encontrado."
                : `${filteredAlunos.length} aluno(s) encontrado(s).`}
            </p>
          )}
        </div>

        {/* Lista de Alunos */}
        <ul className="space-y-2">
        {alunos.length === 0 ? (
            <li className="text-gray-500 p-4 text-center">Nenhum aluno cadastrado ainda.</li>
          ) : filteredAlunos.length === 0 && searchTerm ? (
            <li className="text-gray-500 p-4 text-center">
              Nenhum aluno encontrado com o termo "{searchTerm}".
            </li>
          ) : (
            filteredAlunos.map((a) => (
              <li 
                key={a.id} 
                className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800">{a.name || a.nome}</span>
                      <span className="text-gray-600 ml-2">— Matrícula: {a.matricula || 'N/A'}</span>
                    </div>
                    {(a.ano || a.turma || a.turno) && (
                      <div className="text-sm text-gray-500 mt-1">
                        {a.ano && <span className="mr-2">Ano: {a.ano}</span>}
                        {a.turma && <span className="mr-2">Turma: {a.turma}</span>}
                        {a.turno && <span>Turno: {a.turno}</span>}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setAlunoParaDeletar(a)}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
                    title="Excluir aluno"
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </li>
          ))
        )}
      </ul>
      </div>
    </div>
  );
}


/*
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    api.get("/alunos").then((res) => setAlunos(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Alunos</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Matrícula</th>
            <th className="p-2 border">Ano</th>
            <th className="p-2 border">Turma</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((a) => (
            <tr key={a.id} className="border">
              <td className="p-2 border">{a.nome}</td>
              <td className="p-2 border">{a.matricula}</td>
              <td className="p-2 border">{a.ano}</td>
              <td className="p-2 border">{a.turma}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
*/