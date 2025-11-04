import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [form, setForm] = useState({ nome: "", cargo: "", nascimento: "" });

  const fetchFuncionarios = async () => {
    try {
      const res = await api.get("/funcionarios");
      setFuncionarios(res.data || []);
    } catch (err) {
      console.error("Erro ao buscar funcionários:", err);
      setFuncionarios([]);
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

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
        fetchFuncionarios();
      }
    } catch (err) {
      console.error("Erro ao cadastrar funcionário:", err);
      alert("Erro ao cadastrar funcionário: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Cadastro de Funcionários</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Cargo"
            value={form.cargo}
            onChange={(e) => setForm({ ...form, cargo: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="date"
            placeholder="Nascimento"
            value={form.nascimento}
            onChange={(e) => setForm({ ...form, nascimento: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Cadastrar Funcionário
        </button>
      </form>

      <h2 className="text-lg font-bold mb-2">Funcionários Cadastrados</h2>
      <ul>
        {funcionarios.length === 0 ? (
          <li className="text-gray-500">Nenhum funcionário cadastrado ainda.</li>
        ) : (
          funcionarios.map((f) => (
            <li key={f.id}>{f.name || f.nome} — Cargo: {f.cargo || 'N/A'}</li>
          ))
        )}
      </ul>
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