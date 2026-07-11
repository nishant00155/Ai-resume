import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <main></main>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
