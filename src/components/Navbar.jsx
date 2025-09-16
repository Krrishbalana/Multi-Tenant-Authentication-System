import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-gray-200 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* App Name */}
        <div className="text-xl font-bold text-cyan-400">
          <Link to="/">Multi-Tenant App</Link>
        </div>

        {/* Links / Actions */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded hover:bg-gray-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 rounded hover:bg-gray-700 transition-colors"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="px-3 py-1 rounded hover:bg-gray-700 transition-colors"
              >
                Dashboard
              </Link>

              {/* Show Admin link only for admin and superadmin */}
              {(user.role === "admin" || user.role === "superadmin") && (
                <Link
                  to="/admin"
                  className="px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                >
                  Admin
                </Link>
              )}

              {/* Show Superadmin link only for superadmin */}
              {user.role === "superadmin" && (
                <Link
                  to="/superadmin"
                  className="px-3 py-1 rounded hover:bg-gray-700 transition-colors"
                >
                  Super Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white font-semibold transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
