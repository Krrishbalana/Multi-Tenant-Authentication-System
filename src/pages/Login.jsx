import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = ({ toggleForm }) => {
  const { login } = useAuth();

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
    <div className="flex justify-center items-center min-h-screen  font-sans text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-100 p-8 rounded-xl shadow-md w-96 space-y-6 mt-6 shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p className="bg-red-600 text-red-100 px-4 py-2 rounded text-sm">
            {error}
          </p>
        )}

        <div>
          <label className="block font-semibold mb-1" htmlFor="tenantId">
            Tenant ID
          </label>
          <input
            id="tenantId"
            type="text"
            placeholder="Enter Tenant ID"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black 
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 
                       transition duration-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black 
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 
                       transition duration-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black 
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 
                       transition duration-500"
            required
          />
        </div>

        {/* Animated Submit Button */}
        <button
          type="submit"
          className="relative w-full bg-gray-500 text-black rounded-xl px-6 py-2 overflow-hidden 
                     group transition duration-500 hover:bg-gray-600 focus:outline-none"
        >
          <span className="relative z-10 font-semibold transition-colors duration-500 group-hover:text-white">
            Login
          </span>

          <div className="absolute inset-0 bg-black flex items-center justify-start transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
            <svg
              className="w-6 h-6 ml-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={toggleForm}
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
