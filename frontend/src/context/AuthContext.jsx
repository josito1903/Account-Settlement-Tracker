import { createContext, useContext, useState } from "react";
import api from "../API/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ================= GET SAVED USER =================

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Invalid saved user:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  // ================= GET SAVED TOKEN =================

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  // ================= LOGIN =================

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!token || !user) {
      throw new Error("Invalid login response from server.");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);

    return response.data;
  };

  // ================= REGISTER =================

  const register = async (
    fullName,
    phoneNumber,
    email,
    password
  ) => {
    const response = await api.post("/auth/register", {
      fullName,
      phoneNumber,
      email,
      password,
    });

    return response.data;
  };

  // ================= LOGOUT =================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  // ================= CONTEXT =================

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: Boolean(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ================= HOOK =================

export const useAuth = () => {
  return useContext(AuthContext);
};