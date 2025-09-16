import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, signupApi, logoutApi, getCurrentUser } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tenant, setTenant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser({ name: currentUser.name, role: currentUser.role });
      setTenant({
        id: currentUser.tenantId,
        name: `Tenant-${currentUser.tenantId}`,
      });
    }
  }, []);

  const login = async (credentials) => {
    const data = await loginApi(credentials);
    const currentUser = getCurrentUser();
    setUser({ name: currentUser.name, role: currentUser.role });
    setTenant({
      id: currentUser.tenantId,
      name: `Tenant-${currentUser.tenantId}`,
    });
    navigate("/dashboard");
  };

  const signup = async (credentials) => {
    const data = await signupApi(credentials);
    const currentUser = getCurrentUser();
    setUser({ name: currentUser.name, role: currentUser.role });
    setTenant({
      id: currentUser.tenantId,
      name: `Tenant-${currentUser.tenantId}`,
    });
    navigate("/dashboard");
  };

  const logout = () => {
    logoutApi();
    setUser(null);
    setTenant(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, tenant, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
