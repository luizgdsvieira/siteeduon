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

      <h2 className="text-lg font-bold mb-2">Alunos Cadastrados</h2>
      <ul>
        {alunos.length === 0 ? (
          <li className="text-gray-500">Nenhum aluno cadastrado ainda.</li>
        ) : (
          alunos.map((a) => (
            <li key={a.id}>{a.name || a.nome} — Matrícula: {a.matricula || 'N/A'}</li>
          ))
        )}
      </ul>
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