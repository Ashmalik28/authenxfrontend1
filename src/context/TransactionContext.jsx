import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import {contractABI , contractAddress} from "../utils/constants"
import { toast } from "react-toastify";

export const TransactionContext = React.createContext();

export const createEthereumContract = async () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No ethereum object");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const createReadOnlyContract = () => {
  const provider = new ethers.JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`
  );
  return new ethers.Contract(contractAddress, contractABI, provider);
};


export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);


const getTransactionHistory = async () => {
  try {
    const contract = await createEthereumContract();
    const provider = new ethers.BrowserProvider(window.ethereum);

    const [approveEvents, revokeEvents, issueEvents, docRevokeEvents] = await Promise.all([
      contract.queryFilter('OrgApproved'),
      contract.queryFilter('OrgRevoked'),
      contract.queryFilter('DocumentIssued'),
      contract.queryFilter('DocumentRevoked'),
    ]);

    const allEvents = [...approveEvents, ...revokeEvents, ...issueEvents, ...docRevokeEvents];

    const transactions = await Promise.all(
      allEvents.map(async (event) => {
        try {
          const tx = await provider.getTransaction(event.transactionHash);
          const receipt = await provider.getTransactionReceipt(event.transactionHash);
          const block = await provider.getBlock(event.blockNumber);

          const actionName = event.fragment.name; 

          return {
            date: new Date(block.timestamp * 1000).toLocaleDateString(),
            action: actionName, 
            status: receipt
              ? receipt.status === 1
                ? 'Approved'
                : 'Failed'
              : 'Pending',
            walletAddress: tx.from,
          };
        } catch (error) {
          console.error('Event processing error:', error);
          return null;
        }
      })
    );
    return transactions.filter(Boolean).sort((b,a) => new Date(a.date) - new Date(b.date));
  } catch (error) {
    console.error('getTransactionHistory error:', error);
    return [];
  }
};


 const connectWallet = async () => {
    try{
      if (!window.ethereum) {
      return alert("MetaMask not detected. Install MetaMask to continue.");
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const address = accounts[0];

      setCurrentAccount(address);

      const { data } = await axios.post("http://localhost:3000/nonce",{ 
      walletAddress: address 
      });

      const nonce = data.nonce;

      const signature = await signer.signMessage(nonce);

      const res = await axios.post("http://localhost:3000/walletverify", {
        walletAddress: address,
        signature,
      });
  
      localStorage.setItem("token", res.data.token);
      toast.success("Login Successful");
      window.location.href = "/dashboard";
  } catch (error) {
    console.error("Wallet connection error:", error);
    toast.error("Connection failed. Please try again.");
  }
};

  const approveOrg = async (orgAddress, orgName) => {
    try {
      const contract = await createEthereumContract();

      console.log("⛓ Approving organization on blockchain...");
      setIsLoading(true);

      const tx = await contract.approveOrg(orgAddress, orgName);
      await tx.wait();

      toast.success("Organization approved on blockchain:");
      setIsLoading(false);
      
      return true;
    } catch (error) {
      console.error("❌ approveOrg error:", error);
      setIsLoading(false);
      return false;
    }
  };

  // 📌 Revoke Organization
  const revokeOrg = async (orgAddress) => {
    try {
      const contract = await createEthereumContract();
      const tx = await contract.revokeOrg(orgAddress);
      setIsLoading(true);
      await tx.wait();
      setIsLoading(false);
      toast.success("Organization revoked:");
    } catch (error) {
      console.error("revokeOrg error:", error);
    }
  };

  // 📌 Issue Document
  const issueDocument = async (personName, personWallet, docType, docHash) => {
    try {
      const contract = await createEthereumContract();
      const tx = await contract.issueDocument(personName, personWallet, docType, docHash);
      setIsLoading(true);
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);
      setIsLoading(false);
      console.log("✅ Document issued!");
      return receipt; 
    } catch (error) {
      console.error("issueDocument error:", error);
    }
  };

  // 📌 Verify Document
  const verifyDocument = async (personWallet , docHash) => {
    try {
      const contract = await createReadOnlyContract();
      return await contract.verifyDocument(personWallet , docHash);
    } catch (error) {
      console.error("verifyDocument error:", error);
      return false;
    }
  };

  // 📌 Revoke Document
  const revokeDocument = async (docHash) => {
    try {
      const contract = await createEthereumContract();
      const tx = await contract.revokeDocument(docHash);
      setIsLoading(true);
      await tx.wait();
      setIsLoading(false);
      console.log("❌ Document revoked");
    } catch (error) {
      console.error("revokeDocument error:", error);
    }
  };

  // 📌 Get documents by person
  const getDocumentsByPerson = async (personWallet) => {
    try {
      const contract = await createEthereumContract();
      return await contract.getDocumentsByPerson(personWallet);
    } catch (error) {
      console.error("getDocumentsByPerson error:", error);
      return [];
    }
  };

  // 📌 Get documents by org
  const getDocumentsByOrg = async (orgWallet) => {
    try {
      const contract = await createEthereumContract();
      return await contract.getDocumentsByOrg(orgWallet);
    } catch (error) {
      console.error("getDocumentsByOrg error:", error);
      return [];
    }
  };

  // 📌 Get all documents (owner only)
  const getAllDocuments = async () => {
    try {
      const contract = await createEthereumContract();
      return await contract.getAllDocuments();
    } catch (error) {
      console.error("getAllDocuments error:", error);
      return [];
    }
  };

  // 📌 Auto-check wallet
  const checkIfWalletIsConnected = async () => {
  try {
    if (!window.ethereum) return; 
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    }
  } catch (error) {
    console.error("checkIfWalletIsConnected error:", error);
  }
};


  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        isLoading,
        approveOrg,
        revokeOrg,
        issueDocument,
        verifyDocument,
        revokeDocument,
        getDocumentsByPerson,
        getDocumentsByOrg,
        getAllDocuments,
        getTransactionHistory,
        createReadOnlyContract,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
