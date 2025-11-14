import React, { useContext } from 'react'
import { Button } from '../components';

import logo from "../../images/AuthenXLogo.png"
import Sidebar from '../components/Sidebar';
import { useState , useEffect , useRef } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import {shortenAddress} from "../utils/shortenAddress"
import QRCodeDisplay from "../components/QRCodeDisplay"
import Loader from '../components/Loader';
import { fetchOrgDetails } from '../../api';
import {issuedDocument} from '../../api'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const DocType = [
  { id: 1, label: "Employment Certificate" },
  { id: 2, label: "Partnership Agreement" },
  { id: 3, label: "Academic Degree" },
  { id: 4, label: "Training Completion" },
  { id: 5, label: "License" },
  { id: 6, label: "Insurance Policy" },
  { id: 7, label: "Identity Verification" },
  { id: 8, label: "Ownership Certificate" }
];

const IssueDoc = () => {
  const navigate = useNavigate();
    const [loading , setLoading] = useState(false);
    const {issueDocument , isLoading} = useContext(TransactionContext)
    const [DocTypeOpen , setDocTypeOpen] = useState(false);
    const [kycStatus, setKycStatus] = useState("Pending");
    const {currentAccount} = useContext(TransactionContext);
    const [selectedFile , setSelectedFile] = useState(null);
    const [isDragging , setIsDragging] = useState(false);
    const qrRef = useRef(null);
    const [selectedInterest, setSelectedInterest] = useState({
    id: null,
    label: "Select type of Document"
    });
    const [personName , setPersonName] = useState("");
    const [personWallet , setPersonWallet] = useState("");
    const [orgName ,setOrgName] = useState("");
    const [docHash , setdocHash] = useState(null);

    useEffect(() => {
    const fetchDetails = async () => {
    try {
      const res = await fetchOrgDetails();
      if (res.success && res.kycDetails) {
        setOrgName(res.kycDetails.orgName);
        setKycStatus(res.kycDetails.status);
      }
    } catch (err) {
      console.error("Failed to fetch org details:", err);
    }
   };
   fetchDetails();
   }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setSelectedFile(file);
        }
    }
    
    const downloadQRCode = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = "AuthenX_QR_Code.png";
        link.click();
        toast.success("QR downloaded successfully");
    }
    
    const uploadFile = async () => {
    if (!selectedFile) return toast.error("Upload a document first !");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
        const res = await fetch("http://localhost:3000/upload", {
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

      const tx = await issueDocument(personName, personWallet, selectedInterest.label, docHash);
      console.log("Transaction Result :" , tx);

      if (tx) {
      const docData = {
        personName,
        personWallet,
        docType: selectedInterest.label,
        orgWallet: currentAccount,
        orgName,
        docHash
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
        if(file){
            setSelectedFile(file);
        }
    }

    const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-sm font-medium rounded-full inline-block";
    const statusClasses = {
        Completed: "bg-green-100 text-green-800",
        Failed: "bg-red-100 text-red-800",
    };

    return (
        <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
        </span>
    );
    };

    return (
        <div className='w-screen h-screen flex flex-col text-white'>
            <div className='w-full bg-white fixed top-0 flex justify-between items-center px-2 h-[60px]'>
                <div className='w-40 h-10'>
                    <img src={logo} alt="logo" className='w-40 h-10 cursor-pointer' />
                </div>
                <div className='flex justify-center items-center'>
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

            <div className='flex flex-1 h-100vh mt-[60px] bg-gray-300'> 
                 <Sidebar />
                 <div className='flex flex-1 ml-72 2xl:ml-96 2xl:mr-0 mr-5 mb-5'>
                    <div className='ml-5 mt-5 2xl:m-10 grid xl:grid-cols-3 2xl:gap-10 gap-5 w-full'>
                    <div className='xl:col-span-2 bg-white xl:p-10 p-3  rounded-xl flex flex-col'>
                    <div className='text-black text-6xl font-semibold 2xl:text-6xl flex justify-center'>Issue Document</div>
                    <div className="mt-6 2xl:mt-8 flex gap-6 justify-center">
                    <div className='flex flex-col gap-2'>
                    <label htmlFor="name" className='text-black 2xl:text-xl font-semibold'>Recipient Name *</label>
                    <div className="flex gap-0 2xl:w-96 w-80 outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input value={personName} onChange={(e)=> setPersonName(e.target.value)} className="w-full outline-none mt-0 text-black " type="text" placeholder="Enter recipient’s full name (as on doc)" id='name' />
                    </div>
                    </div>
                     <div className='flex flex-col gap-2'>
                    <label htmlFor="recipientWallet" className='text-black 2xl:text-xl font-semibold'>Recipient wallet address *</label>
                    <div className="flex gap-0 w-80 2xl:w-96 outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input value={personWallet} onChange={(e) => setPersonWallet(e.target.value)} className="w-full outline-none mt-0 text-black " type="text" placeholder="Enter recipient’s wallet address (0x...)" id='recipientWallet' />
                    </div>
                    </div>
                    </div>
                    <div className="mt-6 mb-6 flex gap-6 justify-center">
                    <div className='flex flex-col gap-2'>
                    <label htmlFor="doctype" className='text-black 2xl:text-xl font-semibold'>Select Document Type *</label>
                    <div id='doctype' className="flex gap-0 outline-1 2xl:w-96 w-80 outline-gray-400 rounded-xl relative">
                    <div 
                    className="w-full flex items-center justify-between h-12 text-lg px-3 py-3 cursor-pointer rounded-xl outline-1 outline-gray-400"
                    onClick={() => setDocTypeOpen(!DocTypeOpen)}
                     >
                    <span className="text-black">{selectedInterest.label}</span>
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
                {DocTypeOpen && (
                <div className="absolute flex flex-col top-full mt-2 max-h-48 left-0 w-80 p-1  bg-white outline-1 outline-gray-400 overflow-y-scroll rounded-xl ">
                {DocType.map((type) => (
                    <div
                    key={type.id}
                    className="flex items-center rounded-xl gap-2 px-3 py-2 m-1 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                        setSelectedInterest(type);
                        setDocTypeOpen(false);
                    }}
                    >
                    <span className="text-lg text-gray-500">{type.label}</span>
                    </div>
                    ))}
                </div>
                  )}
                </div>

                    </div>
                     <div className='flex flex-col gap-2'>
                    <label htmlFor="OrgName" className='text-black 2xl:text-xl  font-semibold'>Organization Name</label>
                    <div className="flex w-80 2xl:w-96 gap-0 outline-1 outline-gray-400 rounded-xl p-3 focus-within:outline-blue-500"> 
                    <input readOnly value={orgName} onChange={(e) => setOrgName(e.target.value)} className="w-full outline-none mt-0 text-black " type="text" placeholder="Name of the organization" id='OrgName' />
                    </div>
                    </div>
                    </div>
                    <div className="mt-4 mb-6 flex gap-6 justify-center">
                    <div className='flex flex-col gap-2 w-full justify-center items-center'>
                    <label htmlFor="document" className='text-black 2xl:text-xl 2xl:mb-4 font-semibold'>Upload Document *</label>
                    <div onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} onClick={() => document.getElementById('document').click()} className={`flex gap-0 border-dashed cursor-pointer text-blue-500 ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400"}   w-2/3 h-40 border-2 outline-gray-400 rounded-xl p-3`}> 
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
                     <div className='flex flex-col gap-2 w-full justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10 2xl:size-12">
                        <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm5.845 17.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V12a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clip-rule="evenodd" />
                        <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                        </svg>
                         <p className="text-gray-600 font-medium text-center">
                         <span className="text-blue-600 2xl:text-xl 2xl:mr-2">Click here</span><span className='2xl:text-xl'>to upload your file or drag and drop</span>
                    </p>
                    <p className='text-gray-400 font-semibold 2xl:text-lg'>Supported Format : PDF , JPG , JPEG , PNG</p></div> }
                    </div>
                    <input onChange={handleFileChange} className="hidden" name='document' accept='.pdf , .jpg , .jpeg , .png' type="file" placeholder="Your email address" id='document' />
                    </div>
                    </div>
                    </div>
                    <div className="mt-0 flex gap-6 items-center flex-col">
                    <div className='flex flex-col gap-2 w-full justify-center items-center'>
                    </div>
                    {loading ? <Loader /> : 
                    <Button onClick={handleIssueDocument} variant="primary" size="md" className="before:bg-white pl-12 pr-12 rounded-xl w-1/2 justify-center mb-0 outline-blue-400 flex gap-2 items-center">
                     Issue Document
                    </Button> }
                    <div className='flex text-sm justify-center items-center gap-1'>
                        <div className='text-green-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>
                        </div>
                      
                      <div className='text-black'>Document Issuance is powered by Ethereum Smart Contract</div>
                    </div>
                    
                    </div>
                    </div>
                    <div className='flex xl:flex-col gap-5 '>
                    <div ref={qrRef} className='bg-white border-green-600 border-2 p-5 flex flex-1 2xl:justify-center flex-col items-center rounded-xl h-fit'>
                    <div className='xl:text-3xl 2xl:text-4xl text-3xl text-black text-center font-semibold'>
                    Issued Document QR Code
                    </div>
                   {docHash === null ? (
                    <div className='text-black m-2 flex flex-col items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-32 2xl:size-40">
                      <path fill-rule="evenodd" d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z" clip-rule="evenodd" />
                      </svg>
                      <div className='text-center mt-2 text-gray-400 2xl:w-3/4 2xl:text-xl text-sm xl:text-base font-semibold'>The QR code will appear here once you issue a document for direct verification</div>
                    </div>
                     ) : (
                    <div className='flex flex-col items-center'>
                      <div className="flex justify-center w-full mt-8">
                        <QRCodeDisplay url={`http://localhost:5173/verify?hash=${docHash}`} />
                      </div>
                      <p className="mt-8 w-2/3 text-gray-600 text-center text-sm">
                        Scan this to instantly verify the document on our website
                      </p>
                    </div>
                  )}
                    <Button onClick={downloadQRCode} variant="primary" size="md" className="before:bg-white pl-12 pr-12 rounded-xl justify-center mt-4 mb-0 outline-blue-400 flex gap-2 items-center">
                    Download QR Code
                    </Button>
                    </div>
                    <div className={`flex-1 flex flex-col justify-center items-center ${kycStatus == "Approved" ? "border-2 border-green-500" :"border-2 border-red-500"} bg-white rounded-xl p-5`}>
                                                    <div className='text-black flex justify-center 2xl:text-5xl font-bold text-3xl '>KYC Status</div>
                                                    {kycStatus == "Approved" && (
                                                    <div className='flex flex-col items-center'>
                                                    <div className='mt-4 2xl:mt-6 py-3 px-4 2xl:px-6 2xl:text-xl items-center border-1 border-green-400 w-fit bg-green-100 rounded-2xl shadow-xs shadow-green-500 text-green-700 font-semibold flex gap-2'>
                                                    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 2xl:size-10">
                                                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                                                    </svg>
                                                    </div> <div className='font-bold'> KYC {kycStatus}</div>
                                                    </div>
                                                    <div className='text-center text-sm font-semibold 2xl:text-lg flex flex-col gap-1 text-gray-700 2xl:mt-6 mt-3'>
                                                    <div>Your KYC verification is successfully completed!</div>
                                                    You now have full access to all platform features.</div>
                                                    <Button onClick={() => navigate("/issue")} variant="primary" size="md" className="before:bg-white pl-12 pr-12 w-full rounded-xl 2xl:text-lg justify-center mt-4 2xl:mt-6 mb-0 outline-blue-400 flex gap-2 items-center">
                                                    Issue Document
                                                    </Button>
                                                    </div>)
                                                    }
                                                    {kycStatus == "Pending" && 
                                                    <div className='flex flex-col items-center'>
                                                    <div className='mt-5 2xl:mt-6 py-3 px-4 2xl:px-6 2xl:text-xl items-center border-1 border-red-400 w-fit bg-red-100 rounded-2xl shadow-2xs shadow-red-500 text-red-700 font-semibold flex gap-2'>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 2xl:size-10">
                                                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </div> <div>KYC {kycStatus}</div> 
                                                    </div> 
                                                    <div>
                                                    <p className="text-gray-700 text-center 2xl:text-lg  text-sm mt-3 font-semibold">
                                                        Your KYC verification is still pending. Please complete the process
                                                        to unlock the ability to issue documents.
                                                    </p>
                                                    <div className='flex justify-center'>
                                                    <Button onClick={() => navigate("/orgkyc")} variant="primary" size="md" className="before:bg-white 2xl:text-lg rounded-lg w-full hover:scale-0  justify-center text-lg outline-blue-400 mt-6 flex gap-2 items-center">
                                                        Verify Now
                                                    </Button> 
                                                    </div>
                                                    </div>
                                                    </div>    
                                                    }
                                                    </div> 

                    </div>
                    
                    
                 </div>
                 </div>
            </div>
        </div>
    )
}

export default IssueDoc;
