import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white px-6 py-3">
      <h1 className="text-lg font-bold">EDUON</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
      >
        Sair
      </button>
    </nav>
  );
}
