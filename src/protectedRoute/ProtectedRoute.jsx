import {useEffect , useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../../api";

const ProtectedRoute = ({children}) => {
    const [isAuthorized , setIsAuthorized] = useState(null);
    const checkAuth = async () => {
        try {
            await API.get("/auth/check");
            setIsAuthorized(true);
        }catch (err){
           localStorage.removeItem("token");
           setIsAuthorized(false);
        }    
    }
    useEffect(() => {
        checkAuth();
    },[])
    if(isAuthorized === null){
        return <div>Loading ...</div>
    }
    return isAuthorized ? children : <Navigate to = "/signup" replace/>;
}

export default ProtectedRoute;