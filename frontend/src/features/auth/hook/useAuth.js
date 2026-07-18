import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, profile } from "../services/auth.api";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      setLoading(true);

      try {
        const data = await profile();
        setUser(data.user);

        if (
          location.pathname === "/login" ||
          location.pathname === "/register"
        ) {
          navigate("/");
        }
      } catch (err) {
        err;
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, [location.pathname, navigate, setLoading, setUser]);

  return { user, loading, handleRegister, handleLogout, handleLogin };
};
