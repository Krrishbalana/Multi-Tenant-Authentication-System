import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [tenantId, setTenantId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!tenantId || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login({ tenantId, email, password });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-md w-96 text-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">
          Login
        </h2>

        {error && (
          <p className="bg-red-600 text-red-100 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-300 mb-1">Tenant ID</p>
          <input
            type="text"
            placeholder="Enter Tenant ID"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-300 mb-1">Email</p>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-300 mb-1">Password</p>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg transition-colors">
          Login
        </button>

        <div className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <span
            className="text-cyan-400 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
