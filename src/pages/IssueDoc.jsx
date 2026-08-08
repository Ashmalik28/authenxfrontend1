import React, { useContext } from "react";
import { Button } from "../components";

import logo from "../../images/AuthenXLogo.webp";
import Sidebar from "../components/Sidebar";
import { useState, useEffect, useRef } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import QRCodeDisplay from "../components/QRCodeDisplay";
import Loader from "../components/Loader";
import { fetchOrgDetails } from "../../api";
import { issuedDocument } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { SiEthereum } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import { FaStamp } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import { FaGasPump } from "react-icons/fa";
import KycSkeleton from "@/components/KycSkeleton";

const DocType = [
  { id: 1, label: "Employment Certificate" },
  { id: 2, label: "Partnership Agreement" },
  { id: 3, label: "Academic Degree" },
  { id: 4, label: "Training Completion" },
  { id: 5, label: "License" },
  { id: 6, label: "Insurance Policy" },
  { id: 7, label: "Identity Verification" },
  { id: 8, label: "Ownership Certificate" },
];

const truncateFileName = (name, maxLength = 20) => {
  if (name.length <= maxLength) return name;

  const extension = name.split(".").pop();
  const baseName = name.slice(0, maxLength);

  return `${baseName}...${extension}`;
};

const IssueDoc = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { issueDocument, isLoading } = useContext(TransactionContext);
  const [DocTypeOpen, setDocTypeOpen] = useState(false);
  const [kycStatus, setKycStatus] = useState(null);
  const [kycLoading , setKycLoading] = useState(true);
  const { currentAccount } = useContext(TransactionContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const qrRef = useRef(null);
  const [selectedInterest, setSelectedInterest] = useState({
    id: null,
    label: "Select type of Document",
  });
  const [personName, setPersonName] = useState("");
  const [personWallet, setPersonWallet] = useState("");
  const [orgName, setOrgName] = useState("");
  const [docHash, setdocHash] = useState(null);

  useEffect(() => {
    const userType = localStorage.getItem("userType");

    if (userType !== "organization" && userType !== "admin") {
      toast.error("Verifiers cannot issue a document !");
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
      const fetchDetails = async () => {
        try {
          const res = await fetchOrgDetails();
  
          if (res.success && res.kycDetails) {
            setKycStatus(res.kycDetails.status);
          }
        } catch (err) {
          console.error("Failed to fetch org details:", err);
        } finally {
          setKycLoading(false);
        }
      };
  
      fetchDetails();
    }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "AuthenX_QR_Code.png";
    link.click();
    toast.success("QR downloaded successfully");
  };

  const uploadFile = async () => {
    if (!selectedFile) return toast.error("Upload a document first !");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("https://authenx1.up.railway.app/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      return data;
    } catch (err) {
      console.error("File upload failed:", err.message);
      toast.error("File upload failed: " + err.message);
      return null;
    }
  };

  const handleIssueDocument = async () => {
    try {
      setLoading(true);

      const uploadResult = await uploadFile();

      if (!uploadResult || !uploadResult.success) {
        toast.error("Upload failed, please try again.");
        setLoading(false);
        return;
      }

      const docHash = uploadResult.data.cid;
      setdocHash(docHash);

      if (!personName || !personWallet || !selectedInterest.label || !orgName) {
        toast.error("Please fill all fields before issuing the document.");
        setLoading(false);
        return;
      }

      const tx = await issueDocument(
        personName,
        personWallet,
        selectedInterest.label,
        orgName,
        docHash,
      );
      console.log("Transaction Result :", tx);

      if (tx) {
        const docData = {
          personName,
          personWallet,
          docType: selectedInterest.label,
          orgWallet: currentAccount,
          orgName,
          docHash,
        };

        const dbRes = await issuedDocument(docData);
        toast.success("Document successfully issued and recorded!");
      }
    } catch (error) {
      toast.error("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const StatusBadge = ({ status }) => {
    const baseClasses =
      "px-3 py-1 text-sm font-medium rounded-full inline-block";
    const statusClasses = {
      Completed: "bg-green-100 text-green-800",
      Failed: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`${baseClasses} ${statusClasses[status] || "bg-gray-100 text-gray-800"}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="w-screen h-screen flex flex-col text-white bg-[#f8fafc]">
      {/* -- header bar*/}
      <div className="w-full bg-white fixed top-0 flex justify-between border-1 border-b-gray-200 items-center px-2 h-[60px]">
        <div className="w-40 h-10">
          <img src={logo} alt="logo" className="w-40 h-10 cursor-pointer" />
        </div>
        <div className="flex justify-center items-center">
          <div className="text-white flex justify-center items-center gap-2 font-semibold outline-1 outline-gray-500 text-lg px-5 py-1 mr-5 bg-gray-500 rounded-3xl ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
              />
            </svg>
            {shortenAddress(currentAccount)}
          </div>
          <div className="border-1 rounded-full h-12 w-12 bg-gray-700 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-7"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* sidebar + content*/}
      <div className="flex flex-1 h-100vh mt-[60px] 2xl:ml-80 2xl:mr-80 bg-[#f8fafc]">
        <Sidebar />
        <div className="flex flex-1 ml-72 2xl:ml-96 2xl:mr-0 mr-4 lg:mr-9 mb-6">
          <div className="ml-4 lg:ml-6 mt-4 lg:mt-6 2xl:m-10 w-full">
            <div className="grid xl:grid-cols-3 gap-4 lg:gap-6 2xl:gap-10 w-full">
              {/* Left form */}
              <div className="xl:col-span-2 flex flex-col gap-4 lg:gap-6">
                <div className="">
                  <p className="text-black text-2xl lg:text-3xl 2xl:text-4xl font-extrabold">
                    Create &amp; Issue Credential
                  </p>
                  <p className="mt-1 text-gray-500 2xl:text-xl font-medium text-sm lg:text-base">
                    Complete the details below to issue a cryptographically
                    signed document to a recipient's wallet.
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white mt-1 border border-gray-200 rounded-2xl p-4 lg:p-7 shadow-sm"
                >
                  <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-gray-600 2xl:text-base text-xs font-semibold uppercase tracking-wide"
                      >
                        Recipient Name *
                      </label>
                      <div className="flex gap-0 w-full outline-1 outline-gray-300 rounded-lg p-2.5 mt-1.5 focus-within:outline-2 focus-within:outline-indigo-500 transition-all">
                        <input
                          value={personName}
                          onChange={(e) => setPersonName(e.target.value)}
                          className="w-full outline-none text-sm text-black"
                          type="text"
                          placeholder="Full name as on document"
                          id="name"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="recipientWallet"
                        className="text-gray-600 text-xs 2xl:text-base font-semibold uppercase tracking-wide"
                      >
                        Recipient Wallet Address *
                      </label>
                      <div className="flex gap-0 w-full outline-1 outline-gray-300 rounded-lg p-2.5 mt-1.5 focus-within:outline-2 focus-within:outline-indigo-500 transition-all">
                        <input
                          value={personWallet}
                          onChange={(e) => setPersonWallet(e.target.value)}
                          className="w-full outline-none text-sm text-black"
                          type="text"
                          placeholder="0x..."
                          id="recipientWallet"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 lg:gap-4 mt-4">
                    <div>
                      <label
                        htmlFor="doctype"
                        className="text-gray-600 2xl:text-base text-xs font-semibold uppercase tracking-wide"
                      >
                        Select Document Type *
                      </label>
                      <div id="doctype" className="relative mt-1.5">
                        <div
                          className="w-full flex items-center justify-between text-sm px-3 py-3 cursor-pointer rounded-lg outline-1 outline-gray-300 hover:outline-gray-400 transition-colors"
                          onClick={() => setDocTypeOpen(!DocTypeOpen)}
                        >
                          <span
                            className={
                              selectedInterest.id
                                ? "text-black"
                                : "text-gray-400"
                            }
                          >
                            {selectedInterest.label}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`size-4 text-gray-400 transition-transform ${DocTypeOpen ? "rotate-180" : ""}`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        {DocTypeOpen && (
                          <div className="absolute flex flex-col top-full mt-2 max-h-48 left-0 w-full p-1 bg-white outline-1 outline-gray-200 shadow-lg overflow-y-scroll rounded-xl z-10">
                            {DocType.map((type) => (
                              <div
                                key={type.id}
                                className="flex items-center rounded-lg gap-2 px-3 py-2 m-0.5 cursor-pointer hover:bg-indigo-50 transition-colors"
                                onClick={() => {
                                  setSelectedInterest(type);
                                  setDocTypeOpen(false);
                                }}
                              >
                                <span className="text-sm text-gray-700">
                                  {type.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="OrgName"
                        className="text-gray-600 text-xs 2xl:text-base font-semibold uppercase tracking-wide"
                      >
                        Organization Name
                      </label>
                      <div className="flex gap-0 w-full outline-1 outline-gray-200 bg-gray-50 rounded-lg p-3 mt-1.5">
                        <input
                          readOnly
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          className="w-full outline-none text-sm text-gray-500"
                          type="text"
                          placeholder="AuthenX Org"
                          id="OrgName"
                        />
                      </div>
                    </div>
                  </div>

                  {/* dropzone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("document").click()}
                    className={`mt-5 2xl:mt-7 flex flex-col items-start justify-start gap-2 border-2 border-dashed rounded-xl  cursor-pointer overflow-hidden transition-colors ${
                      isDragging
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-300 hover:border-gray-400 bg-gray-50/50"
                    }`}
                  >
                    {selectedFile ? (
                      <div className="flex w-full justify-between items-center p-4 lg:p-4 2xl:p-7 bg-green-50">
                        <div className="flex gap-3">
                          <span className="xl:w-14 xl:h-14 lg:w-8 lg:h-8 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="xl:w-8 xl:h-8 w-4 h-4 md:w-6 md:h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <div className="flex flex-col justify-center">
                            <p className="text-gray-600 text-[11px] xl:text-base md:text-sm truncate font-bold">
                              {truncateFileName(selectedFile.name)}
                            </p>
                            <p className="xl:text-[13px] text-[9px] md:text-xs flex gap-2 font-semibold text-gray-400">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                              MB <span>Ready to verify</span>
                            </p>
                          </div>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                          }}
                          className="text-black hover:bg-red-100 hover:text-red-500 h-[45px] transition-all ease-in-out duration-150 px-1 rounded-xl flex items-center justify-end"
                        >
                          <RxCross2 size={17} />
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 md:p-4 lg:p-4 2xl:p-7 flex flex-col items-center w-full">
                        <span className="lg:w-12 lg:h-12 w-9 h-9 md:w-10 md:h-10 2xl:w-14 2xl:h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-6 h-6 2xl:w-7 2xl:h-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 16.5V9.75m0 0-3 3m3-3 3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                            />
                          </svg>
                        </span>
                        <p className="text-gray-600 text-[11px] md:text-sm lg:text-sm mt-2 2xl:mt-3 2xl:text-base font-medium">
                          Drag &amp; drop or{" "}
                          <button className="text-indigo-600 font-semibold hover:text-indigo-700 underline underline-offset-2">
                            browse file
                          </button>
                        </p>
                        <p className="text-gray-400 mt-1 md:mt-1.5 md:text-xs text-[9px] lg:text-xs 2xl:text-sm font-medium">
                          PDF · JPG · JPEG · PNG — up to 10 MB
                        </p>
                      </div>
                    )}
                    <input
                      onChange={handleFileChange}
                      className="hidden"
                      name="document"
                      accept=".pdf,.jpg,.jpeg,.png"
                      type="file"
                      id="document"
                    />
                  </div>

                  {/* issue button */}
                  <div className="mt-5 flex flex-col items-center gap-3">
                    {loading ? (
                      <Loader />
                    ) : (
                      <div
                        onClick={handleIssueDocument}
                        className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl w-full justify-center py-3 flex gap-2 items-center hover:shadow-lg hover:shadow-indigo-200 transition-shadow"
                      >
                        <FaStamp />
                        Issue Document
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <SiEthereum />
                      Document Issuance is powered by Ethereum Smart Contract
                    </div>
                  </div>
                </motion.div>

                {/* tip cards — static/informational only */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3">
                    <span className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <FaLightbulb />
                    </span>
                    <div>
                      <p className="text-sm font-bold 2xl:text-lg text-gray-900">Pro Tip</p>
                      <p className="text-xs text-gray-600 2xl:text-sm mt-0.5 leading-relaxed">
                        Ensure the recipient wallet address is correct. On-chain
                        issuance is immutable and cannot be undone.
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex gap-3">
                    <span className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                      <FaGasPump />
                    </span>
                    <div>
                      <p className="text-sm font-bold 2xl:text-lg text-gray-900">
                        Sepolia ETH Required{" "}
                        <a
                          href="https://www.alchemy.com/faucets/ethereum-sepolia"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 w-4 h-4 hover:bg-blue-200 px-2 py-1 rounded-xl hover:text-indigo-700 text-sm ml-2 font-semibold"
                        >
                          Get Now →
                        </a>
                      </p>
                      <p className="text-xs 2xl:text-sm text-gray-600 mt-0.5 leading-relaxed">
                        Your connected wallet must hold Sepolia ETH to pay
                        blockchain gas fees when issuing documents.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/*-- Right: QR + KYC status- */}
              <div className="flex flex-col gap-4 lg:gap-6">
                <motion.div
                  ref={qrRef}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 2xl:w-12 2xl:h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 text-white flex items-center justify-center shrink-0">
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="lg:size-6 size-4 md:size-6 2xl:size-8"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    </span>
                    <p className="text-black 2xl:text-2xl font-bold text-base">
                      Issued QR Code
                    </p>
                  </div>
                  <p className="text-gray-500 text-xs 2xl:text-base mt-2">
                    Generated after a successful issuance for instant offline
                    verification.
                  </p>

                  {docHash === null ? (
                    <div className="text-gray-400 mt-4 flex flex-col items-center bg-gray-50 rounded-xl p-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-16 h-16 text-gray-300"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-center mt-2 text-sm font-medium">
                        The QR code will appear here once you issue a document.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center mt-4">
                      <div className="flex justify-center w-full">
                        <QRCodeDisplay
                          url={`http://localhost:5173/verify?hash=${docHash}`}
                        />
                      </div>
                      <p className="mt-4 text-gray-500 text-center text-xs">
                        Scan this to instantly verify the document on our
                        website
                      </p>
                    </div>
                  )}

                  <button
                    onClick={downloadQRCode}
                    className="w-full mt-4 border border-gray-200 hover:bg-gray-50 transition-colors rounded-lg py-2.5 text-sm font-semibold text-gray-700 flex items-center justify-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 12m0 0 4.5-4.5M12 12V3"
                      />
                    </svg>
                    Download QR Code
                  </button>
                </motion.div>

                {/* KYC status */}
                {kycLoading ? (<KycSkeleton />) : (
                  <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  className={`bg-white rounded-2xl 2xl:p-8 p-5 shadow-sm border ${kycStatus === "Approved" ? "border-green-100" : "border-red-100"}`}
                >
                  <p className="text-center text-xs font-bold tracking-widest text-gray-400 uppercase">
                    KYC Status
                  </p>

                  {kycStatus === "Approved" && (
                    <div className="flex flex-col items-center mt-3">
                      <div className="relative">
                        <span className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="w-8 h-8 text-green-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 21h16.5M4.5 21V9.75L12 4.5l7.5 5.25V21M9 21v-5.25h6V21"
                            />
                          </svg>
                        </span>
                        <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-2 border-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            className="w-3 h-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </span>
                      </div>
                      <span className="mt-3 text-xs font-bold text-green-700 bg-green-100 rounded-full px-3 py-1 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified Organization
                      </span>
                      <p className="text-center text-xs text-gray-500 mt-3 leading-relaxed">
                        Your KYC is approved. You have full permissions to issue
                        verified documents to the blockchain.
                      </p>
                    </div>
                  )}

                  {kycStatus === "Pending" && (
                    <div className="flex flex-col items-center mt-3">
                      <span className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="w-8 h-8 text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                          />
                        </svg>
                      </span>
                      <span className="mt-3 text-xs font-bold text-red-700 bg-red-100 rounded-full px-3 py-1">
                        KYC Pending
                      </span>
                      <p className="text-gray-500 text-center text-xs mt-3 leading-relaxed">
                        Your KYC verification is still pending. Please complete
                        the process to unlock the ability to issue documents.
                      </p>
                      <Button
                        onClick={() => navigate("/orgkyc")}
                        variant="primary"
                        size="md"
                        className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg w-full justify-center py-2.5 mt-4 flex gap-2 items-center text-sm"
                      >
                        Verify Now
                      </Button>
                    </div>
                  )}
                </motion.div>

                )}

                {/* security note */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  className="bg-gray-900 rounded-2xl p-5 flex gap-3"
                >
                  <span className="w-9 h-9 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-white text-sm font-bold">
                      Encrypted &amp; Secure
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                      All documents are hashed locally before transmission. We
                      never store the raw file content on our servers.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDoc;
