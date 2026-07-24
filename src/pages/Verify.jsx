import React, { useContext } from "react";
import { Button } from "../components";
import * as Hash from "ipfs-only-hash";
import logo from "../../images/AuthenXLogo.webp";
import Sidebar from "../components/Sidebar";
import { useState, useEffect, useRef } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import QRCodeDisplay from "../components/QRCodeDisplay";
import { useLocation } from "react-router-dom";
import { CID } from "multiformats/cid";
import { getWallet } from "../../api";
import { verifierData } from "../../api";
import { Loader } from "../components";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { FaShieldAlt } from "react-icons/fa";
import { SiEthereum } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import { XCircle } from "lucide-react";

const Verify = () => {
  const { currentAccount, verifyDocument } = useContext(TransactionContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [verified, setVerified] = useState(null);
  const qrRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [docHash, setDocHash] = useState(null);
  const [loading, setloading] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const location = useLocation();

  const userType = localStorage.getItem("userType");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hashFromURL = params.get("hash");
    if (hashFromURL) {
      setDocHash(hashFromURL);
      handleAutoVerification(hashFromURL);
    }
  }, [location]);

  const calculateCID = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const cidV0 = await Hash.of(uint8Array, { cidVersion: 1, rawLeaves: true });
    const cidV1 = CID.parse(cidV0).toV1().toString();
    return cidV1;
  };

  const handleAutoVerification = async (hash) => {
    try {
      const { walletAddress } = await getWallet(hash);
      const result = await verifyDocument(walletAddress, hash);

      console.log("AUTO VERIFY RESULT:", result);

      const isValid =
        result === true ||
        result === "true" ||
        result === 1 ||
        result === "1" ||
        result === "Verified" ||
        result === "Document exists";

      setVerified(isValid);
    } catch (err) {
      setVerified(false);
    }
  };

  const handleVerify = async () => {
    try {
      setloading(true);
      if (!selectedFile) {
        toast.error("Please upload a document first");
        return;
      }
      if (!name || !email) {
        toast.error("Please fill all required fields");
        return;
      }

      const cid = await calculateCID(selectedFile);
      setDocHash(cid);

      const { walletAddress } = await getWallet(cid);

      const result = await verifyDocument(walletAddress, cid);

      if (result) {
        const res = await verifierData(name, email, cid);
        if (res) {
          setVerified(true);
          toast.success("Valid document");
        }
      } else {
        setVerified(false);
        toast.error("Document not valid");
      }
      setloading(false);
    } catch (error) {
      console.error("Verification failed:", error);
      setVerified(false);
    } finally {
      setloading(false);
    }
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "AuthenX_QR_Code.png";
    link.click();
    toast.success("QR code downloaded successfully");
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
    <div className="w-screen h-full 2xl:h-screen bg-[#f8fafc] flex flex-col text-white">
      <div className="w-full bg-white fixed top-0 flex border-b-gray-300 border-1 justify-between items-center z-60 px-2 h-[60px]">
        <div className="lg:hidden flex text-black items-center relative">
          {!toggleMenu ? (
            <HiMenuAlt4
              fontSize={24}
              className="cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          ) : (
            <AiOutlineClose
              fontSize={24}
              className="cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
          )}
        </div>
        <div className="">
          <img
            src={logo}
            alt="logo"
            className="lg:w-40 lg:h-10 w-24 h-6 cursor-pointer"
          />
        </div>
        <div className="flex justify-center items-center">
          {userType === "verifier" ? (
            ""
          ) : (
            <div className="text-white flex justify-center items-center gap-2 font-semibold outline-1 outline-gray-500 text-lg px-5 py-1 mr-5 bg-gray-500 rounded-3xl ">
              <div className="flex justify-center items-center gap-2">
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
            </div>
          )}

          <div className="border-1 rounded-full lg:h-12 lg:w-12 w-6 h-6 bg-gray-700 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="lg:size-7 size-4"
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

      <div className="flex flex-col flex-1 h-full mt-[60px] bg-[#f8fafc]">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        {toggleMenu && (
          <div className="absolute lg:hidden top-[60px] left-0 w-60 h-screen flex animate-slide-in bg-white z-50 shadow-xl">
            <Sidebar />
          </div>
        )}
        <div className="flex flex-1 lg:ml-72 2xl:ml-96 mr-2 xs:mr-5 lg:mr-6 xl:mr-10 2xl:mr-6 mb-6">
          <div className="ml-2 xs:ml-5 lg:ml-0 mt-2 grid xl:grid-cols-3 gap-4 lg:gap-6 w-full">
            {/* ---------- Left: verification form + result ---------- */}
            <div className="xl:col-span-2 flex flex-col gap-6 pl-6">
              <div className="pt-4">
                <p className="text-2xl text-black font-extrabold">
                  Check Document Authenticity
                </p>
                <p className="mt-1 text-gray-500 font-medium">
                  Upload a document to verify it against the blockchain in
                  seconds
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
              >
                <p className="text-black font-bold text-sm lg:text-base">
                  Document to Verify
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <div className="flex-1">
                    <label
                      htmlFor="fullName"
                      className="text-gray-600 mt-1 text-xs font-semibold"
                    >
                      Your Name *
                    </label>
                    <div className="flex gap-0 outline-1 w-full outline-gray-300 rounded-lg p-2.5 mt-1 focus-within:outline-2 focus-within:outline-indigo-500 transition-all">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full outline-none text-sm text-black"
                        type="text"
                        placeholder="Your full name"
                        id="fullName"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="email"
                      className="text-gray-600 mt-1 text-xs font-semibold"
                    >
                      Email Address *
                    </label>
                    <div className="flex gap-0 outline-1 w-full outline-gray-300 rounded-lg p-2.5 mt-1 focus-within:outline-2 focus-within:outline-indigo-500 transition-all">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full outline-none text-sm text-black"
                        type="text"
                        placeholder="Your email address"
                        id="email"
                      />
                    </div>
                  </div>
                </div>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("document").click()}
                  className={`mt-5 flex flex-col items-start justify-start gap-2 border-2 border-dashed rounded-xl  cursor-pointer overflow-hidden transition-colors ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-300 hover:border-gray-400 bg-gray-50/50"
                  }`}
                >
                  {selectedFile ? (
                    <div className="flex w-full justify-between items-center p-4 lg:p-4 bg-green-50">
                      <div className="flex gap-3">
                        <span className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <div className="flex flex-col justify-center">
                          <p className="text-gray-600 text-base font-bold">
                            {selectedFile.name}
                          </p>
                          <p className="text-[13px] flex gap-2 font-semibold text-gray-400">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB{" "}
                            <span>Ready to verify</span>
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
                    <div className="p-4 lg:p-4 flex flex-col items-center w-full">
                      <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0-3 3m3-3 3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                          />
                        </svg>
                      </span>
                      <p className="text-gray-600 text-sm mt-2 font-medium">
                        Drag &amp; drop or{" "}
                        <button className="text-indigo-600 font-semibold hover:text-indigo-700 underline underline-offset-2">
                          browse file
                        </button>
                      </p>
                      <p className="text-gray-400 mt-1 text-xs font-medium">
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

                <div className="mt-5 flex flex-col items-center gap-3">
                  {loading === true ? (
                    <Loader />
                  ) : (
                    <div
                      onClick={handleVerify}
                      variant="primary"
                      size="md"
                      className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl w-full justify-center py-3 flex gap-2 items-center hover:shadow-lg hover:shadow-indigo-200 transition-shadow"
                    >
                      <FaShieldAlt />
                      Verify Document
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <SiEthereum />
                    Verification is powered by Ethereum Smart Contract
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 lg:p-6 shadow-sm"
              >
                <p className="text-black font-bold text-sm lg:text-base mb-3">
                  Result
                </p>
                <div
                  className={`flex flex-col items-center justify-center text-center rounded-xl p-6 lg:p-2 border-2 transition-colors ${
                    verified === null ? "border-gray-200 bg-gray-50" : ""
                  } ${verified === false ? "border-red-300 bg-red-50" : ""} ${verified === true ? "border-green-300 bg-green-50" : ""}`}
                >
                  {verified === null && (
                    <>
                      <span className="w-14 h-14 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-6"
                        >
                          <path d="M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z" />
                          <path
                            fill-rule="evenodd"
                            d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 0 0 1.06-1.06l-1.047-1.048A3.375 3.375 0 1 0 11.625 18Z"
                            clip-rule="evenodd"
                          />
                          <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                        </svg>
                      </span>
                      <p className="text-black font-semibold text-base lg:text-lg">
                        No document uploaded yet
                      </p>
                      <p className="text-gray-500 text-sm mt-1 max-w-sm">
                        Upload a document above to verify its authenticity using
                        our blockchain-powered verification system.
                      </p>
                    </>
                  )}

                  {verified === true && (
                    <div className="flex p-4 w-full">
                            {/* Success Icon */}
                            <div className="flex w-full">
                              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm shrink-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6 text-white"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              </div>
                              <div className="flex flex-col items-start ml-3 w-full">
                              {/* Header */}
                              <h2 className="text-xl font-bold text-green-800">
                                Document Verified ✓
                              </h2>
                              <p className="text-green-700 text-sm mt-0.5">
                                This document is authentic and recorded on-chain.
                              </p>
                              <div className="flex flex-col w-full mt-2 gap-y-2">
                                <div className="flex text-sm justify-between">
                                  <span className="text-gray-500 font-semibold">Document</span>
                                  <span className="text-black font-bold">Employment_Certificate_2024.pdf</span>
                                </div>
                                <div className="flex text-sm justify-between ">
                                  <span className="text-gray-500 font-semibold">Issued By</span>
                                  <span className="text-black font-bold">Acme Corp Ltd.</span>
                                </div>
                                <div className="flex text-sm justify-between">
                                  <span className="text-gray-500 font-semibold">Issued On</span>
                                  <span className="text-black font-bold">12 Jan 2024</span>
                                </div>
                                <div className="flex text-sm justify-between">
                                  <span className="text-gray-500 font-semibold">Tx Hash</span>
                                  <span className="text-gray-500 font-bold">0x9f3a…c72e1b</span>
                                </div>
                              </div>

                              {/* Details */}
                            
                              </div>
                            </div>
                    </div>
                  )}

                  {verified === false && (
                    <div className="flex p-4 w-full">
                            {/* Fail Icon */}
                            <div className="flex w-full">
                              <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center shadow-sm shrink-0">
                              <XCircle className="text-white" />
                              </div>
                              <div className="flex flex-col items-start ml-3 w-full">
                              {/* Header */}
                              <h2 className="text-xl font-bold text-[#991b1b]">
                                Verification Failed ✘
                              </h2>
                              <p className="text-[#cd6263] text-sm mt-0.5">
                                This document could not be matched on the Ethereum blockchain.
                              </p>
                              <div className="text-gray-500 text-sm mt-2 text-start">
                                This may mean the document was not issued through AuthenX, has been altered, or the issuer has revoked it. If you believe this is an error, contact the issuing organization.
                              </div>

                              {/* Details */}
                            
                              </div>
                            </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* ---------- Right: QR + how it works ---------- */}
            <div className="flex flex-col gap-4 lg:gap-6 mt-4">
              <motion.div
                ref={qrRef}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 text-white flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p className="text-black font-bold text-base">
                    Verify with QR Code
                  </p>
                </div>

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
                      QR code appears here after a document is verified
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center mt-4">
                    <div className="flex justify-center w-full">
                      <QRCodeDisplay
                        url={`https://authenxfrontend1.vercel.app/verify?hash=${docHash}`}
                      />
                    </div>
                    <p className="mt-4 text-gray-500 text-center text-xs">
                      Scan this to instantly verify the document on our website
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

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p className="text-black font-bold text-base">
                    How Verification Works
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    {
                      title: "Upload your document",
                      body: "We generate a unique cryptographic hash from the file content — no file is ever stored.",
                    },
                    {
                      title: "Blockchain lookup",
                      body: "The hash is queried against our Ethereum smart contract to find a matching issuance record.",
                    },
                    {
                      title: "Instant result",
                      body: "You see whether the document is authentic, revoked, or unrecognized — with full issuer metadata.",
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-black font-semibold text-sm">
                          {step.title}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
