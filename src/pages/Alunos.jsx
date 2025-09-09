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

  // Buscar alunos cadastrados
  const fetchAlunos = async () => {
    const res = await api.get("/alunos");
    setAlunos(res.data);
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/alunos", form);
      alert("Aluno cadastrado com sucesso!");
      setForm({ nome: "", matricula: "", ano: "", turma: "", turno: "", nascimento: "" });
      fetchAlunos();
    } catch (err) {
      alert("Erro ao cadastrar aluno");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Cadastro de Alunos</h1>

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
            placeholder="Matrícula"
            value={form.matricula}
            onChange={(e) => setForm({ ...form, matricula: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Ano"
            value={form.ano}
            onChange={(e) => setForm({ ...form, ano: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Turma"
            value={form.turma}
            onChange={(e) => setForm({ ...form, turma: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Turno"
            value={form.turno}
            onChange={(e) => setForm({ ...form, turno: e.target.value })}
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
          Cadastrar Aluno
        </button>
      </form>

      <h2 className="text-lg font-bold mb-2">Alunos Cadastrados</h2>
      <ul>
        {alunos.map((a) => (
          <li key={a.id}>{a.nome} — Matrícula: {a.matricula}</li>
        ))}
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