import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import API from "../../api";
import Wave from "@/components/loading-ui/Wave";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const hash = params.get("hash");

  const isQRVerification =
    location.pathname === "/verify" && Boolean(hash);

  useEffect(() => {
    if (isQRVerification) {
      return;
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

    checkAuth();
  }, [isQRVerification]);

  if (isQRVerification) {
    return children;
  }

  if (isAuthorized === null) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Wave className="text-blue-500 w-32 h-16" />
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;