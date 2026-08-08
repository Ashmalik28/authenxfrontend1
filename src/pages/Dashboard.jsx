import React, { useContext, useLayoutEffect } from "react";
import { Button, Loader } from "../components";
import { ethers } from "ethers";
import logo from "../../images/AuthenXLogo.webp";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { fetchOrgDetails } from "../../api";
import { useNavigate } from "react-router-dom";
import { fetchDashboardStats } from "../../api";
import { fetchUserType } from "../../api";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { IoDocumentAttachSharp } from "react-icons/io5";
import { FaStamp } from "react-icons/fa6";
import { div } from "motion/react-client";
import VerificationSnapshot from "@/components/VerificationSnapshot";
import { motion } from "motion/react";
import KycSkeleton from "@/components/KycSkeleton";

const Dashboard = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [kycStatus, setKycStatus] = useState(null);
  const [kycLoading, setKycLoading] = useState(true);
  const { currentAccount, getTransactionHistory } =
    useContext(TransactionContext);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [totalVerifications, setTotalVerifications] = useState(0);
  const [totalVerifiedOrgs, setTotalVerifiedOrgs] = useState(0);
  const [walletBalance, setWalletBalance] = useState("0");
  const navigate = useNavigate();
  const [transactionsData, setTransactionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [userName, setUserName] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);
  const docsPerPage = 4;

  const totalTransactionData = Math.ceil(transactionsData.length / docsPerPage);
  const indexOfLastDoc = currentPage * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
  const currentDocs = transactionsData.slice(indexOfFirstDoc, indexOfLastDoc);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (indexOfLastDoc < transactionsData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const getUserType = async () => {
      try {
        const data = await fetchUserType();
        if (data.success) {
          setUserName(data.name);
        }
        if (data.type === "verifier") {
          setEmail(data.email);
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    getUserType();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchTransactions = async () => {
      try {
        const data = await getTransactionHistory();
        setTransactionsData(data.reverse());
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (!userType) return;
    const fetchBalance = async () => {
      if (userType == "verifier") {
        setWalletBalance("N/A");
        return;
      }

      if (!currentAccount || !window.ethereum) return;

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(currentAccount);
        const formatted = parseFloat(ethers.formatEther(balance)).toFixed(3);
        setWalletBalance(formatted);
      } catch (err) {
        console.error("Failed to fetch wallet balance:", err);
      }
    };

    fetchBalance();
  }, [currentAccount, userType]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchDashboardStats();
        if (data.success) {
          setTotalDocuments(data.data.totalDocuments);
          setTotalVerifications(data.data.totalVerifications);
          setTotalVerifiedOrgs(data.data.totalVerifiedOrgs);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };
    getStats();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
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

  const StatusBadge = ({ status }) => {
    const baseClasses =
      "px-3 py-1 text-xs 2xl:text-lg font-medium rounded-full inline-block";
    const statusClasses = {
      Success: "bg-green-100 text-green-800",
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

  const TransactionRow = ({ transaction }) => (
    <div className="grid grid-cols-4 2xl:py-5 items-center xl:py-4 px-1 border-b border-gray-200 hover:bg-gray-50 text-gray-700">
      <div className="font-medium text-sm flex 2xl:text-xl justify-center text-gray-900">
        {transaction.date}
      </div>
      <div className="flex text-sm 2xl:text-xl justify-center">
        {transaction.action}
      </div>
      <div className="flex justify-center">
        <StatusBadge status={transaction.status} />
      </div>
      <div className="font-mono 2xl:text-xl flex justify-center text-xs text-gray-600">
        {shortenAddress(transaction.wallet)}
      </div>
    </div>
  );

  return (
    <div className="w-screen min-h-[100vh] flex flex-col text-white">
      <div className="w-full bg-white fixed top-0 flex justify-between items-center z-60 px-2 h-[60px] xs:h-[60px]">
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
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

      <div className="flex flex-1 h-full w-screen mt-[60px] bg-gray-300">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        {toggleMenu && (
          <div className="absolute lg:hidden top-[60px] left-0 h-screen flex animate-slide-in bg-white z-50 shadow-xl">
            <Sidebar />
          </div>
        )}
        <div className="flex flex-col 2xl:ml-96 lg:ml-72 xl:ml-72 ml-3 mr-3 xs:ml-0 xs:mr-0 sm:mr-20 2xl:mr-10 2xl:mt-5 lg:mr-5 sm:ml-20 mb-3 xs:mb-5">
          <div className="lg:grid hidden grid-cols-2 lg:grid-cols-4 gap-2 mx-auto xs:mx-0 xs:gap-5 2xl:gap-10 mt-3 xs:mt-5 2xl:ml-10 lg:mr-0 xs:mr-5 xs:ml-5">
            <div className=" bg-white flex items-center rounded-xl gap-3 xl:gap-3 text-black 2xl:p-6 p-3 xs:p-3">
              <div className="w-12 h-12 2xl:w-20 2xl:h-20 hidden xl:flex justify-center items-center bg-blue-100 text-blue-700 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-7 2xl:size-14"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clip-rule="evenodd"
                  />
                  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                </svg>
              </div>
              <div>
                <div className="lg:text-sm text-gray-500 2xl:text-3xl text-base xs:text-base font-semibold">
                  TOTAL VERIFICATIONS
                </div>
                <div className=" lg:text-2xl mt-2 xl:mt-0 xl:text-3xl 2xl:text-5xl text-3xl font-bold">
                  {totalVerifications}
                </div>
              </div>
            </div>
            <div className=" bg-white flex items-center rounded-xl gap-3 text-black 2xl:p-6 p-3 xs:p-3">
              <div className="w-12 h-12 2xl:w-20 2xl:h-20 hidden xl:flex justify-center items-center bg-blue-100 text-blue-700 rounded-md">
                <IoDocumentAttachSharp className="size-7 2xl:size-14 " />
              </div>
              <div>
                <div className="lg:text-sm text-gray-500 2xl:text-3xl text-base xs:text-base font-semibold">
                  ISSUED DOCUMENTS
                </div>
                <div className=" lg:text-2xl mt-2 xl:mt-0 xl:text-3xl 2xl:text-5xl text-3xl font-bold">
                  {totalDocuments}
                </div>
              </div>
            </div>
            <div className=" bg-white flex items-center rounded-xl gap-3 text-black 2xl:p-6 p-3 xs:p-3">
              <div className="w-12 h-12 2xl:w-20 2xl:h-20 hidden xl:flex justify-center items-center bg-green-100 text-green-700 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-7 2xl:size-14"
                >
                  <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
                  <path
                    fill-rule="evenodd"
                    d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z"
                    clip-rule="evenodd"
                  />
                  <path d="M12 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
                </svg>
              </div>
              <div>
                <div className="lg:text-sm text-gray-500 2xl:text-3xl text-base xs:text-base font-semibold">
                  VERIFIED ORGS
                </div>
                <div className=" lg:text-2xl mt-2 xl:mt-0 xl:text-3xl 2xl:text-5xl text-3xl font-bold">
                  {totalVerifiedOrgs}
                </div>
              </div>
            </div>
            <div className=" bg-white flex items-center rounded-xl gap-3 text-black 2xl:p-6 p-3 xs:p-3">
              <div className="w-12 h-12 2xl:w-20 2xl:h-20 hidden xl:flex justify-center items-center bg-[#fffbeb] text-[#d97706] rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6 2xl:size-14"
                >
                  <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                </svg>
              </div>
              <div>
                <div className="lg:text-sm text-gray-500 2xl:text-3xl text-base xs:text-base font-semibold">
                  WALLET BALANCE
                </div>
                <div className=" lg:text-2xl mt-2 xl:mt-0 xl:text-3xl 2xl:text-5xl text-3xl font-bold">
                  {walletBalance} ETH
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:hidden grid-cols-2 lg:grid-cols-4 gap-2 mx-auto xs:mx-0 xs:gap-5 2xl:gap-10 mt-3 xs:mt-5 2xl:ml-10 lg:mr-0 xs:mr-5 xs:ml-5">
            <div className=" bg-white rounded-xl text-black 2xl:p-6 p-3 xs:p-3">
              <div className="lg:text-xl 2xl:text-4xl text-base xs:text-base font-semibold">
                Total Verifications
              </div>
              <div className="mt-4 lg:text-2xl xl:text-4xl 2xl:text-6xl text-3xl font-bold">
                {totalVerifications}
              </div>
            </div>
            <div className=" bg-white rounded-xl text-black 2xl:p-6 p-3 xs:p-3">
              <div className="lg:text-xl text-base 2xl:text-4xl xs:text-base font-semibold">
                Total Issued Documents{" "}
              </div>
              <div className="mt-4 lg:text-2xl xl:text-4xl 2xl:text-6xl text-3xl font-bold">
                {totalDocuments}
              </div>
            </div>
            <div className=" bg-white rounded-xl text-black 2xl:p-6 p-3 xs:p-3">
              <div className="lg:text-xl text-base 2xl:text-4xl xs:text-base font-semibold">
                Verified Organizations
              </div>
              <div className="mt-4 lg:text-2xl xl:text-4xl 2xl:text-6xl text-3xl font-bold">
                {totalVerifiedOrgs}
              </div>
            </div>
            <div className=" bg-white rounded-xl flex flex-col 2xl:text-6xl justify-between text-black 2xl:p-6 p-3 xs:p-3">
              <div className="lg:text-xl text-base 2xl:text-4xl xs:text-base font-semibold">
                Wallet Balance
              </div>
              <div className="mt-4 lg:text-2xl xl:text-4xl 2xl:text-6xl text-3xl font-bold">
                {walletBalance} {userType === "verifier" ? "" : "ETH"}
              </div>
            </div>
          </div>
          <div className="grid xl:grid-cols-3 gap-3 xs:gap-5 2xl:gap-10 2xl:ml-10 2xl:mt-10 mt-3 xs:mt-5 xs:ml-5">
            <div className="bg-white rounded-xl p-6 2xl:p-10 hidden xl:flex lg:flex-col lg:col-span-2">
              <div className="flex flex-col">
                <div className="text-black flex items-center gap-2 font-semibold 2xl:text-5xl text-2xl xl:text-3xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="blue"
                    class="size-6 2xl:size-11"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Quick Actions
                </div>
                <div className="grid grid-cols-3 gap-5 2xl:gap-10 mt-5 2xl:mt-10">
                  <div
                    onClick={() => navigate("/verify")}
                    className="bg-[#f8fafc] group hover:bg-white hover:border-[#d2defd] hover:border-1 border-transparent rounded-2xl hover:scale-110 transition-all ease-in-out duration-200 text-black p-4 xl:p-5 2xl:p-6"
                  >
                    <div className="text-blue-500  flex flex-col justify-center items-start">
                      <div className="w-8 h-8 xl:w-10 xl:h-10 2xl:w-16 2xl:h-16 rounded-md group-hover:bg-blue-600 group-hover:text-white duration-75 transition-all ease-in-out flex justify-center items-center bg-[#dbe4fe]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-5 xl:size-6 2xl:size-9"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12 3.75a6.715 6.715 0 0 0-3.722 1.118.75.75 0 1 1-.828-1.25 8.25 8.25 0 0 1 12.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 0 1-1.395-.551A21.69 21.69 0 0 0 18.75 10.5 6.75 6.75 0 0 0 12 3.75ZM6.157 5.739a.75.75 0 0 1 .21 1.04A6.715 6.715 0 0 0 5.25 10.5c0 1.613-.463 3.12-1.265 4.393a.75.75 0 0 1-1.27-.8A6.715 6.715 0 0 0 3.75 10.5c0-1.68.503-3.246 1.367-4.55a.75.75 0 0 1 1.04-.211ZM12 7.5a3 3 0 0 0-3 3c0 3.1-1.176 5.927-3.105 8.056a.75.75 0 1 1-1.112-1.008A10.459 10.459 0 0 0 7.5 10.5a4.5 4.5 0 1 1 9 0c0 .547-.022 1.09-.067 1.626a.75.75 0 0 1-1.495-.123c.041-.495.062-.996.062-1.503a3 3 0 0 0-3-3Zm0 2.25a.75.75 0 0 1 .75.75c0 3.908-1.424 7.485-3.781 10.238a.75.75 0 0 1-1.14-.975A14.19 14.19 0 0 0 11.25 10.5a.75.75 0 0 1 .75-.75Zm3.239 5.183a.75.75 0 0 1 .515.927 19.417 19.417 0 0 1-2.585 5.544.75.75 0 0 1-1.243-.84 17.915 17.915 0 0 0 2.386-5.116.75.75 0 0 1 .927-.515Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>

                      <div className="w-full flex justify-start text-center text-black text-lg xl:text-xl mt-2 2xl:mt-4 2xl:text-4xl font-bold">
                        Verify Document
                      </div>
                      <div className="text-[#97a2b1] text-xs 2xl:text-lg 2xl:mt-1 font-semibold">
                        Check authenticity instantly
                      </div>
                    </div>
                  </div>
                  {userType == "verifier" ? (
                    <div
                      onClick={() => navigate("/#support")}
                      className="bg-[#f8fafc] group hover:bg-white hover:border-[#d2defd] hover:border-1 border-transparent rounded-2xl hover:scale-110 transition-all ease-in-out duration-200 text-black p-4 xl:p-5 2xl:p-6"
                    >
                      <div className="text-blue-500  flex flex-col justify-center items-start">
                        <div className="w-8 h-8 xl:w-10 xl:h-10 2xl:w-16 2xl:h-16 rounded-md group-hover:bg-blue-600 group-hover:text-white duration-75 transition-all ease-in-out flex justify-center items-center bg-[#dbe4fe]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="size-5 xl:size-6 2xl:size-9"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M12 3.75a6.715 6.715 0 0 0-3.722 1.118.75.75 0 1 1-.828-1.25 8.25 8.25 0 0 1 12.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 0 1-1.395-.551A21.69 21.69 0 0 0 18.75 10.5 6.75 6.75 0 0 0 12 3.75ZM6.157 5.739a.75.75 0 0 1 .21 1.04A6.715 6.715 0 0 0 5.25 10.5c0 1.613-.463 3.12-1.265 4.393a.75.75 0 0 1-1.27-.8A6.715 6.715 0 0 0 3.75 10.5c0-1.68.503-3.246 1.367-4.55a.75.75 0 0 1 1.04-.211ZM12 7.5a3 3 0 0 0-3 3c0 3.1-1.176 5.927-3.105 8.056a.75.75 0 1 1-1.112-1.008A10.459 10.459 0 0 0 7.5 10.5a4.5 4.5 0 1 1 9 0c0 .547-.022 1.09-.067 1.626a.75.75 0 0 1-1.495-.123c.041-.495.062-.996.062-1.503a3 3 0 0 0-3-3Zm0 2.25a.75.75 0 0 1 .75.75c0 3.908-1.424 7.485-3.781 10.238a.75.75 0 0 1-1.14-.975A14.19 14.19 0 0 0 11.25 10.5a.75.75 0 0 1 .75-.75Zm3.239 5.183a.75.75 0 0 1 .515.927 19.417 19.417 0 0 1-2.585 5.544.75.75 0 0 1-1.243-.84 17.915 17.915 0 0 0 2.386-5.116.75.75 0 0 1 .927-.515Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>

                        <div className="w-full flex justify-start text-center xl:text-xl text-black text-lg mt-2 2xl:mt-4 2xl:text-4xl font-bold">
                          Connect with us
                        </div>
                        <div className="text-[#97a2b1] text-xs 2xl:text-lg 2xl:mt-1 font-semibold">
                          Use the form for queries
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => navigate("/issue")}
                      className="bg-[#f8fafc] group hover:bg-white hover:border-[#d2defd] hover:border-1 border-transparent rounded-2xl hover:scale-110 transition-all ease-in-out duration-200 text-black p-4 xl:p-5 2xl:p-6"
                    >
                      <div className="text-blue-500  flex flex-col justify-center items-start">
                        <div className="w-8 h-8 xl:w-10 xl:h-10 2xl:w-16 2xl:h-16 rounded-md group-hover:bg-blue-600 group-hover:text-white duration-75 transition-all ease-in-out flex justify-center items-center bg-[#dbe4fe]">
                          <FaStamp className="size-5 2xl:size-9" />
                        </div>

                        <div className="w-full flex justify-start xl:text-xl text-center text-black text-lg mt-2 2xl:mt-4 2xl:text-4xl font-bold">
                          Issue Document
                        </div>
                        <div className="text-[#97a2b1] text-xs 2xl:text-lg 2xl:mt-1 font-semibold">
                          Sign and publish to chain
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    onClick={() => navigate("/about")}
                    className="bg-[#f8fafc] group hover:bg-white hover:border-[#d2defd] hover:border-1 border-transparent rounded-2xl hover:scale-110 transition-all ease-in-out duration-200 text-black p-4 xl:p-5 2xl:p-6"
                  >
                    <div className="text-blue-500  flex flex-col justify-center items-start">
                      <div className="w-8 h-8 xl:w-10 xl:h-10 2xl:w-16 2xl:h-16 rounded-md group-hover:bg-blue-600 group-hover:text-white duration-75 transition-all ease-in-out flex justify-center items-center bg-[#dbe4fe]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-5 xl:size-6 2xl:size-9"
                        >
                          <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                        </svg>
                      </div>

                      <div className="w-full flex justify-start xl:text-xl text-center text-black text-lg mt-2 2xl:mt-4 2xl:text-4xl font-bold">
                        Detailed Guide
                      </div>
                      <div className="text-[#97a2b1] text-xs 2xl:text-lg 2xl:mt-1 font-semibold">
                        Learn how AuthenX works
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-black 2xl:text-5xl 2xl:mt-6 font-semibold xl:mb-2 text-2xl mt-4">
                  Recent Transactions
                </div>
                <div className="grid grid-cols-4 pb-3 border-b-2 border-gray-200 text-left text-lg font-semibold text-gray-500 2xl:mt-10 mt-3">
                  <div className="flex justify-center gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="2xl:size-10 size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    <span className="2xl:text-2xl text-base">Date</span>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="2xl:size-10 size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                      />
                    </svg>
                    <span className="2xl:text-2xl text-base">Action</span>
                  </div>
                  <div className="flex justify-center gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="2xl:size-10 size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <span className="2xl:text-2xl text-base">Status</span>
                  </div>
                  <div className="flex justify-center gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="2xl:size-10 size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                      />
                    </svg>
                    <span className="2xl:text-2xl text-base">Wallet</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div className="min-h-[200px]">
                  {isLoading ? (
                    <div className="text-gray-700 h-full flex justify-center items-center w-full">
                      <Loader />
                    </div>
                  ) : currentDocs.length === 0 ? (
                    <div className="text-gray-700 p-4 w-full flex justify-center">
                      No recent transactions found.
                    </div>
                  ) : (
                    currentDocs.map((tx, index) => (
                      <TransactionRow
                        key={index}
                        transaction={{
                          date: tx.date,
                          action: tx.action,
                          status: tx.status,
                          wallet: tx.walletAddress,
                        }}
                      />
                    ))
                  )}
                </div>
                <div className="flex justify-center bg-blue-500 2xl:p-4 p-1 rounded-b-2xl items-center gap-3">
                  <div className="flex p-1 2xl:p-2 rounded-xl bg-white">
                    <div
                      onClick={prevPage}
                      className="p-2 text-black cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                      </svg>
                    </div>
                    <div
                      onClick={() => handlePageChange(1)}
                      className={`px-2 my-1 flex text-sm ${currentPage == 1 ? "bg-blue-700 text-white" : "bg-gray-200"} justify-center text-black items-center rounded-lg mr-2`}
                    >
                      1
                    </div>
                    {totalTransactionData > 1 && (
                      <div
                        onClick={() => handlePageChange(2)}
                        className={`px-2 my-1 ${currentPage == 2 ? "bg-blue-700 text-white" : "bg-gray-200"} text-black flex text-sm justify-center items-center rounded-lg mr-2`}
                      >
                        2
                      </div>
                    )}
                    {totalTransactionData > 2 && (
                      <div
                        onClick={() => handlePageChange(3)}
                        className={`px-2 my-1 ${currentPage == 3 ? "bg-blue-700 text-white" : "bg-gray-200"} flex text-sm text-black justify-center items-center rounded-lg mr-2`}
                      >
                        3
                      </div>
                    )}
                    <div className="px-2 my-1 flex text-sm justify-center items-center rounded-lg text-black bg-gray-200 mr-2">
                      ...
                    </div>
                    <div
                      onClick={() => handlePageChange(totalTransactionData)}
                      className="px-2 my-1 flex text-sm justify-center items-center text-black rounded-lg bg-gray-200 mr-2"
                    >
                      {totalTransactionData}
                    </div>
                    <div
                      onClick={nextPage}
                      className="pr-2 py-2 text-black cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex xl:flex-col rounded-xl 2xl:gap-10 h-full md:gap-4 xs:mr-5 lg:mr-0">
              <div className="flex-1 bg-white rounded-xl 2xl:p-10 p-5 lg:p-6">
                <div className="text-black xs:font-semibold font-bold flex justify-center 2xl:text-4xl text-3xl xs:text-2xl">
                  Welcome , {userName}
                </div>
                <div className="text-sm text-white bg-black p-2 2xl:p-3 rounded-2xl 2xl:mt-7 mt-2 flex justify-around">
                  <div className="flex gap-2 xs:text-md text-sm 2xl:text-2xl justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-5 2xl:size-8 xs:size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                      />
                    </svg>
                    {dateTime.toLocaleDateString()}
                  </div>
                  <div className="flex gap-2 xs:text-lg 2xl:text-2xl text-sm justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-5 2xl:size-8 xs:size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <div>{dateTime.toLocaleTimeString()}</div>
                  </div>
                </div>
                {userType === "verifier" && (
                  <div>
                    <div className="w-full flex 2xl:mt-8 mt-5 lg:mt-3 bg-gray-100 rounded-xl ">
                      <div className="w-1/2 flex justify-center transition-all duration-300 ease-in-out p-2 lg:p-1 2xl:p-2 rounded-xl text-lg bg-blue-500 text-white">
                        Verifier
                      </div>
                      <div className="w-1/2 flex justify-center transition-all duration-300 ease-in-out p-2 lg:p-1 2xl:p-2 rounded-xl text-lg bg-gray-100 text-black">
                        Organization
                      </div>
                    </div>
                    <div className="text-black mt-5 lg:mt-3 2xl:mt-5 text-wrap text-[16px] 2xl:text-xl xs:text-lg lg:text-sm">
                      As a verifier, you can quickly verify documents with trust
                      and transparency.
                    </div>
                  </div>
                )}
                {userType === "organization" && (
                  <div>
                    <div className="w-full flex 2xl:mt-8 mt-5 bg-gray-100 rounded-xl ">
                      <div className="w-1/2 flex justify-center transition-all duration-300 ease-in-out p-2 rounded-xl text-lg bg-gray-100 text-black">
                        Verifier
                      </div>
                      <div className="w-1/2 flex justify-center transition-all duration-300 ease-in-out p-2 rounded-xl text-lg bg-blue-500 text-white">
                        Organization
                      </div>
                    </div>
                    <div className="text-black mt-5 2xl:text-lg text-wrap text-md">
                      As an organization, you can issue and manage verified
                      documents with ease and reliability.{" "}
                      <span className="hidden 2xl:flex">
                        AuthenX simplifies the process of creating, validating,
                        and tracking documents on the blockchain. Each issued
                        record is securely stored and easily verifiable,
                        ensuring authenticity and eliminating fraud.
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {userType === "verifier" && (
                <div className="flex-1 hidden min-h-[310px] 2xl:min-h-[550px] lg:flex">
                  <VerificationSnapshot />
                </div>
              )}
              {userType === "organization" ? (
                kycLoading ? (
                  <KycSkeleton />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                    className={`bg-white rounded-2xl 2xl:p-8 p-5 shadow-sm border ${kycStatus === "Approved" ? "border-green-100 py-9" : "border-red-100"}`}
                  >
                    <p className="text-center text-xs font-bold tracking-widest text-gray-400 uppercase">
                      KYC Status
                    </p>

                    {kycStatus === "Approved" && (
                      <div className="flex flex-col items-center justify-center mt-3">
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
                          Your KYC is approved. You have full permissions to
                          issue verified documents to the blockchain.
                        </p>
                        <Button
                          onClick={() => navigate("/issue")}
                          variant="primary"
                          size="md"
                          className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg w-full justify-center py-2.5 mt-4 flex gap-2 items-center text-sm"
                        >
                          Issue Now
                        </Button>
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
                          Your KYC verification is still pending. Please
                          complete the process to unlock the ability to issue
                          documents.
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
                )
              ) : null}
            </div>
            <div className="bg-white rounded-xl xs:p-4 lg:p-6 p-3 xl:hidden xs:mr-5 lg:mr-0 xl:col-span-2">
              <div className="flex flex-1 flex-col">
                <div className="text-black flex justify-center font-semibold text-2xl">
                  Quick Actions
                </div>
                <div className="grid grid-cols-3 gap-3 mt-5">
                  <div
                    onClick={() => navigate("/verify")}
                    className="bg-blue-100 hover:bg-gray-100 rounded-2xl hover:scale-110 transition-all ease-in-out duration-200 text-black px-3 xs:px-2 p-2"
                  >
                    <div className="text-blue-500 flex flex-col justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-6 lg:size-11 xs:size-8"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <div className="w-1/2 flex justify-center text-center text-black text-[12px] lg:text-lg font-bold xs:text-sm mt-1 xs:font-semibold">
                        Verify Document
                      </div>
                    </div>
                  </div>
                  {userType == "verifier" ? (
                    <div
                      onClick={() => navigate("/#support")}
                      className="bg-blue-100  hover:bg-gray-100 rounded-2xl hover:scale-110 transition-all ease-in-out duration-200 text-black p-2"
                    >
                      <div className="text-blue-500 flex flex-col justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-6 xs:size-8"
                        >
                          <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                          <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                        </svg>
                        <div className="w-1/2 flex justify-center text-center text-black lg:text-lg text-sm mt-1 font-semibold">
                          Connect With Us
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => navigate("/issue")}
                      className="bg-blue-100  hover:bg-gray-100 rounded-2xl hover:scale-110 transition-all ease-in-out duration-200 text-black p-2"
                    >
                      <div className="text-blue-500 flex flex-col justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-11"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                            clip-rule="evenodd"
                          />
                          <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                        </svg>
                        <div className="w-1/2 flex justify-center text-center text-black text-lg mt-1 font-semibold">
                          Issue Document
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    onClick={() => navigate("/about")}
                    className="bg-blue-100  hover:bg-gray-100 rounded-2xl hover:scale-110 transition-all ease-in-out duration-200 text-black p-2"
                  >
                    <div className="text-blue-500 flex flex-col justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="size-6 lg:size-11 xs:size-8"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <div className="w-1/2 flex justify-center text-center text-black lg:text-lg text-sm mt-1 font-semibold">
                        Detailed Guide
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-black font-semibold flex justify-center text-xl mt-4">
                  Recent Transactions
                </div>
                <div className="grid grid-cols-4 gap-4 pb-3 px-4 border-b-2 border-gray-200 text-left text-sm xs:text-base md:text-lg font-semibold text-gray-500 tracking-wider mt-4">
                  <div className="flex justify-center gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="hidden md:flex size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    Date
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="hidden md:flex size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                      />
                    </svg>
                    Action
                  </div>
                  <div className="flex justify-center gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="hidden md:flex size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    Status
                  </div>
                  <div className="flex justify-center gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class=" hidden md:flex size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                      />
                    </svg>
                    Wallet
                  </div>
                </div>
              </div>
              <div>
                {userType === "verifier" ? (
                  <div className="text-gray-700 p-4 w-full text-sm text-center flex justify-center">
                    No blockchain transactions are needed for verifiers.
                  </div>
                ) : isLoading ? (
                  <div className="text-gray-700 flex justify-center items-center p-4 w-full h-full">
                    <Loader />
                  </div>
                ) : currentDocs.length === 0 ? (
                  <div className="text-gray-700 p-4 w-full flex justify-center">
                    No recent transactions found.
                  </div>
                ) : (
                  currentDocs.map((tx, index) => (
                    <TransactionRow
                      key={index}
                      transaction={{
                        date: tx.date,
                        action: tx.action,
                        status: tx.status,
                        wallet: tx.walletAddress,
                      }}
                    />
                  ))
                )}
                <div className="flex justify-center bg-blue-500 p-1 rounded-b-2xl items-center gap-3">
                  <div className="flex p-1 rounded-xl bg-white">
                    <div
                      onClick={prevPage}
                      className="p-2 text-black cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                      </svg>
                    </div>
                    <div
                      onClick={() => handlePageChange(1)}
                      className={`px-2 my-1 flex text-sm ${currentPage == 1 ? "bg-blue-700 text-white" : "bg-gray-200"} justify-center text-black items-center rounded-lg mr-2`}
                    >
                      1
                    </div>
                    {totalTransactionData > 1 && (
                      <div
                        onClick={() => handlePageChange(2)}
                        className={`px-2 my-1 ${currentPage == 2 ? "bg-blue-700 text-white" : "bg-gray-200"} text-black flex text-sm justify-center items-center rounded-lg mr-2`}
                      >
                        2
                      </div>
                    )}
                    {totalTransactionData > 2 && (
                      <div
                        onClick={() => handlePageChange(3)}
                        className={`px-2 my-1 ${currentPage == 3 ? "bg-blue-700 text-white" : "bg-gray-200"} flex text-sm text-black justify-center items-center rounded-lg mr-2`}
                      >
                        3
                      </div>
                    )}
                    <div className="px-2 my-1 flex text-sm justify-center items-center rounded-lg text-black bg-gray-200 mr-2">
                      ...
                    </div>
                    <div
                      onClick={() => handlePageChange(totalTransactionData)}
                      className="px-2 my-1 flex text-sm justify-center items-center text-black rounded-lg bg-gray-200 mr-2"
                    >
                      {totalTransactionData}
                    </div>
                    <div
                      onClick={nextPage}
                      className="pr-2 py-2 text-black cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
