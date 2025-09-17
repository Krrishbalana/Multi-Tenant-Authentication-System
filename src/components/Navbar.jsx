import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Hide Login/Signup links if already on /auth route
  const isAuthPage = location.pathname === "/auth";

  return (
    <nav className="bg-white shadow p-4 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* App Name */}
        <div className="text-2xl font-bold text-black">
          <Link to="/">Multi-Tenant App</Link>
        </div>

        {/* Links / Actions */}
        <div className="flex items-center space-x-6">
          {!user ? (
            !isAuthPage && (
              <>
                <Link
                  to="/auth"
                  className="text-black font-semibold px-4 py-2 rounded-xl transition duration-500 hover:bg-gray-200"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="text-black font-semibold px-4 py-2 rounded-xl transition duration-500 hover:bg-gray-200"
                >
                  Signup
                </Link>
              </>
            )
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-black font-semibold px-4 py-2 rounded-xl transition duration-500 hover:bg-gray-200"
              >
                Dashboard
              </Link>

              {(user.role === "admin" || user.role === "superadmin") && (
                <Link
                  to="/admin"
                  className="text-black font-semibold px-4 py-2 rounded-xl transition duration-500 hover:bg-gray-200"
                >
                  Admin
                </Link>
              )}

              {user.role === "superadmin" && (
                <Link
                  to="/superadmin"
                  className="text-black font-semibold px-4 py-2 rounded-xl transition duration-500 hover:bg-gray-200"
                >
                  Super Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl transition duration-500"
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
