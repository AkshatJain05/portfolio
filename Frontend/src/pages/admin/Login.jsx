import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/login", form);
      setUser(res.data.user);
      navigate("/admin/dashboard");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

   if(loading){
    return <Loading/>
   }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-xl shadow-lg w-96 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">🔑 Admin Login</h1>
        <input type="email" placeholder="Email" className="p-3 rounded bg-gray-700"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="p-3 rounded bg-gray-700"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded">Login</button>
      </form>
    </div>
  );
}
