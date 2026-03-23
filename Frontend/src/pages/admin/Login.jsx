import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

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

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4">
      
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5"
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back! Please login to continue
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="p-3 rounded-lg bg-gray-800/70 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* Password with Eye Toggle */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
              className="w-full p-3 pr-12 rounded-lg bg-gray-800/70 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 p-3 rounded-lg font-semibold text-white"
        >
          Login
        </button>

        {/* Links */}
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          {/* <span className="hover:text-white cursor-pointer">
            Forgot Password?
          </span> */}
          <span
            onClick={() => navigate("/")}
            className="hover:text-white cursor-pointer"
          >
            Back to Home
          </span>
        </div>
      </motion.form>
    </div>
  );
}