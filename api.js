import axios from "axios";

const API = axios.create({
    baseURL : "https://authenx1.up.railway.app"
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
    localStorage.setItem("userType", res.data.userType);
    window.dispatchEvent(new Event("userTypeChanged"));
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

export const fetchProfile = async () => {
    const res = await API.get("/profile");
    return res.data;
};

export const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);
    const res = await API.post("/profile-picture", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
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
  window.dispatchEvent(new Event("userTypeChanged"));
  return res.data;
};

export const saveTransaction = async (data) => {
    const res = await API.post("/transactions", data);
    return res.data;
};

export const fetchTransactions = async () => {
  const res = await API.get("/transactions");
  return res.data.transactions;
};

export const getDocument = async (docHash) => {
  const response = await API.post("/getDocument" , {docHash});
  return response.data.document;
};

export default API;
