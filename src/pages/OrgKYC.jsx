import React, { useContext } from 'react'
import { Button } from '../components';

import logo from "../../images/AuthenXLogo.png"
import Sidebar from '../components/Sidebar';
import { useState , useEffect } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import {shortenAddress} from "../utils/shortenAddress"
import { submitKYC } from '../../api';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const OrgType = [
  { id: 1, label: "Private Limited" },
  { id: 2, label: "Public Limited" },
  { id: 3, label: "Government Organization" },
  { id: 4, label: "Non-Governmental Organization (NGO)" },
  { id: 5, label: "Startup" },
  { id: 6, label: "Educational Institution" },
  { id: 7, label: "Healthcare Institution" },
  { id: 8, label: "Other" }
];

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
  { code: "ph", dialCode: "+63", flag: "🇵🇭", name: "Philippines" }
];


const OrgKYC = () => {
    const {currentAccount} = useContext(TransactionContext);
    const [OrgTypeOpen , setOrgTypeOpen] = useState(false);
    const [countryOpen , setCountryOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState({
        id: null,
        label: "Select organization type"
        });
    const [selectedCountry , setSelectedCountry] = useState({
        code : null,
        name : "Select Country" 
    })
    const [selectedFile , setSelectedFile] = useState(null);
    const [isDragging , setIsDragging] = useState(false);
    const [orgName, setOrgName] = useState("");
    const [officialEmail, setOfficialEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState("");
    const [registrationNo, setRegistrationNo] = useState("");
    const [fullName, setFullName] = useState("");
    const [position, setPosition] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [personalEmail, setPersonalEmail] = useState("");
    const [loading , setLoading] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
        
        if (!orgName) return toast.error("Organization Name is required");
        if (!selectedOrg.id) return toast.error("Organization Type is required");
        if (!officialEmail) return toast.error("Official Email is required");
        if (!address) return toast.error("Registered Address is required");
        if (!selectedCountry.code) return toast.error("Country is required");
        if (!registrationNo) return toast.error("Registration Number is required");
        if (!selectedFile) return toast.error("Certificate upload is required");
        if (!fullName) return toast.error("Full Name is required");
        if (!position) return toast.error("Position is required");
        if (!contactNo) return toast.error("Contact Number is required");
        if (!personalEmail) return toast.error("Personal Email is required")

        const formData = new FormData();
        formData.append("orgName" , orgName);
        formData.append("orgType" , selectedOrg.label);
        formData.append("officialEmail" , officialEmail);
        formData.append("website" , website);
        formData.append("address" , address);
        formData.append("country" , selectedCountry.name);
        formData.append("registrationNo" , registrationNo );
        formData.append("fullName" , fullName);
        formData.append("position" , position);
        formData.append("contactNo" , contactNo);
        formData.append("personalEmail" , personalEmail);
        formData.append("certificate" , selectedFile);

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

        }catch (err){
        console.log("KYC submission failed : " , err);

        const zodErrors = err.response?.data?.errors;
        if(zodErrors && zodErrors.length > 0){
            toast.error(zodErrors[0].message);
        }else{
            toast.error("Something went wrong . Please try again");
        }
        } finally {
            setLoading(false);
        }
    }

    const handleCancel =  (e) => {
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
    }


     const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setSelectedFile(file);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if(file){
            setSelectedFile(file);
        }
    }

    return (
        <div className='w-full h-screen flex flex-col'>
            <div className='w-full bg-white fixed top-0 flex justify-between items-center px-2 h-[60px]'>
                <div className='w-40 h-10'>
                    <img src={logo} alt="logo" className='w-40 h-10 cursor-pointer' />
                </div>
                <div className='flex justify-center text-white items-center'>
                    <div className='text-white flex justify-center items-center gap-2 font-semibold outline-1 outline-gray-500 text-lg px-5 py-1 mr-5 bg-gray-500 rounded-3xl '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                        </svg>
                    {shortenAddress(currentAccount)}</div>
                    <div className='border-1 rounded-full h-12 w-12 bg-gray-700 flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className='flex flex-1 w-full h-fit mt-[60px] bg-gray-300'> 
                 <Sidebar />
                 <div className='flex flex-1 flex-col  2xl:ml-96 ml-72 w-full h-full'>
                 <div className='flex flex-col flex-1 h-full lg:m-2 xl:m-5 bg-white rounded-2xl'>
                 <div className='w-full flex gap-3 bg-blue-700 rounded-t-2xl items-center 2xl:p-8 p-6'>
                 <div className='bg-[#4d72e1] flex items-center justify-center text-white px-3 py-3 rounded-lg'>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 2xl:size-10">
                 <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                 <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clip-rule="evenodd" />
                 </svg>
                 </div>
                 <div className='flex flex-col'>
                    <div className='text-white text-3xl 2xl:text-5xl font-semibold'>KYC Information Form (Organization)</div>
                    <div className='text-white 2xl:text-lg text-base'>Please provide accurate information for verification purpose</div>
                 </div>
                 </div>
                 <div className='p-6 2xl:p-8 flex justify-center lg:flex-col xl:flex-row gap-8'>
                 <div className='flex flex-col justify-center w-fit'>
                    <div className='flex gap-3 items-center'>
                    <div className='bg-blue-700 text-white p-1 rounded-full font-bold flex justify-center items-center 2xl:w-[28px] 2xl:h-[28px] text-sm w-[24px] h-[24px]'>1</div>
                    <div className='text-black 2xl:text-3xl font-bold text-xl'>Basic Information</div>
                    </div>
                    <div className="mt-4 2xl:mt-6 flex gap-6 justify-start">
                    <div className='flex flex-col gap-2'>
                    <label htmlFor="OrgName" className='text-black 2xl:text-xl font-semibold'>Organization Name *</label>
                    <div className="flex gap-0 w-80 2xl:w-96 outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input autoComplete='off' value={orgName} onChange={(e) => setOrgName(e.target.value)} className="w-full outline-none mt-0 text-black " type="text" placeholder="Enter Organization Name" id='OrgName' />
                    </div>
                    </div>
                   <div className='flex flex-col gap-2'>
                    <label htmlFor="OrgType" className='text-black 2xl:text-xl  font-semibold'>Organization Type *</label>
                    <div id='OrgType' className="flex gap-0 outline-1 w-80 2xl:w-96 outline-gray-400 rounded-xl relative">
                    <div 
                    className="w-full flex items-center justify-between h-12 text-lg px-3 py-3 cursor-pointer rounded-xl outline-1 outline-gray-400"
                    onClick={() => setOrgTypeOpen(!OrgTypeOpen)}
                     >
                    <span className="text-black">{selectedOrg.label}</span>
                    <span className='text-black'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                    >
                        <path
                        fillRule="evenodd"
                        d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                        />
                    </svg>
                   </span>
                 </div>
                {OrgTypeOpen && (
                <div className="absolute flex flex-col text-black top-full mt-2 max-h-48 left-0 w-80 p-1  bg-white outline-1 outline-gray-400 overflow-y-scroll rounded-xl ">
                {OrgType.map((type) => (
                    <div
                    key={type.id}
                    className="flex items-center text-black rounded-xl gap-2 px-3 py-2 m-1 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                        setSelectedOrg(type);
                        setOrgTypeOpen(false);
                    }}
                    >
                    <span className="text-lg text-gray-500">{type.label}</span>
                    </div>
                    ))}
                </div>
                  )}
                </div>

                    </div>
                    </div>
                    <div className="mt-4 2xl:mt-6 flex gap-6 text-black justify-start">
                    <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='text-black 2xl:text-xl font-semibold'>Official Email *</label>
                    <div className="flex gap-0 w-80 2xl:w-96 outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input autoComplete='off' value={officialEmail} onChange={(e) => setOfficialEmail(e.target.value)} className="w-full outline-none mt-0 text-black " type="text" placeholder="organization@example.com" id='email' />
                    </div>
                    </div>
                     <div className='flex flex-col gap-2'>
                    <label htmlFor="website" className='text-black 2xl:text-xl font-semibold'>Website URL</label>
                    <div className="flex gap-0 w-80 2xl:w-96 outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input autoComplete='off' value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full outline-none mt-0 text-black " type="text" placeholder="https://www.example.com" id='website' />
                    </div>
                    </div>
                    </div>
                    <div className='flex flex-col h-fit gap-2 2xl:mt-6 mt-4'>
                    <label htmlFor="address" className='text-black 2xl:text-xl font-semibold'>Registered Address *</label>
                    <div className="outline-1 outline-gray-400 w-full rounded-xl 2xl:h-40 h-24 p-3">
                    <textarea autoComplete='off' value={address} onChange={(e) => setAddress(e.target.value)} id='address' className=" w-full h-full text-black outline-none placeholder:top-1" type="text" placeholder="Enter complete registered address " />
                    </div>
                    </div>
                    <div className="mt-4 2xl:mt-6 flex  gap-6 justify-start">
                   <div className='flex flex-col gap-2'>
                    <label htmlFor="country" className='text-black 2xl:text-xl font-semibold'>Country of Registration *</label>
                    <div id='country' className="flex gap-0 outline-1 w-80 text-black outline-gray-400 rounded-xl relative">
                    <div 
                    className="w-full flex items-center justify-between text-black h-12 text-lg px-3 py-3 cursor-pointer rounded-xl outline-1 outline-gray-400"
                    onClick={() => setCountryOpen(!countryOpen)}
                     >
                    <span className="text-black flex gap-2 items-center">
                    <div className='text-2xl'>
                    {selectedCountry.flag}
                    </div>
                    <div>
                    {selectedCountry.name}
                    </div>
                    </span>
                    <span className='text-black'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                    >
                        <path
                        fillRule="evenodd"
                        d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                        />
                    </svg>
                   </span>
                 </div>
                {countryOpen && (
                <div className="absolute flex text-black flex-col top-full mt-2 max-h-48 left-0 w-80 p-1  bg-white outline-1 outline-gray-400 overflow-y-scroll rounded-xl ">
                {countries.map((type) => (
                    <div
                    key={type.code}
                    className="flex items-center text-black rounded-xl gap-2 px-3 py-2 m-1 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                        setSelectedCountry(type);
                        setCountryOpen(false);
                    }}
                    >
                    <span className="text-lg text-gray-500 flex gap-2 items-center">
                    <div className='text-2xl'>
                    {type.flag}
                    </div>
                    <div>
                    {type.name}
                    </div>    
                    </span>
                    </div>
                    ))}
                </div>
                  )}
                </div>

                    </div>
                    </div>
                 </div>
                 <div className='flex flex-col w-full'>
                    <div className='flex gap-3 items-center'>
                    <div className='bg-blue-700 p-1 rounded-full 2xl:w-[28px] 2xl:h-[28px] font-bold flex text-white justify-center items-center text-sm w-[24px] h-[24px]'>2</div>
                    <div className='text-black 2xl:text-3xl font-bold text-xl'>Legal Information</div>
                    </div>
                    <div className="mt-4 2xl:mt-6 flex gap-6 justify-start">
                    <div className='flex flex-col gap-2 lg:w-full 2xl:w-96 xl:w-full'>
                    <label htmlFor="registrationNo" className='text-black 2xl:text-xl font-semibold'>Registration Number / Business ID *</label>
                    <div className="flex gap-0 lg:w-96 xl:w-full outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input autoComplete='off' value={registrationNo} onChange={(e) => setRegistrationNo(e.target.value)} className="w-full outline-none mt-0 text-black " type="text" placeholder="Enter registration number or business ID" id='registrationNo' />
                    </div>
                    </div>
                    </div>
                    <div className="mt-4 2xl:mt-6 mb-6 flex gap-6 justify-start">
                    <div className='flex flex-col gap-2 lg:w-full 2xl:w-2/3 xl:w-full justify-start items-start'>
                    <label htmlFor="certificate" className='text-black 2xl:text-xl font-semibold '>Upload Registration Certificate *</label>
                    <div id='certificate' onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} onClick={() => document.getElementById('document').click()} className={`flex gap-0 border-dashed cursor-pointer text-blue-500 ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400"} w-full h-40 border-2 outline-gray-400 hover:border-blue-500 rounded-xl p-3`}> 
                    <div className='flex flex-col justify-center items-center w-full gap-2'>
                     {selectedFile ? 
                     <div className='flex flex-col items-center'>
                        <div className='flex gap-2 items-center'>
                        <div className='text-green-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-16">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>
                        </div>
                        <div>
                        <p className='text-green-600 font-bold'>Upload Successful !</p>
                        <p className="text-gray-700 font-semibold">File name : {selectedFile.name}</p>
                        </div>
                     </div>
                     <button className='text-white bg-green-600 p-1 rounded-xl mt-2 w-2/3 hover:bg-blue-500 transition-all duration-300 ease-in-out'>Upload Another File</button>
                     </div>
                     
                      : 
                     <div className='flex flex-col gap-2 w-full justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10">
                        <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm5.845 17.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V12a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clip-rule="evenodd" />
                        <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                        </svg>
                         <p className="text-gray-600 font-medium text-center">
                         <span className="text-blue-600">Click here</span> to upload your file or drag and drop
                    </p>
                    <p className='text-gray-400 font-semibold'>Supported Format : PDF , JPG , JPEG , PNG</p></div> }
                    </div>
                    <input onChange={handleFileChange} className="hidden" name='document' accept='.pdf , .jpg , .jpeg , .png' type="file" placeholder="Your email address" id='document' />
                    </div>
                    </div>
                    </div>
                 </div>
                 </div>
                 <div className='px-6 flex 2xl:flex-col lg:flex-col xl:flex-row gap-8 mb-6'>
                 <div className='flex flex-col w-fit justify-center'>
                    <div className='flex gap-3 items-center'>
                    <div className='bg-blue-700 p-1 rounded-full font-bold 2xl:w-[28px] 2xl:h-[28px] text-white flex justify-center items-center text-sm w-[24px] h-[24px]'>3</div>
                    <div className='text-black 2xl:text-3xl  font-bold text-xl'>Contact Person Details</div>
                    </div>
                    <div className="mt-4 2xl:mt-6 flex gap-6 justify-start">
                    <div className='flex flex-col gap-2'>
                    <label htmlFor="fullName" className='text-black 2xl:text-xl font-semibold'>Full Name *</label>
                    <div className="flex gap-0 w-80 2xl:w-96 outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input autoComplete='off' value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full outline-none mt-0 text-black " type="text" placeholder="Enter full name" id='fullName' />
                    </div>
                    </div>
                     <div className='flex flex-col gap-2'>
                    <label htmlFor="position" className='text-black 2xl:text-xl font-semibold'>Position *</label>
                    <div className="flex gap-0 w-80 2xl:w-96 outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input autoComplete='off' value={position} onChange={(e) => setPosition(e.target.value)} className="w-full outline-none mt-0 text-black " type="text" placeholder="e.g., CEO , Director , Manager" id='position' />
                    </div>
                    </div>
                    </div>
                    <div className="mt-4 2xl:mt-6 flex gap-6 justify-start">
                    <div className='flex flex-col gap-2'>
                    <label htmlFor="contactNo" className='text-black 2xl:text-xl font-semibold'>Contact Number *</label>
                    <div className="flex gap-0 2xl:w-96 w-80 outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input autoComplete='off' value={contactNo} onChange={(e) => setContactNo(e.target.value)} className="w-full outline-none mt-0 text-black " type="text" placeholder="Enter full name" id='contactNo' />
                    </div>
                    </div>
                     <div className='flex flex-col gap-2'>
                    <label htmlFor="personalEmail" className='text-black 2xl:text-xl font-semibold'>Personal Email *</label>
                    <div className="flex gap-0 2xl:w-96 w-80 outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input autoComplete='off' value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)} className="w-full outline-none mt-0 text-black " type="text" placeholder="manager@example.com" id='personalEmail' />
                    </div>
                    </div>
                    </div>
                 </div>
                 <div className='w-full flex flex-col 2xl:items-start 2xl:mt-6 items-center-safe justify-end'>
                    <div className='flex gap-3'>
                        {loading ? <Loader /> : <div className='flex gap-3'>
                        <button onClick={handleCancel} className='text-black border-1 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 ease-in-out hover:text-white border-gray-400 px-7 py-3'>Cancel</button>
                        <button onClick={handleSubmit} className='bg-blue-700 flex gap-1 py-3 text-white transition-all duration-300 ease-in-out hover:bg-black px-8 font-semibold rounded-xl'>Submit for Verification 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </button> 
                        </div>}
                    </div>
                 </div>
                 </div>
                 </div>
                </div>
                 
                 
                 
            </div>
        </div>
    )
}

export default OrgKYC;


