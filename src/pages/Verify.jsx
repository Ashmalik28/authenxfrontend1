import React, { useContext } from 'react'
import { Button } from '../components';
import * as Hash from 'ipfs-only-hash'; 
import logo from "../../images/AuthenXLogo.png"
import Sidebar from '../components/Sidebar';
import { useState , useEffect , useRef } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import {shortenAddress} from "../utils/shortenAddress"
import QRCodeDisplay from "../components/QRCodeDisplay"
import { useLocation } from 'react-router-dom';
import { CID } from 'multiformats/cid';
import { getWallet } from '../../api';
import { verifierData } from '../../api';
import {Loader} from '../components';
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify';

const Verify = () => {
    const {currentAccount ,verifyDocument} = useContext(TransactionContext);
    const [selectedFile , setSelectedFile] = useState(null);
    const [isDragging , setIsDragging] = useState(false);
    const [verified , setVerified] = useState(null);
    const qrRef = useRef(null);
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [docHash , setDocHash] = useState(null);
    const [loading , setloading] = useState(null);
    const [toggleMenu, setToggleMenu] = useState(false);
    const location = useLocation();

    const userType = localStorage.getItem("userType")

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setSelectedFile(file);
        }
    }

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
    const cidV0 = await Hash.of(uint8Array , {cidVersion : 1 , rawLeaves : true});
    const cidV1 = CID.parse(cidV0).toV1().toString(); 
    return cidV1;
    };

    const handleAutoVerification = async (hash) => {
    const {walletAddress} = await getWallet(hash);
    const result = await verifyDocument(walletAddress , hash);
    setVerified(result);
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

      const {walletAddress} = await getWallet(cid);

      const result = await verifyDocument(walletAddress , cid);
      
      if (result) {
        const res = await verifierData(name , email , cid);
        if(res){
        setVerified(true);
        toast.success("Valid document");
        }
      } else {
        setVerified(false);
        toast.error("Document not valid")
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
        const canvas = qrRef.current.querySelector('canvas');
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = "AuthenX_QR_Code.png";
        link.click();
        toast.success("QR code downloaded successfully")
    }

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
        <div className='w-screen h-full 2xl:h-screen bg-gray-300 flex flex-col text-white'>
            <div className='w-full bg-white fixed top-0 flex justify-between items-center z-60 px-2 h-[60px]'>
                            <div className="lg:hidden flex text-black items-center relative">
                            {!toggleMenu ? (
                            <HiMenuAlt4 fontSize={24} className="cursor-pointer" onClick={() => setToggleMenu(true)} />
                            ) : (
                            <AiOutlineClose fontSize={24} className="cursor-pointer" onClick={() => setToggleMenu(false)} />
                            )}
                          </div>
                            <div className=''>
                                <img src={logo} alt="logo" className='lg:w-40 lg:h-10 w-24 h-6 cursor-pointer' />
                            </div>
                            <div className='flex justify-center items-center'>
                                {userType === "verifier" ? "" :
                                <div className='text-white flex justify-center items-center gap-2 font-semibold outline-1 outline-gray-500 text-lg px-5 py-1 mr-5 bg-gray-500 rounded-3xl '>
                                    <div className='flex justify-center items-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                                    </svg>
                                    {shortenAddress(currentAccount)}
                                    </div> 
                                </div> }
                                
                                <div className='border-1 rounded-full lg:h-12 lg:w-12 w-6 h-6 bg-gray-700 flex justify-center items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="lg:size-7 size-4">
                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
              </div>

            <div className='flex flex-1 h-full mt-[60px] bg-gray-300'> 
              <div className='hidden lg:block'><Sidebar /></div>
              {toggleMenu && (
              <div className="absolute lg:hidden top-[60px] left-0 w-60 h-screen flex animate-slide-in bg-white z-50 shadow-xl">
              <Sidebar />
              </div>
              )}
                 <div className='flex flex-1 lg:ml-72 2xl:ml-96 mr-2 xs:mr-5 lg:mr-0 mb-2 xs:mb-5'>
                  <div className='ml-2 xs:ml-5 mt-2 2xl:m-10 xs:mt-5 grid xl:grid-cols-3 gap-2 xs:gap-5 2xl:gap-10 w-full sm:ml-25 sm:mr-25 lg:ml-3 lg:mr-3 lg:w-full'>
                    <div className='xl:col-span-2 bg-white xs:p-4 p-2 2xl:p-10 pb-0 rounded-xl flex flex-col'>
                    <div className='text-black text-3xl lg:text-5xl 2xl:text-6xl font-semibold flex justify-center'>Verify Document</div>
                    <div className="lg:mt-6 2xl:mt-8 mt-4 mb-4 lg:mb-6 w-full flex gap-3 lg:gap-6 justify-center">
                    <div className='flex flex-col gap-2'>
                    <label htmlFor="fullName" className='text-black lg:text-base text-sm 2xl:text-xl font-semibold'>Your Name *</label>
                    <div className="flex gap-0 outline-1 w-full outline-gray-400 rounded-xl p-3 focus-within:outline-2 focus-within:outline-blue-500"> 
                    <input value={name} onChange={(e) => setName(e.target.value)} className="lg:w-70 sm:w-48 w-full 2xl:w-96 lg:placeholder:text-base placeholder:text-sm outline-none mt-0 text-black " type="text" placeholder="Your full name" id='fullName' />
                    </div>
                    </div>
                     <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='text-black lg:text-base text-sm 2xl:text-xl font-semibold'>Email Address *</label>
                    <div className="flex gap-0 outline-1 w-full outline-gray-400 rounded-xl p-3 focus-within:outline-2 focus-within:outline-blue-500"> 
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="lg:w-70 sm:w-48 w-full 2xl:w-96 lg:placeholder:text-base placeholder:text-sm outline-none mt-0 text-black " type="text" placeholder="Your email address" id='email' />
                    </div>
                    </div>
                    </div>
                    <div className="mt-0 mb-6 flex gap-6 justify-center">
                    <div className='flex flex-col gap-2 w-full justify-center items-center'>
                    <label htmlFor="document" className='text-black text-sm lg:text-base mb-2 2xl:text-xl 2xl:mb-4 lg:mb-0 font-semibold'>Upload Document *</label>
                    <div onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} onClick={() => document.getElementById('document').click()} className={`flex gap-0 border-dashed cursor-pointer text-blue-500 ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400"} w-full  lg:w-2/3 lg:h-40 border-2 outline-gray-400 rounded-xl p-3`}> 
                    <div className='flex flex-col justify-center items-center w-full gap-2'>
                     {selectedFile ? 
                     <div className='flex flex-col items-center'>
                        <div className='flex gap-2 items-center'>
                        <div className='text-green-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10 lg:size-16">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>
                        </div>
                        <div>
                        <p className='text-green-600 font-bold lg:text-base text-sm'>Upload Successful !</p>
                        <p className="text-gray-700 font-semibold lg:text-base text-sm">File name : {selectedFile.name}</p>
                        </div>
                     </div>
                     <button className='text-white lg:text-base text-sm bg-green-600 lg:p-1 px-2 py-1 rounded-xl mt-2 lg:w-2/3 hover:bg-blue-500 transition-all duration-300 ease-in-out'>Upload Another File</button>
                     </div>
                     
                      : 
                     <div className='flex flex-col gap-2 w-full justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" size-7 lg:size-10 2xl:size-12">
                        <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm5.845 17.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V12a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clip-rule="evenodd" />
                        <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                        </svg>
                         <p className="text-gray-600 font-medium text-center">
                         <span className="text-blue-600 lg:text-base 2xl:text-xl text-xs pr-1 2xl:pr-2">Click here</span><span className='lg:text-base 2xl:text-xl text-xs'>to upload your file or drag and drop</span> 
                    </p>
                    <p className='text-gray-400 lg:text-base text-xs text-center 2xl:text-lg font-semibold'>Supported Format : PDF , JPG , JPEG , PNG</p></div> }
                    </div>
                    <input onChange={handleFileChange} className="hidden" name='document' accept='.pdf , .jpg , .jpeg , .png' type="file" placeholder="Your email address" id='document' />
                    </div>
                    </div>
                    </div>
                    <div className="mt-0 flex gap-6 items-center flex-col">
                    <div className='flex flex-col gap-2 w-full justify-center items-center'>
                    <label htmlFor="Result" className='text-black 2xl:text-xl font-semibold'>Result</label>
                    <div className= {`flex flex-col gap-0 w-full cursor-pointer border ${verified === null ? "border-blue-500 " : ""} ${verified === false ? "border-red-500 bg-red-50" : ""} ${verified === true ? "border-green-500 bg-green-50" : ""} lg:w-2/3 lg:h-40 2xl:h-full border-2 rounded-xl 2xl:p-5 p-2 items-center`}> 
                    {verified === null && (
                      <div className='flex flex-col items-center p-1 '>
                        <div className='lg:w-12 lg:h-12 2xl:h-16 2xl:w-16 w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-gray-500'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="lg:size-6 2xl:size-8 size-5">
                          <path d="M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z" />
                          <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 0 0 1.06-1.06l-1.047-1.048A3.375 3.375 0 1 0 11.625 18Z" clip-rule="evenodd" />
                          <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                          </svg>
                        </div>
                        <div className='lg:text-xl font-semibold mt-1 mb-1 2xl:text-2xl text-black'>No document uploaded yet</div>
                        <div className='text-center lg:text-base text-xs font-semibold 2xl:text-xl text-gray-400'>Upload a document above to verify its authenticity using our blockchain-powered verification system  </div>
                      </div>
                    )}
                    {verified === true && ( 
                    <div className='flex flex-col items-center'>
                    <div className='lg:text-3xl text-xl'>😊</div>
                    <div className='text-green-600 lg:text-xl font-semibold mt-1'>Document Valid and Verified !</div>
                    <div className='text-gray-500 lg:text-base text-sm mt-2'>Document Hash : {shortenAddress(docHash)}</div>
                    <button className='bg-gray-700 lg:text-base text-xs mt-2 hover:bg-black py-1 px-3 rounded-xl'>Check Transaction on Blockchain Explorer</button> 
                    </div> )}
                    {verified === false && (
                    <div className='flex flex-col items-center'>
                    <div className='lg:text-3xl text-xl'>🙁</div>
                    <div className='text-red-600 lg:text-xl font-semibold mt-1'>Document Invalid and Unverified !</div>
                    <div className='text-gray-500 lg:text-base text-sm mt-2'>Document Hash : {shortenAddress(docHash)}</div>
                    <button className='bg-gray-700 mt-2 lg:text-base text-xs hover:bg-black py-1 px-3 rounded-xl'>Check Transaction on Blockchain Explorer</button> 
                    </div>)}
                    </div>
                    </div>
                    {loading === true ? <Loader /> :
                    <Button onClick={handleVerify} variant="primary" size="md" className="before:bg-white pl-12 pr-12 rounded-xl lg:w-1/2 justify-center mt-2 mb-0 outline-blue-400 flex gap-2 items-center">
                     Verify Document
                    </Button> }
                    <div className='flex text-sm justify-center w-full items-center pb-5 gap-1'>
                        <div className='text-green-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="hidden lg:flexlg:size-5">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>
                        </div>
                      
                      <div className='text-black lg:text-base text-[11px] xs:text-xs'>Verification is powered by Ethereum Smart Contract</div>
                    </div>
                    
                    </div>
                    </div>
                    <div ref={qrRef} className='bg-white border-green-600 border-2 p-5 lg:ml-25 lg:mr-25 xl:mr-5 xl:ml-0 flex flex-col items-center rounded-xl h-fit'>
                    <div className='text-2xl xs:text-3xl text-black font-semibold'>
                    Verify with QR Code
                    </div>
                    {docHash === null ? (
                    <div className='text-black m-2 flex flex-col items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-32">
                      <path fill-rule="evenodd" d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z" clip-rule="evenodd" />
                      </svg>
                      <div className='text-center mt-2 text-gray-400 font-semibold'>The QR code will appear here once you verify a document</div>
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
                    <Button onClick={downloadQRCode} variant="primary" size="md" className="before:bg-white pl-12 pr-12 rounded-xl justify-center mt-5 mb-0 outline-blue-400 flex gap-2 items-center">
                    Download QR Code
                    </Button>
                    </div>
                    
                 </div>
                 </div>
            </div>
        </div>
    )
}

export default Verify;
