import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:3000"
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

export const signup = async (data) => {
    const res = await API.post("/signup" , data);
    return res.data;
}

export const signin = async (data) => {
    const res = await API.post("/signin" , data);
    localStorage.setItem("token" , res.data.token);
    return res.data;
}

export const submitKYC = async (formData) => {
    const res = await API.post("/kyc" , formData , {
    headers: {
    "Content-Type": "multipart/form-data",
    },
    } );
    return res.data;
}

export const fetchPendingKYC = async () => {
  const res = await API.get("/kycrequests");
  return res.data;
};

export const updateOrgStatus = async (walletAddress, status) => {
  const res = await API.post("/updateOrgStatus", { walletAddress, status });
  return res.data;
};

export const fetchOrgDetails = async () => {
    const res = await API.get("/me");
    return res.data;
};

export const viewDocument = async (cid) => {
  const res = await API.get(`/view/${cid}`);
  return res.data;
};

export const issuedDocument = async (data) => {
    const res = await API.post("/issue" , data);
    return res.data;
}
export const getWallet = async (docHash) => {
    const res = await API.post("/getWallet" , {docHash});
    return res.data;
}

export const verifierData = async (name , email , cid) => {
    const res = await API.post("/verify" , {name , email , cid});
    return res.data;
}

export const fetchDashboardStats = async () => {
  const res = await API.get("/dashboard-stats");
  return res.data;
};

export const fetchUserType = async () => {
  const res = await API.get("/check-user-type");
  localStorage.setItem("userType" , res.data.type);
  return res.data;
};

export default API;