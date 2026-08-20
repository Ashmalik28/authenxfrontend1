import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { TransactionContext } from "../context/TransactionContext";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import heroleft from "../../images/heroleft.webp";
import { FaDatabase } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";
import { SiHiveBlockchain } from "react-icons/si";
import { TiCloudStorage } from "react-icons/ti";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { FaEthereum } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { FaCube } from "react-icons/fa";
import { useState } from "react";
import TopBar from "@/components/TopBar";

const UserGuides = () => {
  const navigate = useNavigate();
  const { currentAccount, connectWallet } = useContext(TransactionContext);
  const userType = localStorage.getItem("userType");
  const [toggleMenu, setToggleMenu] = useState(false);

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.4 },
  };

  const techs = [
    {
      name: "React",
      icon: <FaReact className="lg:size-10 size-6 text-sky-400" />,
    },
    {
      name: "Node.js",
      icon: <FaNodeJs className="lg:size-10 size-6 text-green-600" />,
    },
    {
      name: "Solidity",
      icon: <FaEthereum className="lg:size-10 size-6 text-gray-700" />,
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className="lg:size-10 size-6 text-green-500" />,
    },
    {
      name: "IPFS",
      icon: <FaCube className="lg:size-10 size-6 text-blue-600" />,
    },
  ];

  return (
    <div className="w-screen h-full flex flex-col text-white bg-[#f8fafc]">
      {/*header bar*/}
      <TopBar toggleMenu={toggleMenu}
         setToggleMenu={setToggleMenu}
         userType={userType}
         currentAccount={currentAccount} />

      {/* sidebar and content*/}
      <div className="flex flex-1 h-100vh mt-[60px] 2xl:ml-100 2xl:mr-100 bg-[#f8fafc]">
        <div className="hidden xl:block">
          <Sidebar />
        </div>
        {toggleMenu && (
          <div className="absolute xl:hidden top-[60px] left-0 w-60 h-screen flex animate-slide-in bg-white z-50 shadow-xl">
            <Sidebar />
          </div>
        )}
        <div className="flex flex-1 xl:ml-72 2xl:ml-96 2xl:mr-0 xl:mr-9 lg:mb-6">
          <div className="ml-3 xs:ml-6 md:ml-10 md:mr-10 xl:ml-15 mt-4 lg:mt-6 2xl:m-10 w-full flex bg-[#f8fafc] flex-col gap-8 mr-3 xs:mr-6 lg:mr-10 lg:gap-10">
            {/* Hero: overview and illustration */}
            <motion.div
              {...fadeUp}
              className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center justify-center"
            >
              <div className="w-full">
                <div className="flex justify-center lg:justify-start">
                  <span className="inline-flex justify-center items-center gap-1.5 bg-indigo-50 text-indigo-600 text-[10px] sm:text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
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
                    Overview
                  </span>
                </div>
                <h1 className="text-xl md:text-4xl 2xl:text-6xl xl:text-5xl font-extrabold text-black text-center lg:text-start mt-4 leading-tight">
                  The New Standard for
                  <br />
                  <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                    Document Trust
                  </span>
                </h1>
                <p className="text-gray-500 text-xs text-center lg:text-start sm:text-sm lg:text-base mt-4 leading-relaxed md:w-full lg:max-w-lg">
                  AuthenX solves the multi-billion dollar problem of document
                  fraud and slow verification. We use blockchain and
                  decentralized storage to create immutable, self-sovereign
                  credentials that can be verified instantly, anywhere.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mt-6">
                  <div className="border border-gray-200 bg-white rounded-xl p-3 md:p-4 lg:p-4 flex flex-col items-start">
                    <span className="rounded-lg text-red-500 flex items-center justify-center mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="lg:size-5 size-4 md:size-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="m6.72 5.66 11.62 11.62A8.25 8.25 0 0 0 6.72 5.66Zm10.56 12.68L5.66 6.72a8.25 8.25 0 0 0 11.62 11.62ZM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="text-xs md:text-sm md:mt-1 lg:mt-0  font-bold text-gray-900">
                      Eliminate Fraud
                    </p>
                    <p className="text-[9px] md:text-xs text-gray-500 lg:mt-1 mt-0.5 leading-relaxed">
                      Tamper-proof cryptographic hashes ensure authenticity.
                    </p>
                  </div>
                  <div className="border border-gray-200 bg-white rounded-xl p-3 lg:p-4 flex flex-col items-start">
                    <span className="rounded-lg text-amber-500 flex items-center justify-center mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="lg:w-5 lg:h-5 h-4 w-4 md:w-5 md:h-5"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <p className="text-xs md:text-sm md:mt-1 lg:mt-0 font-bold text-gray-900">
                      Instant Access
                    </p>
                    <p className="text-[9px] md:text-xs text-gray-500 mt-0.5 lg:mt-1 leading-relaxed">
                      Verified in seconds via QR or direct file upload.
                    </p>
                  </div>
                </div>
              </div>

              {/* hero illustration */}
              <div className="w-full flex justify-center">
                <img
                  src={heroleft}
                  alt="hero left image"
                  className="w-[250px] h-[260px] md:w-[400px] md:h-[410px] xl:w-[460px] xl:h-[470px] 2xl:w-[550px] 2xl:h-[570px] lg:ml-15"
                />
              </div>
            </motion.div>

            {/* Organization Onboarding */}
            <motion.div {...fadeUp}>
              <div className="text-center lg:mt-3 md:mt-2 mb-6">
                <p className="text-xl md:text-3xl lg:text-4xl font-extrabold text-black">
                  Organization Onboarding
                </p>
                <p className="text-gray-500 text-xs md:text-sm lg:text-base mt-2">
                  How to get started as a verified issuing authority on AuthenX.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-y-1 md:gap-4 lg:gap-4">
                {[
                  {
                    n: 1,
                    title: "Connect Wallet",
                    body: "Securely authenticate using MetaMask to establish your digital identity on-chain.",
                  },
                  {
                    n: 2,
                    title: "Complete KYC",
                    body: "Provide organizational details and legal documents for compliance verification.",
                  },
                  {
                    n: 3,
                    title: "Admin Approval",
                    body: "Our compliance team reviews your submission. Once approved, you are granted issuance rights.",
                  },
                  {
                    n: 4,
                    title: "Start Issuing",
                    body: "Select a document type and mint the credential directly to the recipient's wallet.",
                  },
                ].map((step) => (
                  <div
                    key={step.n}
                    className="bg-white border group border-gray-200 transition-all ease-in-out duration-200 hover:border-blue-700 mt-3 md:mt-0 lg:mt-3 rounded-2xl p-3 lg:p-5 shadow-sm"
                  >
                    <span className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg bg-indigo-100 group-hover:bg-blue-700 group-hover:text-white text-indigo-600 text-sm lg:text-lg font-bold flex items-center justify-center mb-3">
                      {step.n}
                    </span>
                    <p className="font-bold text-black text-sm lg:text-base">
                      {step.title}
                    </p>
                    <p className="text-gray-500 text-xs lg:text-sm mt-1.5 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Wallet Auth and Sepolia ETH */}
            <motion.div
              {...fadeUp}
              className="grid sm:grid-cols-2 gap-4 lg:mt-3 mb-5 lg:gap-6"
            >
              <div className="bg-gray-900 rounded-2xl lg:rounded-3xl p-3 lg:p-8">
                <span className="w-8 h-8 lg:w-13 lg:h-13 rounded-lg lg:rounded-xl bg-white/10 text-[#6089fa] flex  items-center justify-center mb-2 lg:mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="lg:w-6 lg:h-6 w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                    />
                  </svg>
                </span>
                <p className="text-white font-bold text-sm lg:text-2xl">
                  Wallet Authentication
                </p>
                <p className="text-gray-400 text-[9px] lg:text-sm mt-1 lg:mt-3 leading-relaxed">
                  AuthenX uses asymmetric cryptography for authentication. When
                  you sign in with MetaMask, you're not just logging in — you're
                  verifying ownership of your private key, ensuring absolute
                  account security without traditional passwords.
                </p>
                <p className="text-[#6089fa] text-[10px] lg:text-xs font-bold uppercase tracking-wide mt-3 md:mt-5 lg:mt-16 flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="lg:w-3.5 lg:h-3.5 w-3 h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Passwordless Security
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl lg:rounded-3xl p-4 lg:p-8">
                <span className="w-8 h-8 lg:w-13 lg:h-13 rounded-lg lg:rounded-xl bg-white/15 text-white flex items-center justify-center mb-2 lg:mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="lg:w-6 lg:h-6 w-4 h-4"
                  >
                    <path d="M11.998 2 5 12.5l6.998 4.13L19 12.5 11.998 2Z" />
                    <path d="m5 13.75 6.998 9.25 7-9.25-6.998 4.13L5 13.75Z" />
                  </svg>
                </span>
                <p className="text-white font-bold text-sm lg:text-2xl">
                  Sepolia ETH Required
                </p>
                <p className="text-indigo-100 text-[9px] lg:text-sm mt-1 lg:mt-3 leading-relaxed">
                  Issuing a document is an on-chain transaction. This requires
                  "gas" to power the Ethereum network. Currently, AuthenX
                  operates on the Sepolia Testnet — meaning you'll need test ETH
                  from a faucet to sign and publish documents.
                </p>
                <a
                  href="https://www.alchemy.com/faucets/ethereum-sepolia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block lg:mt-12 mt-3 bg-white text-indigo-600 text-[10px] lg:text-sm font-bold px-2 py-1 lg:px-4 lg:py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Get Test ETH →
                </a>
              </div>
            </motion.div>

            {/* Document Issuance Architecture */}
            <motion.div
              {...fadeUp}
              className="bg-white border border-gray-200 rounded-2xl p-3 lg:p-10 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="w-full">
                  <p className="lg:text-2xl md:text-3xl text-xl text-center lg:text-start font-bold text-black">
                    Document Issuance Architecture
                  </p>
                  <p className="text-gray-500 text-xs text-center lg:text-start md:text-sm font-medium mt-2 lg:mt-1">
                    The underlying process that makes every document unique and
                    secure.
                  </p>
                </div>
                <div className="lg:flex hidden gap-2">
                  {["IPFS", "Ethereum", "ERC-721"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between mt-5 md:mt-10 lg:mt-15 mb-2 overflow-x-auto">
                {[
                  { title: "Upload & Hash", icon: "upload" },
                  { title: "Generate CID", icon: "hash" },
                  { title: "Store on IPFS", icon: "network" },
                  { title: "Record on Chain", icon: "cube" },
                  { title: "QR Generation", icon: "qr" },
                ].map((step, i, arr) => (
                  <React.Fragment key={step.title}>
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <span className="w-12 h-12 lg:w-15 lg:h-15 rounded-2xl hover:border-blue-700 hover:text-blue-700 border-2 transition-colors ease-in-out duration-200 border-gray-300 text-gray-400 flex items-center justify-center">
                        {step.icon === "upload" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="lg:w-7 lg:h-7 w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 16.5V9.75m0 0-3 3m3-3 3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                            />
                          </svg>
                        )}
                        {step.icon === "hash" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="lg:w-7 lg:h-7 w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.25 8.25h13.5m-13.5 7.5h13.5m-9-15L7.5 21m9-18-2.25 18"
                            />
                          </svg>
                        )}
                        {step.icon === "network" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="lg:w-7 lg:h-7 w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9M12 18.75V5.25"
                            />
                          </svg>
                        )}
                        {step.icon === "cube" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="lg:w-7 lg:h-7 w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                            />
                          </svg>
                        )}
                        {step.icon === "qr" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="lg:w-7 lg:h-7 w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 4.5h4.5v4.5h-4.5v-4.5Zm11.25 0h4.5v4.5h-4.5v-4.5Zm-11.25 11.25h4.5v4.5h-4.5v-4.5Zm9-1.5h1.5v1.5m-1.5 3h1.5v1.5m3-4.5h1.5v1.5m0 3h1.5v1.5"
                            />
                          </svg>
                        )}
                      </span>
                      <p className="text-xs mt-2 font-bold text-gray-700 text-center whitespace-nowrap">
                        {step.title}
                      </p>
                    </div>
                    {i < arr.length - 1 && (
                      <>
                        {/* Mobile connector */}
                        <div className="md:hidden w-[2px] h-5 bg-gray-300 my-2" />

                        {/* Desktop and tablet connector */}
                        <div className="hidden md:block md:-translate-y-3 lg:-transalate-y-0 flex-1 h-[2px] bg-gray-300 min-w-6" />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="grid bg-[#f8fafc] sm:grid-cols-2 gap-2 lg:gap-4 mt-5 md:mt-10 lg:mt-10 p-3 lg:p-6 rounded-3xl">
                <div>
                  <p className="text-sm lg:text-base font-bold text-black flex items-center gap-1.5">
                    <div className="text-blue-700">
                      <FaDatabase />
                    </div>
                    Data Management
                  </p>
                  <p className="text-gray-500 text-[9px] lg:text-[13px] mt-2 leading-relaxed">
                    When a document is issued, its binary data is hashed to
                    create a <strong>CID (Content Identifier)</strong>. This CID
                    is unique — even a single pixel change in the document would
                    result in a different CID. The file is pinned on{" "}
                    <strong>IPFS via Pinata</strong> for permanent decentralized
                    storage.
                  </p>
                </div>
                <div>
                  <p className=" text-sm lg:text-base font-bold text-black flex items-center gap-1.5">
                    <div className="text-blue-700">
                      <FaLink />
                    </div>
                    Blockchain Link
                  </p>
                  <p className="text-gray-500 text-[9px] lg:text-[13px] mt-2 leading-relaxed">
                    The CID and recipient metadata are recorded on our{" "}
                    <strong>Ethereum Smart Contract</strong>. This creates an
                    immutable link between the organization, the recipient, and
                    the specific document version, accessible forever on the
                    public ledger.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Instant Verification */}
            <motion.div
              {...fadeUp}
              className="grid xl:grid-cols-2 md:flex md:w-full xl:grid md:flex-col md:items-center  lg:mt-6 gap-6 lg:gap-10 items-start"
            >
              <div className="flex flex-col md:items-center xl:items-start">
                <p className="text-xl hidden xl:flex  lg:text-3xl font-extrabold text-black">
                  Instant
                  <br />
                  Verification
                </p>
                <p className="text-xl md:text-2xl xl:hidden text-center lg:text-3xl font-extrabold text-black">
                  Instant Verification
                </p>
                <p className="text-gray-500 md:text-sm text-xs md:w-[75%] text-center xl:text-start lg:text-base mt-1 lg:mt-4 leading-relaxed">
                  Verification is free and doesn't require a wallet. Users can
                  verify authenticity in two primary ways.
                </p>

                <div className="flex flex-col md:mt-5 gap-y-2 md:gap-y-4 md:max-w-[60%] lg:max-w-full lg:gap-4 mt-3 lg:mt-5">
                  <div className="bg-white border hover:border-blue-700 transition-all ease-in-out duration-200 border-gray-200 rounded-xl p-3 lg:p-4 flex gap-3">
                    <span className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <FaFileUpload className="size-3 md:size-4.5" />
                    </span>
                    <div>
                      <p className="text-xs md:text-sm font-bold text-black">
                        Direct File Upload
                      </p>
                      <p className="text-gray-500 text-[9px] md:text-xs mt-1 leading-relaxed">
                        Upload the PDF or Image. Our system re-hashes it and
                        compares the result with the blockchain.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white border hover:border-blue-700 transition-all ease-in-out duration-200 border-gray-200 rounded-xl p-3 lg:p-4 flex gap-3">
                    <span className="w-7 h-7 md:w-9 md:h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <BsQrCodeScan className="size-3 md:size-4.5" />
                    </span>
                    <div>
                      <p className="text-xs md:text-sm font-bold text-black">
                        QR Code Scanning
                      </p>
                      <p className="text-gray-500 text-[9px] md:text-xs mt-1 leading-relaxed">
                        Scan the unique QR embedded in the document to see the
                        verified on-chain record instantly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* live result example mock card */}
              <div className="bg-white border md:min-w-[500px] lg:min-w-[700px] xl:min-w-full xl:max-w-full border-gray-200 overflow-hidden rounded-2xl shadow-sm">
                <div className="flex items-center border-1 p-3 md:p-5 border-b-gray-200 justify-between">
                  <p className="text-[11px] md:text-sm font-bold text-gray-400 tracking-wide uppercase">
                    Live Result Example
                  </p>
                  <div className="flex gap-1.5">
                    <span className="md:w-2 md:h-2 w-1.5 h-1.5 rounded-full bg-red-300" />
                    <span className="md:w-2 md:h-2 w-1.5 h-1.5 rounded-full bg-amber-300" />
                    <span className="md:w-2 md:h-2 w-1.5 h-1.5 rounded-full bg-green-300" />
                  </div>
                </div>
                <div className="flex flex-col bg-gray-50 items-center text-center">
                  <div className="relative pt-4 md:pt-12 xl:pt-7">
                    <span className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-16 xl:h-16  rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className="md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-8 w-6 h-6 text-green-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                        />
                      </svg>
                    </span>
                    <span className="absolute -bottom-1 -right-1 md:w-6 md:h-6 xl:w-6 xl:h-6 lg:w-7 lg:h-7 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center border-2 border-white">
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
                  <p className="font-bold text-sm xl:text-lg xl:mt-3 lg:mt-4 lg:text-xl  text-black md:mt-3 mt-2 md:text-lg">
                    Document Verified
                  </p>
                  <p className="text-gray-400 mb-4 text-[10px] xl:text-xs lg:text-sm md:text-xs font-medium italic mt-1">
                    Issued by Acme University on 14/07/2026
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:gap-3 xl:gap-3 lg:gap-4 bg-gray-50 px-4 pb-4 md:p-10 md:pt-6">
                  <div className="flex justify-between px-3 py-1 md:py-2 xl:py-2 lg:py-3 border border-gray-200 bg-white rounded-lg text-[10px] md:text-xs">
                    <span className="text-gray-400 font-semibold">TX Hash</span>
                    <span className="font-bold text-blue-700">
                      0x71c...a2f9
                    </span>
                  </div>
                  <div className="flex justify-between px-3 py-1 md:py-2 xl:py-2 lg:py-3 border border-gray-200 bg-white rounded-lg text-[10px] md:text-xs">
                    <span className="text-gray-400 font-semibold">Owner</span>
                    <span className="font-mono text-gray-700">
                      0x3b8...1cd4
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security Architecture */}
            <motion.div {...fadeUp}>
              <div className="text-center mb-6">
                <p className="text-xl md:text-2xl lg:text-4xl lg:mt-6 font-extrabold text-black">
                  Security Architecture
                </p>
                <p className="text-gray-500 text-xs md:text-base font-medium mt-1">
                  Built on the foundation of decentralization and cryptography.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-y-3 md:gap-4 lg:gap-6">
                {[
                  {
                    title: "Blockchain Immutability",
                    body: "Once a record is written to the Ethereum blockchain, it cannot be edited, deleted, or censored — even by AuthenX administrators.",
                    icon: "chain",
                  },
                  {
                    title: "Cryptographic Hashing",
                    body: "We use SHA-256 hashing algorithms to generate unique digital fingerprints. If a single comma is changed, the hash fails verification.",
                    icon: "hash",
                  },
                  {
                    title: "Distributed Storage",
                    body: "Documents are stored on IPFS, a peer-to-peer network, preventing centralized points of failure and ensuring data persistence.",
                    icon: "cloud",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-white border hover:scale-105 transition-all ease-in-out duration-200 lg:mt-3 border-gray-200 rounded-2xl p-3 lg:p-7 shadow-sm"
                  >
                    <span className="">
                      {item.icon === "chain" && (
                        <div className="bg-green-100 flex items-center justify-center text-green-700 mb-2 lg:mb-5 rounded-2xl w-10 h-10 lg:w-14 lg:h-14 ">
                          <SiHiveBlockchain className="lg:size-6 size-5" />
                        </div>
                      )}
                      {item.icon === "hash" && (
                        <div className="bg-blue-100 flex items-center justify-center text-blue-700 mb-2 lg:mb-5 rounded-2xl w-10 h-10 lg:w-14 lg:h-14 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="lg:size-6 size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.25 8.25h13.5m-13.5 7.5h13.5m-9-15L7.5 21m9-18-2.25 18"
                            />
                          </svg>
                        </div>
                      )}
                      {item.icon === "cloud" && (
                        <div className="bg-[#eef2ff] flex items-center justify-center text-[#4f46e5] mb-2 lg:mb-5 rounded-2xl w-10 h-10 lg:w-14 lg:h-14 ">
                          <TiCloudStorage className="lg:size-7 size-6" />
                        </div>
                      )}
                    </span>
                    <p className="font-bold text-black text-sm lg:text-lg">
                      {item.title}
                    </p>
                    <p className="text-gray-500 text-[9px] lg:text-sm mt-1 lg:mt-3 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technology Stack */}
            <motion.div {...fadeUp}>
              <div className="text-center lg:mb-6">
                <p className="text-xl md:text-2xl lg:text-3xl font-extrabold lg:mt-5 text-black">
                  The Technology Stack
                </p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">
                  Powering the future of secure document management.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-x-3 lg:gap-x-7 sm:grid sm:grid-cols-5">
                {techs.map(({ name, icon }) => (
                  <div
                    key={name}
                    className="basis-[28%] sm:basis-auto bg-white border mt-5 hover:border-blue-700 transition-all ease-in-out duration-200 hover:-translate-y-2 border-gray-200 rounded-2xl py-5 flex flex-col items-center justify-center"
                  >
                    {icon}
                    <p className="text-xs lg:text-sm font-bold mt-1.5 text-gray-700 tracking-wide">
                      {name.toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center mt-4 gap-3">
                {["Express", "Pinata", "MetaMask", "Ethers.js"].map((tech) => (
                  <span
                    key={tech}
                    className="lg:text-sm text-[9px] font-bold text-gray-500 bg-gray-200 px-3 lg:px-4 py-1.5 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div
              {...fadeUp}
              className="text-center mt-4 lg:mt-15 mb-8 lg:mb-15 pb-4"
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-extrabold text-black">
                Ready to Secure Your Documents?
              </p>
              <div className="flex justify-center gap-3 mt-5 lg:mt-8">
                <button
                  onClick={() => navigate("/signin")}
                  className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-xs px-3 py-2 md:px-5 md:py-3 lg:text-base lg:px-7 lg:py-4 rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-shadow"
                >
                  Connect MetaMask
                </button>
                <button
                  onClick={() => navigate("/verify")}
                  className="border border-gray-300 text-gray-700 font-bold text-xs px-3 py-2 lg:text-base md:px-5 md:py-3 lg:px-7 lg:py-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Verify a Document
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuides;
