import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Swal from "sweetalert2";

function maskEmail(email) {
  if (!email) return "";
  // try to keep first 2 chars and domain, mask the middle
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  const name = parts[0];
  const domain = parts[1];
  if (name.length <= 2) return `${name[0]}****@${domain}`;
  return `${name.slice(0, 2)}****@${domain}`;
}

function Login() {
  const { axios, setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hideEmail, setHideEmail] = useState(true); // default: qari emailka
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire("Fadlan", "Geli email iyo password labadaba", "warning");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/admin/login", { email, password });
      if (data?.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        Swal.fire({ icon: "success", title: "Login guuleystay", timer: 1200, showConfirmButton: false });
        navigate("/admin/dashboard");
      } else {
        Swal.fire("Khalad", data.message || "Email/password khalad ah", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message || "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50/30 px-4">
      <div className="w-full max-w-sm p-8 border border-green-200 shadow-lg rounded-xl bg-white">
        <div className="w-full text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            <span className="text-green-600">Admin</span> Login
          </h1>
          <p className="text-gray-500 text-sm mt-1">Enter your credentials to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          {/* Email (mask option) */}
          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-gray-700">Email</label>

          
          <input
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none transition"
                inputMode="email"
                autoComplete="off"
                onBlur={() => setHideEmail(true)} // blur kadib waxay si toos ah u qarin doontaa
              />
            
          </div>

          {/* Password with show/hide */}
          <div className="flex flex-col text-left relative">
            <label className="mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none transition pr-12"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-9 text-sm text-gray-600 px-2 py-1"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>


          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow transition-all duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:scale-105 hover:shadow-md"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-300 transition-all duration-300"
        >
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}

export default Login;
