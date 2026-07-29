import React, { useContext } from "react";
import logo from "../../images/AuthenXLogo.webp";
import Sidebar from "../components/Sidebar";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
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
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

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
      icon: <FaReact className="size-10 text-sky-400" />,
    },
    {
      name: "Node.js",
      icon: <FaNodeJs className="size-10 text-green-600" />,
    },
    {
      name: "Solidity",
      icon: <FaEthereum className="size-10 text-gray-700" />,
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className="size-10 text-green-500" />,
    },
    {
      name: "IPFS",
      icon: <FaCube className="size-10 text-blue-600" />,
    },
  ];

  return (
    <div className="w-screen h-full flex flex-col text-white bg-[#f8fafc]">
      {/*header bar*/}
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

      {/* sidebar and content*/}
      <div className="flex flex-1 h-100vh mt-[60px] 2xl:ml-100 2xl:mr-100 bg-[#f8fafc]">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        {toggleMenu && (
          <div className="absolute lg:hidden top-[60px] left-0 w-60 h-screen flex animate-slide-in bg-white z-50 shadow-xl">
            <Sidebar />
          </div>
        )}
        <div className="flex flex-1 lg:ml-72 2xl:ml-96 2xl:mr-0 mr-4 lg:mr-9 mb-6">
          <div className="ml-4 lg:ml-15 mt-4 lg:mt-6 2xl:m-10 w-full flex bg-[#f8fafc] flex-col gap-8 mr-10 lg:gap-10">
            {/* Hero: overview and illustration */}
            <motion.div
              {...fadeUp}
              className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center justify-center"
            >
              <div>
                <span className="inline-flex justify-center items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
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
                <h1 className="text-xl 2xl:text-6xl lg:text-5xl font-extrabold text-black text-center lg:text-start mt-4 leading-tight">
                  The New Standard for
                  <br />
                  <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                    Document Trust
                  </span>
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm lg:text-base mt-4 leading-relaxed max-w-lg">
                  AuthenX solves the multi-billion dollar problem of document
                  fraud and slow verification. We use blockchain and
                  decentralized storage to create immutable, self-sovereign
                  credentials that can be verified instantly, anywhere.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mt-6">
                  <div className="border border-gray-200 bg-white rounded-xl p-4 flex flex-col items-start">
                    <span className="rounded-lg text-red-500 flex items-center justify-center mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-5"
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
                    <p className="text-sm font-bold text-gray-900">
                      Eliminate Fraud
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Tamper-proof cryptographic hashes ensure authenticity.
                    </p>
                  </div>
                  <div className="border border-gray-200 bg-white rounded-xl p-4 flex flex-col items-start">
                    <span className="rounded-lg text-amber-500 flex items-center justify-center mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
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
                    <p className="text-sm font-bold text-gray-900">
                      Instant Access
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Verified in seconds via QR or direct file upload.
                    </p>
                  </div>
                </div>
              </div>

              {/* hero illustration */}
              <div className="w-full">
                <img
                  src={heroleft}
                  alt="hero left image"
                  className="w-[250px] h-[250px] lg:w-[460px] lg:h-[470px] 2xl:w-[550px] 2xl:h-[570px] lg:ml-15"
                />
              </div>
            </motion.div>

            {/* Organization Onboarding */}
            <motion.div {...fadeUp}>
              <div className="text-center lg:mt-3 mb-6">
                <p className="text-2xl lg:text-4xl font-extrabold text-black">
                  Organization Onboarding
                </p>
                <p className="text-gray-500 text-base mt-2">
                  How to get started as a verified issuing authority on AuthenX.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
                    className="bg-white border group border-gray-200 transition-all ease-in-out duration-200 hover:border-blue-700 mt-3 rounded-2xl p-5 shadow-sm"
                  >
                    <span className="w-12 h-12 rounded-lg bg-indigo-100 group-hover:bg-blue-700 group-hover:text-white text-indigo-600 text-lg font-bold flex items-center justify-center mb-3">
                      {step.n}
                    </span>
                    <p className="font-bold text-black text-base">
                      {step.title}
                    </p>
                    <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Wallet Auth and Sepolia ETH */}
            <motion.div
              {...fadeUp}
              className="grid sm:grid-cols-2 gap-4 mt-3 mb-5 lg:gap-6"
            >
              <div className="bg-gray-900 rounded-3xl p-4 lg:p-8">
                <span className="w-8 h-8 lg:w-13 lg:h-13 rounded-lg lg:rounded-xl bg-white/10 text-[#6089fa] flex  items-center justify-center mb-5">
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
                <p className="text-gray-400 text-[11px] lg:text-sm mt-3 leading-relaxed">
                  AuthenX uses asymmetric cryptography for authentication. When
                  you sign in with MetaMask, you're not just logging in — you're
                  verifying ownership of your private key, ensuring absolute
                  account security without traditional passwords.
                </p>
                <p className="text-[#6089fa] text-xs font-bold uppercase tracking-wide mt-10 flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
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

              <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-3xl p-4 lg:p-8">
                <span className="w-8 h-8 lg:w-13 lg:h-13 rounded-lg lg:rounded-xl bg-white/15 text-white flex items-center justify-center mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M11.998 2 5 12.5l6.998 4.13L19 12.5 11.998 2Z" />
                    <path d="m5 13.75 6.998 9.25 7-9.25-6.998 4.13L5 13.75Z" />
                  </svg>
                </span>
                <p className="text-white font-bold text-sm lg:text-2xl">
                  Sepolia ETH Required
                </p>
                <p className="text-indigo-100 text-[11px] lg:text-sm mt-3 leading-relaxed">
                  Issuing a document is an on-chain transaction. This requires
                  "gas" to power the Ethereum network. Currently, AuthenX
                  operates on the Sepolia Testnet — meaning you'll need test ETH
                  from a faucet to sign and publish documents.
                </p>
                <a
                  href="https://www.alchemy.com/faucets/ethereum-sepolia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-12 bg-white text-indigo-600 text-sm font-bold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Get Test ETH →
                </a>
              </div>
            </motion.div>

            {/* Document Issuance Architecture */}
            <motion.div
              {...fadeUp}
              className="bg-white border border-gray-200 rounded-2xl p-5 lg:p-10 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-2xl font-bold text-black">
                    Document Issuance Architecture
                  </p>
                  <p className="text-gray-500 text-sm font-medium mt-1">
                    The underlying process that makes every document unique and
                    secure.
                  </p>
                </div>
                <div className="flex gap-2">
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

              <div className="flex flex-col lg:flex-row items-center justify-between mt-15 mb-2 overflow-x-auto">
                {[
                  { title: "Upload & Hash", icon: "upload" },
                  { title: "Generate CID", icon: "hash" },
                  { title: "Store on IPFS", icon: "network" },
                  { title: "Record on Chain", icon: "cube" },
                  { title: "QR Generation", icon: "qr" },
                ].map((step, i, arr) => (
                  <React.Fragment key={step.title}>
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <span className="w-15 h-15 rounded-2xl hover:border-blue-700 hover:text-blue-700 border-2 transition-colors ease-in-out duration-200 border-gray-300 text-gray-400 flex items-center justify-center">
                        {step.icon === "upload" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="w-7 h-7"
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
                            className="w-7 h-7"
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
                            className="w-7 h-7"
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
                            className="w-7 h-7"
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
                            className="w-7 h-7"
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
                        <div className="lg:hidden w-[2px] h-10 bg-gray-300 my-2" />

                        {/* Desktop connector */}
                        <div className="hidden lg:block flex-1 h-[2px] bg-gray-300 min-w-6" />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="grid bg-[#f8fafc] sm:grid-cols-2 gap-4 mt-10 p-6 rounded-3xl">
                <div>
                  <p className="text-base font-bold text-black flex items-center gap-1.5">
                    <div className="text-blue-700">
                      <FaDatabase />
                    </div>
                    Data Management
                  </p>
                  <p className="text-gray-500 text-[13px] mt-2 leading-relaxed">
                    When a document is issued, its binary data is hashed to
                    create a <strong>CID (Content Identifier)</strong>. This CID
                    is unique — even a single pixel change in the document would
                    result in a different CID. The file is pinned on{" "}
                    <strong>IPFS via Pinata</strong> for permanent decentralized
                    storage.
                  </p>
                </div>
                <div>
                  <p className="text-base font-bold text-black flex items-center gap-1.5">
                    <div className="text-blue-700">
                      <FaLink />
                    </div>
                    Blockchain Link
                  </p>
                  <p className="text-gray-500 text-[13px] mt-2 leading-relaxed">
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
              className="grid lg:grid-cols-2 mt-6 gap-6 lg:gap-10 items-start"
            >
              <div>
                <p className="text-3xl font-extrabold text-black">
                  Instant
                  <br />
                  Verification
                </p>
                <p className="text-gray-500 text-base mt-4 leading-relaxed">
                  Verification is free and doesn't require a wallet. Users can
                  verify authenticity in two primary ways.
                </p>

                <div className="flex flex-col gap-4 mt-5">
                  <div className="bg-white border hover:border-blue-700 transition-all ease-in-out duration-200 border-gray-200 rounded-xl p-4 flex gap-3">
                    <span className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <FaFileUpload />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-black">
                        Direct File Upload
                      </p>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                        Upload the PDF or Image. Our system re-hashes it and
                        compares the result with the blockchain.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white border hover:border-blue-700 transition-all ease-in-out duration-200 border-gray-200 rounded-xl p-4 flex gap-3">
                    <span className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <BsQrCodeScan />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-black">
                        QR Code Scanning
                      </p>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                        Scan the unique QR embedded in the document to see the
                        verified on-chain record instantly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* live result example mock card */}
              <div className="bg-white border border-gray-200 overflow-hidden rounded-2xl shadow-sm">
                <div className="flex items-center border-1 p-5 border-b-gray-200 justify-between">
                  <p className="text-sm font-bold text-gray-400 tracking-wide uppercase">
                    Live Result Example
                  </p>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-300" />
                    <span className="w-2 h-2 rounded-full bg-amber-300" />
                    <span className="w-2 h-2 rounded-full bg-green-300" />
                  </div>
                </div>
                <div className="flex flex-col bg-gray-50 items-center text-center">
                  <div className="relative pt-7">
                    <span className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className="w-8 h-8 text-green-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
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
                  <p className="font-bold text-black mt-3 text-lg">
                    Document Verified
                  </p>
                  <p className="text-gray-400 mb-4 text-xs font-medium italic mt-1">
                    Issued by Acme University on 14/07/2026
                  </p>
                </div>
                <div className="flex flex-col gap-3 bg-gray-50 p-10 pt-6">
                  <div className="flex justify-between px-3 py-2 border-1 border-gray-200 bg-white rounded-lg text-xs">
                    <span className="text-gray-400 font-semibold">TX Hash</span>
                    <span className="font-bold text-blue-700">
                      0x71c...a2f9
                    </span>
                  </div>
                  <div className="flex justify-between px-3 py-2 border-1 border-gray-200 bg-white rounded-lg text-xs">
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
                <p className="text-2xl lg:text-4xl mt-6 font-extrabold text-black">
                  Security Architecture
                </p>
                <p className="text-gray-500 text-base font-medium mt-1">
                  Built on the foundation of decentralization and cryptography.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
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
                    className="bg-white border hover:scale-105 transition-all ease-in-out duration-200 mt-3 border-gray-200 rounded-2xl p-7 shadow-sm"
                  >
                    <span className="">
                      {item.icon === "chain" && (
                        <div className="bg-green-100 flex items-center justify-center text-green-700 mb-5 rounded-2xl w-14 h-14 ">
                          <SiHiveBlockchain className="size-6" />
                        </div>
                      )}
                      {item.icon === "hash" && (
                        <div className="bg-blue-100 flex items-center justify-center text-blue-700 mb-5 rounded-2xl w-14 h-14 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="size-6"
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
                        <div className="bg-[#eef2ff] flex items-center justify-center text-[#4f46e5] mb-5 rounded-2xl w-14 h-14 ">
                          <TiCloudStorage className="size-7" />
                        </div>
                      )}
                    </span>
                    <p className="font-bold text-black text-lg">{item.title}</p>
                    <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technology Stack */}
            <motion.div {...fadeUp}>
              <div className="text-center mb-6">
                <p className="text-2xl lg:text-3xl font-extrabold mt-5 text-black">
                  The Technology Stack
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Powering the future of secure document management.
                </p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-7">
                {techs.map(({ name, icon }) => (
                  <div
                    key={name}
                    className="bg-white border mt-5 hover:border-blue-700 transition-all ease-in-out duration-200 hover:-translate-y-2 border-gray-200 rounded-2xl py-5 flex flex-col items-center justify-center"
                  >
                    {icon}
                    <p className="text-sm font-bold mt-1.5 text-gray-700 tracking-wide">
                      {name.toUpperCase()}
                    </p>
                  </div>
                ))}
                ;
              </div>
              <div className="flex flex-wrap justify-center mt-4 gap-4">
                {["Express", "Pinata", "MetaMask", "Ethers.js"].map((tech) => (
                  <span
                    key={tech}
                    className="text-sm font-bold text-gray-500 bg-gray-200 px-4 py-1.5 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div {...fadeUp} className="text-center mt-15 mb-15 pb-4">
              <p className="text-2xl lg:text-3xl font-extrabold text-black">
                Ready to Secure Your Documents?
              </p>
              <div className="flex justify-center gap-3 mt-8">
                <button
                  onClick={() => navigate("/signin")}
                  className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-base px-7 py-4 rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-shadow"
                >
                  Connect MetaMask
                </button>
                <button
                  onClick={() => navigate("/verify")}
                  className="border border-gray-300 text-gray-700 font-bold text-base px-7 py-4 rounded-xl hover:bg-gray-50 transition-colors"
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
