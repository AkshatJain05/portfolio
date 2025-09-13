import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if logged in on refresh
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Make sure cookies are sent
        const res = await api.get("/auth/me", { withCredentials: true });
        setUser(res.data); // restore user state
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
