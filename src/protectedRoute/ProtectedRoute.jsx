import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import API from "../../api";
import Wave from "@/components/loading-ui/Wave";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const hash = params.get("hash");

  if (location.pathname === "/verify" && hash) {
    return children; 
  }

  const checkAuth = async () => {
    try {
      await API.get("/auth/check");
      setIsAuthorized(true);
    } catch (err) {
      localStorage.removeItem("token");
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthorized === null) {
    return <Wave />;
  }

  return isAuthorized ? children : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;
