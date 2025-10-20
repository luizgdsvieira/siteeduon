
export default function ProtectedRoute({ children }) {
  // burlar a autenticação
  return children;
}

/*
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;
  return children;
}
*/