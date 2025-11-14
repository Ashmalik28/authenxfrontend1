import React, { useContext } from 'react'
import { Button } from '../components';
import logo from "../../images/AuthenXLogo.png"
import Sidebar from '../components/Sidebar';
import { useState , useEffect } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import {shortenAddress} from "../utils/shortenAddress"
import { viewDocument } from '../../api';
import Loader from '../components/Loader';
import resultImage from "../../images/MyIssuedDocs/result.png"
import { toast } from 'react-toastify';

const MyIssuedDocs = () => {
    const {currentAccount , getDocumentsByOrg} = useContext(TransactionContext);
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [loadingdIndex , setloadingdIndex] = useState(null);
    const [loadingSIndex , setloadingSIndex] = useState(null);
    const [loading , setLoading] = useState(null);
    const [docs, setDocs] = useState([]);
    const [searchQuery , setSearchQuery] = useState("");
    const [debouncedQuery , setDebouncedQuery] = useState("");
    const [filteredDocs, setFilteredDocs] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

      const formatDocuments = (rawDocs) => {
        return rawDocs.map((doc) => ({
            personName: doc[0],
            personWallet: doc[1],
            docType: doc[2],
            orgName: doc[3],
            orgWallet: doc[4],
            timestamp: new Date(Number(doc[5]) * 1000),
            docHash: doc[6],
            isActive: doc[7],
        }));
        };
        
        const formatTimestamp = (ts) => {
        const date = ts.getDate().toString().padStart(2, '0'); 
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const month = monthNames[ts.getMonth()];
        const year = ts.getFullYear();

        let hours = ts.getHours();
        const minutes = ts.getMinutes().toString().padStart(2,'0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        return {
            date: `${date} ${month} ${year}`,
            time: `${hours}:${minutes} ${ampm}`
        };
        };

    useEffect(() => {
    const fetchDocs = async () => {
      if (!currentAccount) return;

      try {
        setLoading(true);
        const documents = await getDocumentsByOrg(currentAccount);
        const formatted = formatDocuments(documents);
        setDocs(formatted);
      } catch (error) {
        console.error("Error fetching issued documents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
    }, [currentAccount]);

    const handleViewDocument = async (cid, index) => {
        try {
            setLoadingIndex(index);
            const data = await viewDocument(cid);
            if (data.success && data.url) {
            window.open(data.url, "_blank"); 
            } else {
            alert(data.message || "Failed to open document");
            }
        } catch (error) {
            console.error("View document error:", error);
            alert("Something went wrong while viewing document");
        } finally {
            setLoadingIndex(null);
        }
        };

        const handleDownloadDocument = async (cid, index) => {
        try {
            setloadingdIndex(index);

            const data = await viewDocument(cid); 
            if (!data.success || !data.url) {
            alert(data.message || "Failed to get document link");
            return;
            }

            const response = await fetch(data.url);
            if (!response.ok) {
            alert("Failed to download document");
            return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `${cid}`; 
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Download document error:", error);
            alert("Something went wrong while downloading document");
        } finally {
            setloadingdIndex(null);
        }
    };

  const handleShareDocument = async (cid, index) => {
  try {
    setloadingSIndex(index);
    const data = await viewDocument(cid);
    if (data.success && data.url) {
      if (navigator.share) {
        await navigator.share({
          title: "AuthenX Document",
          text: "Here’s your verified document link: its valid for only next 60 seconds",
          url: data.url,
        });
      } else {
        await navigator.clipboard.writeText(data.url);
        alert("Sharing not supported — link copied to clipboard!");
      }
    } else {
      alert("Failed to generate share link");
    }
  } catch (error) {
    console.error("Share document error:", error);
  } finally {
    setloadingSIndex(null);
  }
 };

  const handleSearch = () => {
  const query = searchQuery.toLowerCase().trim();
  if (!query) {
    setFilteredDocs([]);
    setIsSearching(false);
    return;
  }
  const results = docs.filter(
    (doc) =>
      doc.personName.toLowerCase().includes(query) ||
      doc.personWallet.toLowerCase().includes(query)
  );
  setFilteredDocs(results);
  setIsSearching(true);
 };

 const handleKeyDown = (e) => {
  if (e.key === "Enter") handleSearch();
 };

 useEffect(() => {
  if (searchQuery.trim() === "") {
    setIsSearching(false);
    setFilteredDocs([]);
  }
}, [searchQuery]);


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
        <div className='w-full h-screen flex flex-col text-white'>
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

            <div className='flex flex-1 h-fit mt-[60px] bg-gray-200'> 
                 <Sidebar />
                 <div className='flex flex-col max-w-screen 2xl:ml-96 ml-72 mb-5'>
                    <div className='flex fixed top-[60px] 2xl:left-96 left-72 z-30 w-2/3 '>
                    <div className='bg-gray-700 w-3/5 mt-6 ml-6 mr-4 flex justify-between items-center h-12 rounded-full pl-3 pr-2 transition-all duration-300 ease-in-out focus-within:bg-gray-800'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
                      <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                      </svg>
                      <input onKeyDown={handleKeyDown} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder='Search document by Recipient Name or wallet Address' className='text-white placeholder:text-white text-lg outline-none rounded-full w-full p-3' />
                      <div onClick={handleSearch} className='hover:bg-black bg-white text-black rounded-full p-1 hover:text-white transition-all duration-300 ease-in-out'>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                       <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                       </svg>
                      </div>
                    </div>
                    <div className='flex gap-2 bg-blue-500 h-12 px-4 py-2 mt-6 hover:bg-gray-700 transition-all duration-300 ease-in-out rounded-full items-center'>
                        <div onClick={() => {toast.info("Filters coming soon !")}} className='text-white'>Filters</div>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                          <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                          </svg>
                        </div>
                    </div>
                    <div>

                    </div>
                 </div>
                 {loading == true ? <div className='flex-1 mt-24 h-full min-w-[calc(100vw-20rem)] flex justify-center items-center'><Loader /></div>
                    : (
                  <div className='flex-1 grid mx-5 lg:ml-15 xl:ml-5 mt-24 h-full min-w-100% gap-5 2xl:grid-cols-4 grid-cols-1 xl:grid-cols-2'>    
                  {isSearching ? (
                  filteredDocs.length > 0 ? (
                    filteredDocs.map((doc, index) => {
                      const formatted = formatTimestamp(doc.timestamp);
                      return (
                        <div key={index} className='col-span-1 bg-white max-h-fit rounded-xl shadow-xl'>
                           <div className='p-4 flex justify-between items-center rounded-t-xl bg-blue-700 font-bold'>
                      <div className='flex flex-col gap-1'>
                        <div className='text-xl text-white'>{doc.docType}</div>
                        <div className='flex gap-1 text-green-500 items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>
                        <div className='text-sm text-white'>{doc.isActive == true ? "Valid" : "Revoked"}</div>
                        </div>
                      </div>
                      <div className='bg-[#4d72e1] px-2 py-3 rounded-lg'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                      <path fill-rule="evenodd" d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                      <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                      </svg>
                      </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4 p-4'>
                        <div className=' flex flex-col'>
                        <div className='flex items-center gap-1'>
                            <div className='text-blue-700'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                            </svg>
                            </div>
                            <div className='text-black font-bold'>Recipient Details</div>
                        </div>  
                        <div className='bg-gray-100 w-full p-2 mt-2 rounded-xl'>
                            <div className='text-gray-500 text-sm font-bold'>NAME</div>
                            <div className='text-black font-bold'>{doc.personName}</div>
                        </div> 
                        <div className='bg-gray-100 w-full p-2 mt-3 rounded-xl'>
                            <div className='text-gray-500 text-sm font-bold'>WALLET ADDRESS</div>
                            <div className='flex items-center gap-1 mt-1'>
                            <span className='text-blue-500 text-xs px-2 bg-[#f0f6ff] rounded-lg  font-bold'>{shortenAddress(doc.personWallet)}</span> 
                            <span className='text-gray-500'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3">
                            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                            <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                            </svg>
                            </span>
                            </div>
                        </div> 
                        </div>
                        <div className='flex flex-col'>
                        <div className='flex items-center gap-1'>
                            <div className='text-blue-700'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                            <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clip-rule="evenodd" />
                            </svg>
                            </div>
                            <div className='text-black font-bold'>Organization Details</div>
                        </div>  
                        <div className='bg-gray-100 w-full p-2 mt-2 rounded-xl'>
                            <div className='text-gray-500 text-sm font-bold'>ORGANIZATION</div>
                            <div className='text-black font-bold'>{doc.orgName}</div>
                        </div> 
                        <div className='bg-gray-100 w-full p-2 mt-3 rounded-xl'>
                            <div className='text-gray-500 text-sm font-bold'>WALLET ADDRESS</div>
                            <div className='flex items-center gap-1 mt-1'>
                            <span className='text-blue-500 text-xs px-2 bg-[#f0f6ff] rounded-lg  font-bold'>{shortenAddress(doc.orgWallet)}</span> 
                            <span className='text-gray-500'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3">
                            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                            <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                            </svg>
                            </span>

                            </div>
                        </div> 
                        </div>
                        <div className='col-span-2 border-1 mt-1 border-b-gray-200'></div>
                      </div>
                      <div className='flex justify-around border-1 border-b-gray-200 py-2 px-5'>
                        <div className='w-32 h-32 flex flex-col items-center'>
                            <div className='bg-blue-100 w-fit h-fit p-4 rounded-full'>
                                <div className='text-blue-700'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
                                <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
                                </svg>
                                </div>
                            </div>
                            <div className='text-gray-500 text-sm mt-1 font-bold'>ISSUED AT</div>
                            <div className='text-black font-bold text-sm'>{formatted.date}</div>
                            <div className='text-xs text-gray-500 font-bold'>{formatted.time}</div>
                        </div>
                        <div className='w-32 h-32 flex flex-col items-center'>
                            <div className='bg-[#faf5ff] w-fit h-fit p-4 rounded-full'>
                                <div className='text-[#c086f4]'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                <path fill-rule="evenodd" d="M12 3.75a6.715 6.715 0 0 0-3.722 1.118.75.75 0 1 1-.828-1.25 8.25 8.25 0 0 1 12.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 0 1-1.395-.551A21.69 21.69 0 0 0 18.75 10.5 6.75 6.75 0 0 0 12 3.75ZM6.157 5.739a.75.75 0 0 1 .21 1.04A6.715 6.715 0 0 0 5.25 10.5c0 1.613-.463 3.12-1.265 4.393a.75.75 0 0 1-1.27-.8A6.715 6.715 0 0 0 3.75 10.5c0-1.68.503-3.246 1.367-4.55a.75.75 0 0 1 1.04-.211ZM12 7.5a3 3 0 0 0-3 3c0 3.1-1.176 5.927-3.105 8.056a.75.75 0 1 1-1.112-1.008A10.459 10.459 0 0 0 7.5 10.5a4.5 4.5 0 1 1 9 0c0 .547-.022 1.09-.067 1.626a.75.75 0 0 1-1.495-.123c.041-.495.062-.996.062-1.503a3 3 0 0 0-3-3Zm0 2.25a.75.75 0 0 1 .75.75c0 3.908-1.424 7.485-3.781 10.238a.75.75 0 0 1-1.14-.975A14.19 14.19 0 0 0 11.25 10.5a.75.75 0 0 1 .75-.75Zm3.239 5.183a.75.75 0 0 1 .515.927 19.417 19.417 0 0 1-2.585 5.544.75.75 0 0 1-1.243-.84 17.915 17.915 0 0 0 2.386-5.116.75.75 0 0 1 .927-.515Z" clip-rule="evenodd" />
                                </svg>
                                </div>
                            </div>
                            <div className='text-gray-500 text-sm mt-1 font-bold'>DOCUMENT HASH</div>
                            <div className='flex items-center gap-1 mt-1'>
                            <span className='text-[#c086f4] text-sm px-2 bg-[#faf5ff] rounded-lg  font-bold'>{shortenAddress(doc.docHash)}</span> 
                            <span className='text-gray-500'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3">
                            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                            <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                            </svg>
                            </span>
                            </div> 
                        </div>
                        <div className='w-32 h-32 flex flex-col items-center'>
                            <div className='bg-[#f1fdf4] w-fit h-fit p-4 rounded-full'>
                                <div className='text-[#4db974]'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                                </svg>
                                </div>
                            </div>
                            <div className='text-gray-500 text-sm mt-1 font-bold'>VERIFICATION</div>
                            {doc.isActive == true && <div className='flex gap-1 text-green-500 items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                             <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                             </svg>
                             <div className='text-sm text-green-500 font-bold'>Verified</div>
                             </div> }
                            {doc.isActive == false && <div className='flex gap-1 text-red-500 items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                            </svg>
                             <div className='text-sm text-red-500 font-bold'>Not Verified</div>
                             </div> }
                        </div>
                      </div>
                      <div className='bg-gray-100 w-full h-fit rounded-b-xl flex justify-center py-4 gap-2 px-5'>
                        {loadingIndex === index ? <div className='w-64 flex justify-center items-center'><Loader height={15} width={15}></Loader></div>  :
                        <button onClick={() => handleViewDocument(doc.docHash , index)} className='bg-blue-700 w-64 justify-center text-sm flex items-center gap-2 font-bold py-1 px-10 rounded-lg text-white'>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                         <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                         <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                         </svg>
                        View Document
                        </button> 
                         }
                         {loadingdIndex === index ? <div className='w-64 flex justify-center items-center'><Loader height={15} width={15}></Loader></div> : 
                         <button onClick={() => handleDownloadDocument(doc.docHash , index)} className='bg-white text-sm justify-center outline-1 w-64 outline-gray-200 flex items-center gap-2 font-bold py-1 px-10 rounded-lg text-black'>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                         <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                         </svg>
                        Download
                        </button>
                         }
                        {loadingSIndex === index ? <Loader height={15} width={15}></Loader> : 
                         <div onClick={() => handleShareDocument(doc.docHash , index)} className='rounded-lg py-1 px-2 text-black flex justify-center items-center bg-gray-300'>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3">
                            <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clip-rule="evenodd" />
                            </svg>
                            </div>
                       </div>  } 
                      </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className='flex flex-col justify-center items-center min-w-[calc(100vw-20rem)]'>
                    <img src={resultImage} alt="resultImage"  className='w-80 h-80'/>
                    <div className="flex justify-center items-center col-span-full text-black font-bold text-4xl">
                      No results found.
                    </div>
                    <div className='text-black'>We couldn't find what you searched for.</div>
                    <div className='text-black'>Try searching again.</div>

                    </div>
                  )
                ) : (
                  docs.length > 0 ? (
                    docs.map((doc, index) => {
                      const formatted = formatTimestamp(doc.timestamp);
                      return (
                        <div key={index} className='col-span-1 bg-white max-h-fit rounded-xl shadow-xl'>
                           <div className='p-4 flex justify-between items-center rounded-t-xl bg-blue-700 font-bold'>
                      <div className='flex flex-col gap-1'>
                        <div className='text-xl text-white'>{doc.docType}</div>
                        <div className='flex gap-1 text-green-500 items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>
                        <div className='text-sm text-white'>{doc.isActive == true ? "Valid" : "Revoked"}</div>
                        </div>
                      </div>
                      <div className='bg-[#4d72e1] px-2 py-3 rounded-lg'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                      <path fill-rule="evenodd" d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                      <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                      </svg>
                      </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4 p-4'>
                        <div className=' flex flex-col'>
                        <div className='flex items-center gap-1'>
                            <div className='text-blue-700'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                            </svg>
                            </div>
                            <div className='text-black font-bold'>Recipient Details</div>
                        </div>  
                        <div className='bg-gray-100 w-full p-2 mt-2 rounded-xl'>
                            <div className='text-gray-500 text-sm font-bold'>NAME</div>
                            <div className='text-black font-bold'>{doc.personName}</div>
                        </div> 
                        <div className='bg-gray-100 w-full p-2 mt-3 rounded-xl'>
                            <div className='text-gray-500 text-sm font-bold'>WALLET ADDRESS</div>
                            <div className='flex items-center gap-1 mt-1'>
                            <span className='text-blue-500 text-xs px-2 bg-[#f0f6ff] rounded-lg  font-bold'>{shortenAddress(doc.personWallet)}</span> 
                            <span className='text-gray-500'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3">
                            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                            <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                            </svg>
                            </span>
                            </div>
                        </div> 
                        </div>
                        <div className='flex flex-col'>
                        <div className='flex items-center gap-1'>
                            <div className='text-blue-700'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                            <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clip-rule="evenodd" />
                            </svg>
                            </div>
                            <div className='text-black font-bold'>Organization Details</div>
                        </div>  
                        <div className='bg-gray-100 w-full p-2 mt-2 rounded-xl'>
                            <div className='text-gray-500 text-sm font-bold'>ORGANIZATION</div>
                            <div className='text-black font-bold'>{doc.orgName}</div>
                        </div> 
                        <div className='bg-gray-100 w-full p-2 mt-3 rounded-xl'>
                            <div className='text-gray-500 text-sm font-bold'>WALLET ADDRESS</div>
                            <div className='flex items-center gap-1 mt-1'>
                            <span className='text-blue-500 text-xs px-2 bg-[#f0f6ff] rounded-lg  font-bold'>{shortenAddress(doc.orgWallet)}</span> 
                            <span className='text-gray-500'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3">
                            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                            <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                            </svg>
                            </span>

                            </div>
                        </div> 
                        </div>
                        <div className='col-span-2 border-1 mt-1 border-b-gray-200'></div>
                      </div>
                      <div className='flex justify-around border-1 border-b-gray-200 py-2 px-5'>
                        <div className='w-32 h-32 flex flex-col items-center'>
                            <div className='bg-blue-100 w-fit h-fit p-4 rounded-full'>
                                <div className='text-blue-700'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
                                <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
                                </svg>
                                </div>
                            </div>
                            <div className='text-gray-500 text-sm mt-1 font-bold'>ISSUED AT</div>
                            <div className='text-black font-bold text-sm'>{formatted.date}</div>
                            <div className='text-xs text-gray-500 font-bold'>{formatted.time}</div>
                        </div>
                        <div className='w-32 h-32 flex flex-col items-center'>
                            <div className='bg-[#faf5ff] w-fit h-fit p-4 rounded-full'>
                                <div className='text-[#c086f4]'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                <path fill-rule="evenodd" d="M12 3.75a6.715 6.715 0 0 0-3.722 1.118.75.75 0 1 1-.828-1.25 8.25 8.25 0 0 1 12.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 0 1-1.395-.551A21.69 21.69 0 0 0 18.75 10.5 6.75 6.75 0 0 0 12 3.75ZM6.157 5.739a.75.75 0 0 1 .21 1.04A6.715 6.715 0 0 0 5.25 10.5c0 1.613-.463 3.12-1.265 4.393a.75.75 0 0 1-1.27-.8A6.715 6.715 0 0 0 3.75 10.5c0-1.68.503-3.246 1.367-4.55a.75.75 0 0 1 1.04-.211ZM12 7.5a3 3 0 0 0-3 3c0 3.1-1.176 5.927-3.105 8.056a.75.75 0 1 1-1.112-1.008A10.459 10.459 0 0 0 7.5 10.5a4.5 4.5 0 1 1 9 0c0 .547-.022 1.09-.067 1.626a.75.75 0 0 1-1.495-.123c.041-.495.062-.996.062-1.503a3 3 0 0 0-3-3Zm0 2.25a.75.75 0 0 1 .75.75c0 3.908-1.424 7.485-3.781 10.238a.75.75 0 0 1-1.14-.975A14.19 14.19 0 0 0 11.25 10.5a.75.75 0 0 1 .75-.75Zm3.239 5.183a.75.75 0 0 1 .515.927 19.417 19.417 0 0 1-2.585 5.544.75.75 0 0 1-1.243-.84 17.915 17.915 0 0 0 2.386-5.116.75.75 0 0 1 .927-.515Z" clip-rule="evenodd" />
                                </svg>
                                </div>
                            </div>
                            <div className='text-gray-500 text-sm mt-1 font-bold'>DOCUMENT HASH</div>
                            <div className='flex items-center gap-1 mt-1'>
                            <span className='text-[#c086f4] text-sm px-2 bg-[#faf5ff] rounded-lg  font-bold'>{shortenAddress(doc.docHash)}</span> 
                            <span className='text-gray-500'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3">
                            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                            <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                            </svg>
                            </span>
                            </div> 
                        </div>
                        <div className='w-32 h-32 flex flex-col items-center'>
                            <div className='bg-[#f1fdf4] w-fit h-fit p-4 rounded-full'>
                                <div className='text-[#4db974]'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                                </svg>
                                </div>
                            </div>
                            <div className='text-gray-500 text-sm mt-1 font-bold'>VERIFICATION</div>
                            {doc.isActive == true && <div className='flex gap-1 text-green-500 items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                             <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                             </svg>
                             <div className='text-sm text-green-500 font-bold'>Verified</div>
                             </div> }
                            {doc.isActive == false && <div className='flex gap-1 text-red-500 items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                            </svg>
                             <div className='text-sm text-red-500 font-bold'>Not Verified</div>
                             </div> }
                        </div>
                      </div>
                      <div className='bg-gray-100 w-full h-fit rounded-b-xl flex justify-center py-4 gap-2 px-5'>
                        {loadingIndex === index ? <div className='w-64 flex justify-center items-center'><Loader height={15} width={15}></Loader></div>  :
                        <button onClick={() => handleViewDocument(doc.docHash , index)} className='bg-blue-700 w-64 justify-center text-sm flex items-center gap-2 font-bold py-1 px-10 rounded-lg text-white'>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                         <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                         <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                         </svg>
                        View Document
                        </button> 
                         }
                         {loadingdIndex === index ? <div className='w-64 flex justify-center items-center'><Loader height={15} width={15}></Loader></div> : 
                         <button onClick={() => handleDownloadDocument(doc.docHash , index)} className='bg-white text-sm justify-center outline-1 w-64 outline-gray-200 flex items-center gap-2 font-bold py-1 px-10 rounded-lg text-black'>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                         <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                         </svg>
                        Download
                        </button>
                         }
                        {loadingSIndex === index ? <Loader height={15} width={15}></Loader> : 
                         <div onClick={() => handleShareDocument(doc.docHash , index)} className='rounded-lg py-1 px-2 text-black flex justify-center items-center bg-gray-300'>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-3">
                            <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clip-rule="evenodd" />
                            </svg>
                            </div>
                       </div>  } 
                      </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className='flex flex-col justify-center items-center min-w-[calc(100vw-20rem)]'>
                    <img src={resultImage} alt="resultImage"  className='w-80 h-80'/>
                    <div className="flex justify-center items-center col-span-full text-black font-bold text-4xl">
                      No Document Found.
                    </div>
                    <div className='text-black'>You haven't issued any document as of yet</div>
                    <div className='text-black'>Try Issuing First.</div>

                    </div>
                  )
                )}

                  </div>  )
                  } 
                 </div>
            </div>
        </div>
    )
}

export default MyIssuedDocs;


