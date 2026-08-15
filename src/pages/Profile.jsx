import React, { useContext, useState, useRef } from "react";
import logo from "../../images/AuthenXLogo.webp";
import Sidebar from "../components/Sidebar";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { motion } from "motion/react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

const Profile = () => {
  const { currentAccount } = useContext(TransactionContext);
  const userType = localStorage.getItem("userType");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  // placeholder profile data — wire these up to your real user/org
  // records once those endpoints exist. Structure mirrors what the
  // reference design displays.
  const profile = {
    fullName: "Jane Doe",
    email: "jane.doe@authenx.io",
    role: userType === "organization" ? "Organization Admin" : "Verifier",
    roleLabel: userType === "organization" ? "Organization Member" : "Verifier",
    status: "Active",
    createdAt: "Oct 12, 2025",
  };

  const org = {
    verified: true,
    walletAddress: currentAccount || "0x0000000000000000000000000000000000000000",
    kycStatus: "Fully Compliant",
    documentsIssued: 1248,
    documentsVerified: 842,
    activeCredentials: 12,
  };

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.4 },
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    toast.success("Photo updated — save your changes to keep it.");
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    toast.info("Photo removed");
  };

  const copyWallet = () => {
    navigator.clipboard.writeText(org.walletAddress);
    toast.success("Wallet address copied");
  };

  return (
    <div className="w-screen h-full flex flex-col text-white bg-[#f8fafc]">
      {/* ---------- header bar: same pattern as UserGuides ---------- */}
      <div className="w-full bg-white fixed top-0 flex border-b-gray-300 border-1 justify-between items-center z-60 px-2 h-[60px]">
        <div className="xl:hidden flex text-black items-center relative">
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
            <div className="text-white hidden xl:flex justify-center items-center gap-2 font-semibold outline-1 outline-gray-500 text-lg px-5 py-1 mr-5 bg-gray-500 rounded-3xl ">
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

          <div className="border-1 rounded-full lg:h-12 lg:w-12 w-6 h-6 bg-gray-700 flex justify-center items-center overflow-hidden">
            {avatarPreview ? (
              <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
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
            )}
          </div>
        </div>
      </div>

      {/* ---------- sidebar + content: same pattern as UserGuides ---------- */}
      <div className="flex flex-1 mt-[60px] 2xl:ml-100 min-h-screen 2xl:mr-100 bg-[#f8fafc]">
        <div className="hidden xl:block">
          <Sidebar />
        </div>
        {toggleMenu && (
          <div className="absolute xl:hidden top-[60px] left-0 w-60 h-screen flex animate-slide-in bg-white z-50 shadow-xl">
            <Sidebar />
          </div>
        )}

        <div className="flex flex-1 justify-center xl:ml-96 2xl:ml-130 2xl:mr-0 xl:mr-9 lg:mb-6">
          <div className="ml-3 xs:ml-6 md:ml-10 md:mr-10 lg:ml-23 xl:ml-15 mt-4 lg:mt-6 2xl:m-10 w-full flex bg-[#f8fafc] flex-col gap-6 lg:gap-8 mr-3 xs:mr-6 lg:mr-10">

            {/* page header */}
            <div>
              <p className="text-2xl lg:text-3xl font-extrabold text-black">Account Settings</p>
              <p className="text-gray-500 text-sm lg:text-base mt-1">Manage your profile information and account preferences.</p>
            </div>

            <div className="flex w-full flex-row gap-4 lg:gap-6 2xl:gap-8 items-start">

              {/* ---------- Left: avatar card ---------- */}
              <motion.div
                {...fadeUp}
                className="bg-white border border-gray-200 rounded-2xl py-8 px-10 shadow-sm flex flex-col items-center text-center"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-fuchsia-400 to-cyan-400" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                      <path fillRule="evenodd" d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9ZM9.53 4.72a2.25 2.25 0 0 1 1.591-.659l1.758 0a2.25 2.25 0 0 1 1.591.659l.879.879c.148.148.34.243.548.27l1.68.223a2.25 2.25 0 0 1 1.949 1.949l.223 1.68c.027.208.122.4.27.548l.879.879a2.25 2.25 0 0 1 0 3.182l-.879.879a.913.913 0 0 0-.27.548l-.223 1.68a2.25 2.25 0 0 1-1.949 1.949l-1.68.223a.913.913 0 0 0-.548.27l-.879.879a2.25 2.25 0 0 1-3.182 0l-.879-.879a.913.913 0 0 0-.548-.27l-1.68-.223a2.25 2.25 0 0 1-1.949-1.949l-.223-1.68a.913.913 0 0 0-.27-.548l-.879-.879a2.25 2.25 0 0 1 0-3.182l.879-.879c.148-.148.243-.34.27-.548l.223-1.68a2.25 2.25 0 0 1 1.949-1.949l1.68-.223a.913.913 0 0 0 .548-.27l.879-.879Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white text-[10px] font-bold tracking-wide">CHANGE</span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>

                <p className="text-black font-bold text-lg mt-4 2xl:mt-6">{profile.fullName}</p>
                <p className="text-indigo-600 text-xs font-bold uppercase tracking-wide mt-0.5">{profile.roleLabel}</p>

                <button
                  onClick={() => fileInputRef.current.click()}
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors mt-5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 7.5 12 3m0 0L7.5 7.5M12 3v13.5" />
                  </svg>
                  Upload New Photo
                </button>

                <button
                  onClick={handleRemovePhoto}
                  className="text-red-500 text-sm font-semibold mt-3 hover:text-red-600 transition-colors"
                >
                  Remove Photo
                </button>

                <p className="text-gray-400 text-xs mt-4">JPG, GIF or PNG. Max size of 800K</p>
              </motion.div>

              {/* ---------- Right: info cards ---------- */}
              <div className=" flex flex-col gap-4 lg:gap-6 2xl:gap-8">

                {/* Personal Information */}
                <motion.div
                  {...fadeUp}
                  className="bg-white border border-gray-200 rounded-2xl p-6 2xl:p-8 shadow-sm"
                >
                  <p className="text-black font-bold text-lg pb-4 mb-5 border-b border-gray-100">Personal Information</p>

                  <div className="grid sm:grid-cols-2 gap-x-30 gap-y-8 2xl:mt-6 mr-20">
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Full Name</p>
                      <p className="text-black font-semibold text-sm mt-2">{profile.fullName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Email Address</p>
                      <p className="text-black font-semibold text-sm mt-2">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">User Type</p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                        {profile.role}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Account Status</p>
                      <p className="flex items-center gap-1.5 text-black font-semibold text-sm mt-2">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        {profile.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Account Created At</p>
                      <p className="text-black font-semibold text-sm mt-1">{profile.createdAt}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Organization Profile — organizations only */}
                {userType === "organization" && (
                  <motion.div
                    {...fadeUp}
                    className="bg-white border border-gray-200 rounded-2xl p-6 2xl:p-8 shadow-sm"
                  >
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                      <p className="text-black font-bold text-lg">Organization Profile</p>
                      {org.verified && (
                        <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="text-gray-400 text-[11px] font-bold uppercase 2xl:mt-6 tracking-wide mb-2">Wallet Address</p>
                    <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-4 py-4 mb-8">
                      <span className="font-mono text-xs text-gray-700 truncate font-semibold">{org.walletAddress}</span>
                      <button onClick={copyWallet} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 2xl:gap-y-8">
                      <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">KYC Status</p>
                        <p className="text-green-600 font-bold text-sm mt-2">{org.kycStatus}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Documents Issued</p>
                        <p className="text-black font-bold text-sm mt-2">{org.documentsIssued.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Documents Verified</p>
                        <p className="text-black font-bold text-sm mt-2">{org.documentsVerified.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Active Credentials</p>
                        <p className="text-black font-bold text-sm mt-2">{org.activeCredentials}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;