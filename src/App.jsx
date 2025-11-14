import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Verify from './pages/Verify';
import { TransactionsProvider } from './context/TransactionContext';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import IssueDoc from './pages/IssueDoc';
import MyIssuedDocs from './pages/MyIssuedDocs';
import OrgKYC from './pages/OrgKYC';
import Admin from './pages/Admin';
import { fetchUserType } from '../api';
import { useState, useEffect } from 'react';
import ScrollToHashElement from './components/ScrollToHashElemet';

function App() {
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserType = async () => {
      try {
        const data = await fetchUserType();
        if (data?.success) {
          setUserType(data.type);
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserType();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
    <TransactionsProvider>
      <BrowserRouter>
      <ScrollToHashElement />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify' element={<ProtectedRoute><Verify /></ProtectedRoute>} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          {userType === "organization" || userType === "admin" ? (
            <>
              <Route path='/issue' element={<ProtectedRoute><IssueDoc /></ProtectedRoute>} />
              <Route path='/mydocuments' element={<ProtectedRoute><MyIssuedDocs /></ProtectedRoute>} />
              <Route path='/orgkyc' element={<ProtectedRoute><OrgKYC /></ProtectedRoute>} />
              <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            </>
          ) : null}
        </Routes>
      </BrowserRouter>
    </TransactionsProvider>
    </>
    
  );
}

export default App;
