import React, { useContext } from "react";

import logo from "../../images/AuthenXLogo.webp";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { submitKYC } from "../../api";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { RxCross2 } from "react-icons/rx";

const OrgType = [
  { id: 1, label: "Private Limited" },
  { id: 2, label: "Public Limited" },
  { id: 3, label: "Government Organization" },
  { id: 4, label: "Non-Governmental Organization (NGO)" },
  { id: 5, label: "Startup" },
  { id: 6, label: "Educational Institution" },
  { id: 7, label: "Healthcare Institution" },
  { id: 8, label: "Other" },
];

const truncateFileName = (name, maxLength = 20) => {
  if (name.length <= maxLength) return name;

  const extension = name.split(".").pop();
  const baseName = name.slice(0, maxLength);

  return `${baseName}...${extension}`;
};

const countries = [
  { code: "sg", dialCode: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "in", dialCode: "+91", flag: "🇮🇳", name: "India" },
  { code: "us", dialCode: "+1", flag: "🇺🇸", name: "United States" },
  { code: "gb", dialCode: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "au", dialCode: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "ca", dialCode: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "de", dialCode: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "fr", dialCode: "+33", flag: "🇫🇷", name: "France" },
  { code: "cn", dialCode: "+86", flag: "🇨🇳", name: "China" },
  { code: "jp", dialCode: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "ae", dialCode: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "sa", dialCode: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "za", dialCode: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "br", dialCode: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "ru", dialCode: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "id", dialCode: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "my", dialCode: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "th", dialCode: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "vn", dialCode: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "ph", dialCode: "+63", flag: "🇵🇭", name: "Philippines" },
];

