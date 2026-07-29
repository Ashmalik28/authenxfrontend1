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
import { verifierData, getDocument } from "../../api";
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
  const [documentData, setDocumentData] = useState(null);

  const userType = localStorage.getItem("userType");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const truncateFileName = (name, maxLength = 20) => {
    if (name.length <= maxLength) return name;

    const extension = name.split(".").pop();
    const baseName = name.slice(0, maxLength);

    return `${baseName}...${extension}`;
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
      const doc = await getDocument(hash);
      setDocumentData(doc);

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
        const doc = await getDocument(cid);
        setDocumentData(doc);
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
            <div className="text-white hidden lg:flex justify-center items-center gap-2 font-semibold outline-1 outline-gray-500 text-lg px-5 py-1 mr-5 bg-gray-500 rounded-3xl ">
              <div className="flex justify-center items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 "
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
        <div className="flex flex-1 lg:ml-72 2xl:ml-96 mr-4 md:mr-20 xs:mr-5 lg:mr-6 xl:mr-10 2xl:mr-80 mb-6">
          <div className="ml-2 xs:ml-3 md:ml-18 lg:ml-0 mt-2 grid xl:grid-cols-3 gap-4 lg:gap-6 2xl:gap-10 w-full">
            {/* Left verification form and result */}
            <div className="xl:col-span-2 flex flex-col xl:gap-6 gap-3 2xl:gap-10 lg:pl-6 pl-2 2xl:pl-80">
              <div className="pt-2 lg:pt-4 2xl:pt-10">
                <p className="lg:text-2xl text-base md:text-2xl 2xl:text-4xl text-black font-extrabold">
                  Check Document Authenticity
                </p>
                <p className="mt-1 2xl:text-xl text-xs md:text-base text-gray-500 font-medium">
                  Upload a document to verify it against the blockchain in
                  seconds
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="bg-white border mt-1 xl:mt-0 border-gray-200 rounded-2xl p-3 xs:p-4 lg:p-6 shadow-sm"
              >
                <p className="text-black 2xl:text-2xl font-bold text-sm md:text-base lg:text-base">
                  Document to Verify
                </p>

                <div className="flex flex-col md:flex-row gap-2 lg:gap-3 mt-1 md:mt-2 lg:mt-2">
                  <div className="flex-1">
                    <label
                      htmlFor="fullName"
                      className="text-gray-600 mt-1 2xl:text-base text-xs md:text-sm font-semibold"
                    >
                      Your Name *
                    </label>
                    <div className="flex gap-0 outline-1 w-full outline-gray-300 rounded-lg p-2.5 mt-1 2xl:mt-2 2xl:p-3 focus-within:outline-2 focus-within:outline-indigo-500 transition-all">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full outline-none text-sm 2xl:text-base text-black"
                        type="text"
                        placeholder="Your full name"
                        id="fullName"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="email"
                      className="text-gray-600 mt-1 2xl:text-base text-xs md:text-sm font-semibold"
                    >
                      Email Address *
                    </label>
                    <div className="flex gap-0 outline-1 w-full outline-gray-300 rounded-lg p-2.5 mt-1 2xl:mt-2 2xl:p-3 focus-within:outline-2 focus-within:outline-indigo-500 transition-all">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full outline-none text-sm 2xl:text-base text-black"
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

                <div className="mt-5 2xl:mt-6 flex flex-col items-center gap-3">
                  {loading === true ? (
                    <Loader />
                  ) : (
                    <div
                      onClick={handleVerify}
                      className="bg-gradient-to-r from-indigo-600 to-blue-500 text-xs lg:text-base rounded-xl w-full justify-center py-3 flex gap-2 items-center hover:shadow-lg hover:shadow-indigo-200 transition-shadow"
                    >
                      <FaShieldAlt />
                      Verify Document
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-gray-500 text-[9px] lg:text-xs">
                    <SiEthereum />
                    Verification is powered by Ethereum Smart Contract
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="bg-white border border-gray-200 rounded-2xl p-3 xs:p-4 lg:p-6 shadow-sm"
              >
                <p className="text-black font-bold text-sm 2xl:text-2xl lg:text-base mb-3">
                  Result
                </p>
                <div
                  className={`flex flex-col items-center justify-center text-center rounded-xl p-2 2xl:p-6 lg:p-2 border-2 transition-colors ${
                    verified === null ? "border-gray-200 bg-gray-50" : ""
                  } ${verified === false ? "border-red-300 bg-red-50" : ""} ${verified === true ? "border-green-300 bg-green-50" : ""}`}
                >
                  {verified === null && (
                    <div className="flex flex-col items-center md:p-3 lg:p-4 2xl:p-7">
                      <span className="lg:w-14 lg:h-14 w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="lg:size-6 size-5"
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
                      <p className="text-black font-semibold md:text-sm text-xs lg:text-lg">
                        No document uploaded yet
                      </p>
                      <p className="text-gray-500 text-[9px] md:text-xs lg:text-sm mt-1 max-w-sm">
                        Upload a document above to verify its authenticity using
                        our blockchain-powered verification system.
                      </p>
                    </div>
                  )}

                  {verified === true && (
                    <div className="flex md:p-3 lg:p-4 2xl:p-7 w-full">
                      {/* Success Icon */}
                      <div className="flex w-full">
                        <div className="lg:w-12 lg:h-12 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5 md:size-6 lg:size-6 text-white"
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
                          <h2 className="text-sm lg:text-xl md:text-base font-bold text-green-800">
                            Document Verified ✓
                          </h2>
                          <p className="text-green-700 text-[9px] md:text-xs text-start lg:text-sm mt-0.5">
                            This document is authentic and recorded on-chain.
                          </p>
                          <div className="flex flex-col w-full mt-1 md:mt-2 lg:mt-2 gap-y-0.5 md:gap-y-2 lg:gap-y-2">
                            <div className="flex text-[8px] md:text-xs lg:text-sm justify-between">
                              <span className="text-gray-500 font-semibold">
                                Document
                              </span>
                              <span className="text-black truncate font-bold">
                                {selectedFile
                                  ? truncateFileName(selectedFile.name)
                                  : documentData?.docType}
                              </span>
                            </div>
                            <div className="flex text-[8px] md:text-xs lg:text-sm justify-between ">
                              <span className="text-gray-500 font-semibold">
                                Issued By
                              </span>
                              <span className="text-black font-bold">
                                {documentData?.orgName}
                              </span>
                            </div>
                            <div className="flex text-[8px] md:text-xs lg:text-sm justify-between">
                              <span className="text-gray-500 font-semibold">
                                Issued On
                              </span>
                              <span className="text-black font-bold">
                                {new Date(
                                  documentData?.issuedAt,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex text-[8px] md:text-xs lg:text-sm justify-between">
                              <span className="text-gray-500 font-semibold">
                                Doc Hash
                              </span>
                              <span className="text-gray-500 font-bold">
                                {shortenAddress(docHash)}
                              </span>
                            </div>
                          </div>

                          {/* Details */}
                        </div>
                      </div>
                    </div>
                  )}

                  {verified === false && (
                    <div className="flex md:p-3 lg:p-4 2xl:p-7 w-full">
                      {/* Fail Icon */}
                      <div className="flex w-full">
                        <div className="lg:w-12 lg:h-12 w-8 h-8 md:w-10 md:h-10 2xl:w-14 2xl:h-14 rounded-xl bg-red-500 flex items-center justify-center shadow-sm shrink-0">
                          <XCircle className="text-white w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7  2xl:w-8 2xl:h-8" />
                        </div>
                        <div className="flex flex-col items-start ml-2 lg:ml-3 w-full">
                          {/* Header */}
                          <h2 className=" text-sm md:text-base lg:text-xl 2xl:text-2xl font-bold text-[#991b1b]">
                            Verification Failed ✘
                          </h2>
                          <p className="text-[#cd6263] md:text-xs text-[10px] text-start lg:text-sm 2xl:text-base mt-0.5">
                            This document could not be matched on the Ethereum
                            blockchain.
                          </p>
                          <div className="text-gray-500 text-[9px] md:text-xs lg:text-sm mt-1 md:mt-2 lg:mt-2 text-start">
                            This may mean the document was not issued through
                            AuthenX, has been altered, or the issuer has revoked
                            it. If you believe this is an error, contact the
                            issuing organization.
                          </div>

                          {/* Details */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right QR and how it works */}
            <div className="flex flex-col gap-4 pl-2 lg:pl-0 lg:gap-6 2xl:gap-10 lg:mt-4 2xl:mt-10">
              <motion.div
                ref={qrRef}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-3 xs:p-4 lg:p-5 2xl:p-7 shadow-sm"
              >
                <div className="flex items-center gap-2 md:gap-3 2xl:gap-4">
                  <span className="lg:w-8 lg:h-8 w-7 h-7 md:w-10 md:h-10 2xl:w-12 2xl:h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 text-white flex items-center justify-center shrink-0">
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
                  <p className="text-black md:text-base 2xl:text-2xl font-bold text-sm lg:text-base">
                    Verify with QR Code
                  </p>
                </div>
                <div className="text-gray-500 font-medium text-[10px] md:text-xs md:mt-2 lg:text-xs 2xl:text-base w-full mt-1 2xl:mt-3">
                  Scan a document's embedded QR code to verify instantly — no
                  upload needed.
                </div>

                {docHash === null ? (
                  <div className="text-gray-400 lg:mt-4 mt-3 2xl:mt-6 flex flex-col items-center bg-gray-50 rounded-xl lg:p-6 p-3 xs:py-9 2xl:p-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="lg:w-16 lg:h-16 w-12 h-12 xs:w-14 xs:h-14 2xl:w-24 2xl:h-24 text-gray-300"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-center mt-2 text-xs lg:text-sm 2xl:text-base font-medium">
                      QR code appears here after a document is verified
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center mt-4 md:mt-6 md:mb-6 2xl:mt-6">
                    <div className="flex justify-center w-full">
                      <QRCodeDisplay
                        url={`https://authenx.in/verify?hash=${docHash}`}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={downloadQRCode}
                  className="w-full mt-3 lg:mt-4 2xl:mt-6 border border-gray-200 hover:bg-gray-50 transition-colors rounded-lg lg:py-2.5 py-1.5 md:py-3 text-xs lg:text-sm font-semibold text-gray-700 flex items-center justify-center gap-2"
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
                className="bg-white border border-gray-200 rounded-2xl p-3 xs:p-4 lg:p-5 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3 lg:mb-4">
                  <p className="text-black 2xl:text-2xl md:text-base font-bold text-sm lg:text-base">
                    How Verification Works
                  </p>
                </div>

                <div className="flex flex-col gap-1 lg:gap-4">
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
                    <div key={i} className="flex gap-3 lg:gap-3">
                      <span className="w-5 h-5 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-black 2xl:text-lg md:text-sm font-bold text-xs lg:text-sm">
                          {step.title}
                        </p>
                        <p className="text-gray-500 2xl:text-sm md:text-xs text-[11px] lg:text-xs mt-0.5 leading-relaxed">
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
