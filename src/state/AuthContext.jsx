import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const DEMO_USER = {
  email: "demo@smartshop.com",
  name: "Demo User",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email === DEMO_USER.email && password === "password123") {
      setUser(DEMO_USER);
      return { ok: true };
    }
    if (email && password) {
      setUser({ email, name: "Guest User" });
      return { ok: true };
    }
    return { ok: false, message: "Invalid credentials" };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