const OrgKYC = () => {
  const { currentAccount } = useContext(TransactionContext);
  const [OrgTypeOpen, setOrgTypeOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState({
    id: null,
    label: "Select organization type",
  });
  const [selectedCountry, setSelectedCountry] = useState({
    code: null,
    name: "Select Country",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("userType");

    if (userType !== "organization" && userType !== "admin") {
      toast.error("To register as an organization login as an organization !");
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!orgName) return toast.error("Organization Name is required");
      if (!selectedOrg.id) return toast.error("Organization Type is required");
      if (!officialEmail) return toast.error("Official Email is required");
      if (!address) return toast.error("Registered Address is required");
      if (!selectedCountry.code) return toast.error("Country is required");
      if (!registrationNo)
        return toast.error("Registration Number is required");
      if (!selectedFile) return toast.error("Certificate upload is required");
      if (!fullName) return toast.error("Full Name is required");
      if (!position) return toast.error("Position is required");
      if (!contactNo) return toast.error("Contact Number is required");
      if (!personalEmail) return toast.error("Personal Email is required");

      const formData = new FormData();
      formData.append("orgName", orgName);
      formData.append("orgType", selectedOrg.label);
      formData.append("officialEmail", officialEmail);
      formData.append("website", website);
      formData.append("address", address);
      formData.append("country", selectedCountry.name);
      formData.append("registrationNo", registrationNo);
      formData.append("fullName", fullName);
      formData.append("position", position);
      formData.append("contactNo", contactNo);
      formData.append("personalEmail", personalEmail);
      formData.append("certificate", selectedFile);

      const res = await submitKYC(formData);

      toast.success("KYC submitted successfully!");

      setOrgName("");
      setSelectedOrg({ id: null, label: "Select organization type" });
      setOfficialEmail("");
      setWebsite("");
      setAddress("");
      setSelectedCountry({ code: null, name: "Select Country" });
      setRegistrationNo("");
      setSelectedFile(null);
      setFullName("");
      setPosition("");
      setContactNo("");
      setPersonalEmail("");
      setOrgTypeOpen(false);
      setCountryOpen(false);
    } catch (err) {
      console.log("KYC submission failed : ", err);

      const zodErrors = err.response?.data?.errors;
      if (zodErrors && zodErrors.length > 0) {
        toast.error(zodErrors[0].message);
      } else {
        toast.error("Something went wrong . Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setOrgName("");
    setSelectedOrg({ id: null, label: "Select organization type" });
    setOfficialEmail("");
    setWebsite("");
    setAddress("");
    setSelectedCountry({ code: null, name: "Select Country" });
    setRegistrationNo("");
    setSelectedFile(null);
    setFullName("");
    setPosition("");
    setContactNo("");
    setPersonalEmail("");
    setOrgTypeOpen(false);
    setCountryOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
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

  const fieldClasses =
    "w-full outline-1 outline-gray-200 bg-gray-50 rounded-lg p-3 mt-1.5 text-sm text-black placeholder:text-gray-400 focus-within:outline-2 focus-within:outline-indigo-500 transition-all";
  const labelClasses =
    "text-gray-500 text-xs font-bold uppercase tracking-wide";

  return (
    <div className="w-full h-screen flex flex-col">
      {/* header bar  */}
      <div className="w-full bg-white fixed top-0 flex justify-between items-center px-2 h-[60px]">
        <div className="w-40 h-10">
          <img src={logo} alt="logo" className="w-40 h-10 cursor-pointer" />
        </div>
        <div className="flex justify-center text-white items-center">
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

      {/* sidebar and content */}
      <div className="flex flex-1 w-full h-fit mt-[60px] bg-[#f8fafc]">
        <Sidebar />
        <div className="flex flex-1 flex-col 2xl:ml-96 ml-72 w-full h-full p-4 lg:p-6">
          {/* page header */}
          <div className="mb-5 lg:mb-6 2xl:ml-80">
            <p className="text-black text-2xl lg:text-3xl 2xl:text-4xl font-extrabold">
              Business Verification Form
            </p>
            <p className="mt-1 text-gray-500 2xl:lg font-medium text-sm lg:text-base">
              Please provide accurate information about your organization.
              Verification typically takes 24-48 hours.
            </p>
          </div>

          <div className="grid xl:grid-cols-3 2xl:ml-80 2xl:mr-80 gap-4 lg:gap-6">
            {/* Left form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-4 lg:p-7 shadow-sm"
            >
              {/* info breakdown header */}
              <div className="flex items-center gap-3 pb-5 mb-5 border-b border-gray-100">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 text-white flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-black 2xl:text-2xl font-bold text-base">
                    Information Breakdown
                  </p>
                  <p className="text-gray-400 text-xs font-semibold tracking-wide uppercase mt-0.5">
                    Fields marked with * are required
                  </p>
                </div>
              </div>

              {/*  Section 1: Basic Information  */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <p className="text-black font-bold text-base">
                  Basic Information
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="OrgName" className={labelClasses}>
                    Organization Name *
                  </label>
                  <div className={fieldClasses}>
                    <input
                      autoComplete="off"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full outline-none bg-transparent"
                      type="text"
                      placeholder="Legal entity name"
                      id="OrgName"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="OrgType" className={labelClasses}>
                    Organization Type *
                  </label>
                  <div id="OrgType" className="relative mt-1.5">
                    <div
                      className="w-full flex items-center justify-between text-sm px-3 py-3 cursor-pointer rounded-lg outline-1 outline-gray-200 bg-gray-50 hover:outline-gray-300 transition-colors"
                      onClick={() => setOrgTypeOpen(!OrgTypeOpen)}
                    >
                      <span
                        className={
                          selectedOrg.id ? "text-black" : "text-gray-400"
                        }
                      >
                        {selectedOrg.label}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`size-4 text-gray-400 transition-transform ${OrgTypeOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    {OrgTypeOpen && (
                      <div className="absolute flex flex-col top-full mt-2 max-h-48 left-0 w-full p-1 bg-white outline-1 outline-gray-200 shadow-lg overflow-y-scroll rounded-xl z-10">
                        {OrgType.map((type) => (
                          <div
                            key={type.id}
                            className="flex items-center rounded-lg gap-2 px-3 py-2 m-0.5 cursor-pointer hover:bg-indigo-50 transition-colors"
                            onClick={() => {
                              setSelectedOrg(type);
                              setOrgTypeOpen(false);
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
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Official Email *
                  </label>
                  <div className={fieldClasses}>
                    <input
                      autoComplete="off"
                      value={officialEmail}
                      onChange={(e) => setOfficialEmail(e.target.value)}
                      className="w-full outline-none bg-transparent"
                      type="text"
                      placeholder="contact@organization.com"
                      id="email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="website" className={labelClasses}>
                    Website URL
                  </label>
                  <div className={fieldClasses}>
                    <input
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full outline-none bg-transparent"
                      type="text"
                      placeholder="https://www.example.com"
                      id="website"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="address" className={labelClasses}>
                  Registered Address *
                </label>
                <div className="outline-1 outline-gray-200 bg-gray-50 w-full rounded-lg h-24 p-3 mt-1.5 focus-within:outline-2 focus-within:outline-indigo-500 transition-all">
                  <textarea
                    autoComplete="off"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="address"
                    className="w-full h-full text-sm text-black bg-transparent outline-none resize-none placeholder:text-gray-400"
                    placeholder="Full legal address as per registration documents"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="country" className={labelClasses}>
                    Country of Registration *
                  </label>
                  <div id="country" className="relative mt-1.5">
                    <div
                      className="w-full flex items-center justify-between text-sm px-3 py-3 cursor-pointer rounded-lg outline-1 outline-gray-200 bg-gray-50 hover:outline-gray-300 transition-colors"
                      onClick={() => setCountryOpen(!countryOpen)}
                    >
                      <span className="flex gap-2 items-center">
                        {selectedCountry.code && (
                          <span className="text-lg">
                            {selectedCountry.flag}
                          </span>
                        )}
                        <span
                          className={
                            selectedCountry.code
                              ? "text-black"
                              : "text-gray-400"
                          }
                        >
                          {selectedCountry.name}
                        </span>
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`size-4 text-gray-400 transition-transform ${countryOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    {countryOpen && (
                      <div className="absolute flex flex-col top-full mt-2 max-h-48 left-0 w-full p-1 bg-white outline-1 outline-gray-200 shadow-lg overflow-y-scroll rounded-xl z-10">
                        {countries.map((type) => (
                          <div
                            key={type.code}
                            className="flex items-center rounded-lg gap-2 px-3 py-2 m-0.5 cursor-pointer hover:bg-indigo-50 transition-colors"
                            onClick={() => {
                              setSelectedCountry(type);
                              setCountryOpen(false);
                            }}
                          >
                            <span className="text-lg">{type.flag}</span>
                            <span className="text-sm text-gray-700">
                              {type.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/*  Section 2: Legal Documentation */}
              <div className="flex items-center gap-2.5 mb-4 mt-8 pt-6 border-t border-gray-100">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <p className="text-black font-bold text-base">
                  Legal Documentation
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="registrationNo" className={labelClasses}>
                    Registration Number / ID *
                  </label>
                  <div className={fieldClasses}>
                    <input
                      autoComplete="off"
                      value={registrationNo}
                      onChange={(e) => setRegistrationNo(e.target.value)}
                      className="w-full outline-none bg-transparent"
                      type="text"
                      placeholder="e.g. CRN-9921-X"
                      id="registrationNo"
                    />
                  </div>
                  <p className="text-gray-400 text-xs mt-1.5">
                    The official ID provided by your local business registry.
                  </p>
                </div>

                <div>
                  <label htmlFor="certificate" className={labelClasses}>
                    Upload Registration Certificate *
                  </label>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("document").click()}
                    className={`2xl:mt-3 mt-2 flex flex-col items-start justify-start gap-2 border-2 border-dashed rounded-xl  cursor-pointer overflow-hidden transition-colors ${
                      isDragging
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-300 hover:border-gray-400 bg-gray-50/50"
                    }`}
                  >
                    {selectedFile ? (
                      <div className="flex w-full justify-between items-center p-4 lg:p-4 2xl:p-7 bg-green-50">
                        <div className="flex gap-3">
                          <span className="xl:w-11 xl:h-11 2xl:w-14 2xl:h-14 lg:w-8 lg:h-8 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 w-4 h-4 md:w-6 md:h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          <div className="flex flex-col justify-center">
                            <p className="text-gray-600 text-[11px] xl:text-sm 2xl:text-base md:text-sm truncate font-bold">
                              {truncateFileName(selectedFile.name)}
                            </p>
                            <p className="xl:text-xs 2xl:text-[14px] text-[9px] md:text-xs flex gap-2 font-semibold text-gray-400">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                              MB <span>Ready to upload</span>
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
                </div>
              </div>

              {/* Section 3: Authorized Representative */}
              <div className="flex items-center gap-2.5 mb-4 mt-8 pt-6 border-t border-gray-100">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <p className="text-black font-bold text-base">
                  Authorized Representative
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className={labelClasses}>
                    Full Name *
                  </label>
                  <div className={fieldClasses}>
                    <input
                      autoComplete="off"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full outline-none bg-transparent"
                      type="text"
                      placeholder="Representative's name"
                      id="fullName"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="position" className={labelClasses}>
                    Position / Title *
                  </label>
                  <div className={fieldClasses}>
                    <input
                      autoComplete="off"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full outline-none bg-transparent"
                      type="text"
                      placeholder="e.g. Director, CEO"
                      id="position"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="contactNo" className={labelClasses}>
                    Contact Number *
                  </label>
                  <div className={fieldClasses}>
                    <input
                      autoComplete="off"
                      value={contactNo}
                      onChange={(e) => setContactNo(e.target.value)}
                      className="w-full outline-none bg-transparent"
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      id="contactNo"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="personalEmail" className={labelClasses}>
                    Personal / Work Email *
                  </label>
                  <div className={fieldClasses}>
                    <input
                      autoComplete="off"
                      value={personalEmail}
                      onChange={(e) => setPersonalEmail(e.target.value)}
                      className="w-full outline-none bg-transparent"
                      type="text"
                      placeholder="representative@org.com"
                      id="personalEmail"
                    />
                  </div>
                </div>
              </div>

              {/* actions */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors px-6 py-3 text-sm"
                    >
                      Cancel &amp; Return
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-indigo-600 to-blue-500 flex gap-2 items-center py-3 text-white hover:shadow-lg hover:shadow-indigo-200 transition-shadow px-6 font-semibold rounded-xl text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
                      </svg>
                      Submit for Verification
                    </button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Right: verification path and trust panels */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 text-white flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                    </svg>
                  </span>
                  <p className="text-black font-bold text-base">
                    Verification Path
                  </p>
                </div>

                <div className="flex flex-col">
                  {[
                    {
                      title: "Submission",
                      body: "Complete the form and attach legal docs.",
                      active: true,
                    },
                    {
                      title: "Compliance Review",
                      body: "Our team validates your identity.",
                      active: false,
                    },
                    {
                      title: "Verified Badge",
                      body: "Unlock full issuance capabilities.",
                      active: false,
                    },
                  ].map((step, i, arr) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                            step.active
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {i + 1}
                        </span>
                        {i < arr.length - 1 && (
                          <div className="w-px flex-1 bg-gray-200 my-1" />
                        )}
                      </div>
                      <div
                        className={`pb-6 ${i === arr.length - 1 ? "pb-0" : ""}`}
                      >
                        <p
                          className={`font-bold text-sm ${step.active ? "text-black" : "text-gray-400"}`}
                        >
                          {step.title}
                        </p>
                        <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
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
                    Privacy First Data Handling
                  </p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    Your KYC data is encrypted at rest and in transit. We only
                    use this information to verify your entity's legitimacy on
                    the blockchain network.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
              >
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-3">
                  Common Questions
                </p>

                <div className="mb-3">
                  <p className="text-black font-bold text-sm">
                    What documents are accepted?
                  </p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    Official Business Licenses, Certificates of Incorporation,
                    or Tax Registry documents.
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-black font-bold text-sm">
                    How long does it take?
                  </p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    Typically reviewed within 24-48 business hours.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/#support")
                  }
                  className="w-full border border-gray-200 hover:bg-gray-50 transition-colors rounded-lg py-2.5 text-sm font-semibold text-gray-700"
                >
                  Talk to Support
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgKYC;
