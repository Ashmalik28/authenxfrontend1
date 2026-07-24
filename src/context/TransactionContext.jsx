import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { contractABI, contractAddress } from "../utils/constants";
import { toast } from "react-toastify";
import { fetchTransactions } from "../../api";
import { saveTransaction } from "../../api";

export const TransactionContext = React.createContext();

const RPCS = [
  `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`,
  "https://ethereum-sepolia-rpc.publicnode.com",
  "https://rpc.sepolia.org"
];

export const createEthereumContract = async () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No ethereum object");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const createReadOnlyContract = async () => {
  for (const url of RPCS) {
    try {
      const provider = new ethers.JsonRpcProvider(url);
      await provider.getBlockNumber();

      return new ethers.Contract(contractAddress, contractABI, provider);
    } catch (err) {
      console.warn(`RPC failed: ${url}`, err);
    }
  }

  throw new Error("No working RPC provider available.");
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getTransactionHistory = async () => {
  try {
    const transactions = await fetchTransactions();

    return transactions.map((tx) => ({
      date: new Date(tx.createdAt).toLocaleDateString(),
      action: tx.action,
      status: tx.status,
      walletAddress: tx.walletAddress,
    }));
  } catch (error) {
    console.error("getTransactionHistory error:", error);
    return [];
  }
};

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        return alert("MetaMask not detected. Install MetaMask to continue.");
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const signer = await provider.getSigner();
      const address = accounts[0];

      setCurrentAccount(address);

      const { data } = await axios.post(
        "https://authenx1.up.railway.app/nonce",
        {
          walletAddress: address,
        },
      );

      const nonce = data.nonce;

      const signature = await signer.signMessage(nonce);

      const res = await axios.post(
        "https://authenx1.up.railway.app/walletverify",
        {
          walletAddress: address,
          signature,
        },
      );

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

      setIsLoading(true);

      const tx = await contract.approveOrg(orgAddress, orgName);

      const receipt = await tx.wait();

      await saveTransaction({
        action: "Organization Approved",
        status: "Success",

        txHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        orgName,
      });

      toast.success("Organization approved on blockchain");

      setIsLoading(false);

      return true;
    } catch (error) {
      console.error("approveOrg error:", error);

      setIsLoading(false);

      return false;
    }
  };

  // 📌 Revoke Organization
  const revokeOrg = async (orgAddress, orgName) => {
  try {
    const contract = await createEthereumContract();

    setIsLoading(true);

    const tx = await contract.revokeOrg(orgAddress);

    const receipt = await tx.wait();

    await saveTransaction({
      action: "Organization Revoked",
      status: "Success",

      txHash: receipt.hash,
      blockNumber: receipt.blockNumber,

      orgName,
    });

    setIsLoading(false);

    toast.success("Organization revoked");

    return true;
  } catch (error) {
    console.error("revokeOrg error:", error);
    setIsLoading(false);
    return false;
  }
};

  // 📌 Issue Document
  const issueDocument = async (
    personName,
    personWallet,
    docType,
    orgName,
    docHash,
  ) => {
    try {
      const contract = await createEthereumContract();
      setIsLoading(true);
      const tx = await contract.issueDocument(
        personName,
        personWallet,
        docType,
        docHash,
      );
      const receipt = await tx.wait();

      await saveTransaction({
        action: "Document Issued",
        status: "Success",

        txHash: receipt.hash,
        blockNumber: receipt.blockNumber,

        personName,
        personWallet,

        orgName,

        docType,
        docHash,
      });

      console.log("Transaction confirmed:", receipt);

      setIsLoading(false);

      console.log("✅ Document issued!");

      return receipt;
    } catch (error) {
      console.error("issueDocument error:", error);
      setIsLoading(false);
      throw error;
     }
  };

  // 📌 Verify Document
  const verifyDocument = async (personWallet, docHash) => {
    try {
      const contract = await createReadOnlyContract();
      return await contract.verifyDocument(personWallet, docHash);
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
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
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
