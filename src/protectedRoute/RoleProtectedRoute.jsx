import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const userType = localStorage.getItem("userType");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (isAdmin && allowedRoles.includes("admin")) {
    return children;
  }

  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleProtectedRoute;