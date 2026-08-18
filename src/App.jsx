import "./App.css";
import { lazy, Suspense } from "react";
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
import ScrollToHashElement from "./components/ScrollToHashElemet";
import Wave from "@/components/loading-ui/Wave";
import { TransactionsProvider } from "./context/TransactionContext";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import RoleProtectedRoute from "./protectedRoute/RoleProtectedRoute";
import UserGuides from "./pages/UserGuides";
import Profile from "./pages/Profile";

  function App() {
   const userType = localStorage.getItem("userType") || "";
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
              <Route path="/about" element={<UserGuides />} />
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
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
                <>
                  <Route
                    path="/issue"
                    element={
                      <ProtectedRoute>
                        <RoleProtectedRoute
                          allowedRoles={["organization", "admin"]}
                        >
                          <IssueDoc />
                        </RoleProtectedRoute>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/mydocuments"
                    element={
                      <ProtectedRoute>
                        <RoleProtectedRoute
                          allowedRoles={["organization", "admin"]}
                        >
                          <MyIssuedDocs />
                        </RoleProtectedRoute>
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/orgkyc"
                    element={
                      <ProtectedRoute>
                        <RoleProtectedRoute
                          allowedRoles={["organization", "admin"]}
                        >
                          <OrgKYC />
                        </RoleProtectedRoute>
                      </ProtectedRoute>
                    }
                  />
                 {userType === "admin" || "organization" ? (
                  <>
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                          <Admin />
                      </ProtectedRoute>
                    }
                  />
                  </>
                 ): null}
                  
                </>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TransactionsProvider>
    </>
  );
}

export default App;
