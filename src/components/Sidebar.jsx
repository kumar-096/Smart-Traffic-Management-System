import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-800 text-white flex flex-col p-6 shadow-2xl">
      <h2 className="text-2xl font-bold mb-10 tracking-wide">🚦 STMS</h2>

      <nav className="flex flex-col space-y-5">
        <button className="text-left hover:bg-indigo-700 px-4 py-2 rounded-lg transition">
          📊 Dashboard
        </button>
        <button className="text-left hover:bg-indigo-700 px-4 py-2 rounded-lg transition">
          📑 Reports
        </button>
        <button className="text-left hover:bg-indigo-700 px-4 py-2 rounded-lg transition">
          ⚙ Settings
        </button>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition"
      >
        🚪 Logout
      </button>
    </div>
  );
}
