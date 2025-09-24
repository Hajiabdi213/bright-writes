import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Swal from "sweetalert2";

function Login() {
  const { axios, setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", { email, password });

      if (data.success) {
        // ✅ Token kaydi
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        Swal.fire({
          icon: "success",
          title: "✅ Login Successful!",
          text: "Welcome back, Admin!",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/admin/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "❌ Login Failed",
          text: data.message || "Invalid credentials, please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50/40 px-4">
      <div className="w-full max-w-sm p-8 border border-green-200 shadow-lg rounded-xl bg-white">
        {/* Header */}
        <div className="w-full text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            <span className="text-green-600">Admin</span> Login
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your credentials to access the admin panel
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow hover:scale-105 hover:shadow-md transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Back to Home */}
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
