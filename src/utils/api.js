const API_BASE_URL = "http://localhost:5050/api"; // Change to your backend URL

// Token storage helpers
export const saveToken = (token) => localStorage.setItem("authToken", token);
export const getToken = () => localStorage.getItem("authToken");
export const removeToken = () => localStorage.removeItem("authToken");

// Decode JWT token to get payload
export const parseJwt = (token) => {
  try {
    const base64Payload = token.split(".")[1];
    return JSON.parse(atob(base64Payload));
  } catch {
    return null;
  }
};

// Login API call
export const loginApi = async ({ tenantId, email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenantId, email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  const data = await response.json();
  saveToken(data.token);
  return data;
};

// Signup API call
export const signupApi = async ({ tenantId, email, password }) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenantId, email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }
  const data = await response.json();
  saveToken(data.token);
  return data;
};

// Logout helper
export const logoutApi = () => {
  removeToken();
};

// Get current user info from stored token
export const getCurrentUser = () => {
  const token = getToken();
  if (!token) return null;
  return parseJwt(token);
};

// Generic fetch helper with Authorization header
export const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMsg = errorData?.message || "API request failed";
    throw new Error(errorMsg);
  }

  return response.json();
};
