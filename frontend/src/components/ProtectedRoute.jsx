import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user, token, isAuthenticated } = useAuth();
  const location = useLocation();

  // Not logged in
  if (!isAuthenticated || !token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Role restriction
  if (role && user?.role !== role) {
    if (user?.role === "admin") {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/user/dashboard"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;