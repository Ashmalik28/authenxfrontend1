import "./App.css";
import { useState, useEffect, lazy, Suspense } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Verify = lazy(() => import("./pages/Verify"));
const IssueDoc = lazy(() => import("./pages/IssueDoc"));
const MyIssuedDocs = lazy(() => import("./pages/MyIssuedDocs"));
const OrgKYC = lazy(() => import("./pages/OrgKYC"));
const Admin = lazy(() => import("./pages/Admin"));
import { fetchUserType } from "../api";
import ScrollToHashElement from "./components/ScrollToHashElemet";
import Wave from "@/components/loading-ui/Wave";
import { TransactionsProvider } from "./context/TransactionContext";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

function App() {
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const getUserType = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await fetchUserType();

      if (data?.success) {
        setUserType(data.type);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  getUserType();
}, []);

  if (loading) {
    return (
      <div className="flex w-screen justify-center items-center h-screen">
        <Wave className="text-blue-500 w-32 h-16" />
      </div>
    );
  }

  return (
    <>
      <TransactionsProvider>
        <BrowserRouter>
          <ScrollToHashElement />
          <Suspense
            fallback={
              <div className="flex w-screen h-screen justify-center items-center">
                <Wave className="text-blue-500 w-32 h-16" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/verify"
                element={
                  <ProtectedRoute>
                    <Verify />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orgkyc"
                element={
                  <ProtectedRoute>
                    <OrgKYC />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/issue"
                element={
                  <ProtectedRoute>
                    <IssueDoc />
                  </ProtectedRoute>
                }
              />

              {userType === "organization" || userType === "admin" ? (
                <>
                  <Route
                    path="/issue"
                    element={
                      <ProtectedRoute>
                        <IssueDoc />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/mydocuments"
                    element={
                      <ProtectedRoute>
                        <MyIssuedDocs />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/orgkyc"
                    element={
                      <ProtectedRoute>
                        <OrgKYC />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    }
                  />
                </>
              ) : null}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TransactionsProvider>
    </>
  );
}

export default App;
