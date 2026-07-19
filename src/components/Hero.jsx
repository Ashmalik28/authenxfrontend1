
import image from '../../images/heroleft.webp'
import Button from './Button';
import { toast } from "react-toastify";
import { motion } from "motion/react"
import { useState, useEffect } from "react";
import FloatingCertificateCard from './Floatingcertificatecard';



const HeroSection = () => {

    const words = ["Instantly.", "Securely.", "On-Chain." , "Globally."];

        const [displayText, setDisplayText] = useState("");
        const [wordIndex, setWordIndex] = useState(0);

        useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            setDisplayText(words[wordIndex].slice(0, currentIndex + 1));
            currentIndex++;

            if (currentIndex === words[wordIndex].length) {
            clearInterval(interval);

            setTimeout(() => {
                setDisplayText("");
                setWordIndex((prev) => (prev + 1) % words.length);
            }, 1800);
            }
        }, 90);

        return () => clearInterval(interval);
        }, [wordIndex]);
    return (
        <div className="max-w-screen 2xl:max-w-[1800px] mx-auto flex flex-col lg:flex-row justify-between p-5 lg:p-2 ">
            <motion.div 
            initial = {{
                x: -120,
                opacity: 0
            }}
            animate = {{
                x:0,
                opacity:1
            }}
            transition={{
                type : "spring",
                stiffness:65,
                damping:18,
                delay:0.1
            }}
             className='flex flex-col sm:items-center lg:items-start justify-center lg:pl-8 xl:pl-20 lg:mt-10  xl:mt-15 mb-5 lg:mb-10'>
            <span className="flex justify-center cursor-pointer items-center rounded-3xl border-1 border-[#343434] px-1.5 gap-1 text-[#343434] h-12 2xl:mt-25 mt-17 lg:mt-22 hover:shadow-md hover:shadow-blue-500">
                <span className='bg-gradient-to-r from-indigo-600 to-blue-500 h-9 text-white font-semibold flex items-center lg:justify-start text-[9px] xs:text-xs lg:text-xs xl:text-base rounded-3xl pl-3 justify-center sm:pl-2 pr-2 xs:pl-4 xs:pr-0 md:pr-2'>Blockchain Powered </span><span className='xl:text-base lg:text-xs text-xs'>Solution for Secure, Verified Certificates Worldwide</span>
                <span className='text-blue-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                </span>
            </span>
            <h1 className="text-2xl xs:text-3xl lg:text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-black mt-6 lg:mt-12 gap-2.5 flex flex-col items-center lg:items-start">
            <div className=" border-slate-900 dark:border-white">
            Verify any document,
            </div>
            <div className="text-xl xs:text-2xl sm:text-4xl lg:text-3xl xl:text-5xl 2xl:text-6xl lg:mt-3 gap-2 flex">
                <div className="text-black">Anywhere,</div>

                <motion.span
                    className="text-white bg-black rounded-md px-1 min-w-[118px] xs:min-w-[140px] sm:min-w-[210px] lg:min-w-[180px] xl:min-w-[273px] 2xl:min-w-[340px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {displayText}

                    <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                    }}
                    >
                    |
                    </motion.span>
                </motion.span>
                </div>
            <div className='text-gray-500 w-[95%] sm:w-[80%] text-center lg:text-start text-xs xs:text-sm lg:text-base 2xl:text-xl mt-2 lg:mt-4 2xl:mt-5 lg:w-[70%] '>
                AuthenX uses blockchain to make academic, legal, and professional documents tamper-proof and easy to verify across institutions
            </div>
            </h1>
            <div className='flex w-full justify-center lg:justify-start items-center lg:items-start mt-6 lg:mt-9 lg:ml-1 gap-4 lg:gap-7'>
                <Button onClick={() => {toast.info("Detailed guide coming soon !")}} variant="primary" size="lg" className="before:bg-white rounded-lg outline-blue-400 flex gap-2 items-center">
                Get Started
                </Button>
                <Button onClick={() => {
                    const faqSection = document.getElementById("faq");
                    if (faqSection) {
                    faqSection.scrollIntoView({ behavior: "smooth"  , block: "end"});
                    }
                }} variant="secondary" size="lg" className=" before:content-[''] before:bg-gradient-to-r before:from-indigo-600 before:to-blue-500 rounded-lg  outline-blue-400 flex gap-2 items-center">
                Learn More
                </Button>
            </div>

            {/* Stats row */}
            <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 65, damping: 18, delay: 0.4 }}
                className='flex flex-wrap justify-center lg:justify-start items-center pl-1.5 gap-4 xs:gap-6 lg:gap-3 xl:gap-8 mt-8 lg:mt-12 w-full'
            >
                <div className='flex items-center gap-3'>
                    <span className='flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 md:w-10 md:h-10 rounded-lg bg-blue-100 text-blue-600 shrink-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-5 lg:h-5 w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </span>
                    <div>
                        <p className='text-black font-bold text-sm xs:text-md md:text-lg lg:text-xl'>2.4M+</p>
                        <p className='text-gray-500 text-[10px] xs:text-[11px] md:text-xs lg:text-sm'>Docs Verified</p>
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    <span className='flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 md:w-10 md:h-10 rounded-lg bg-violet-100 text-violet-600 shrink-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-5 lg:h-5 w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                    </span>
                    <div>
                        <p className='text-black font-bold text-sm xs:text-md md:text-lg lg:text-xl'>380+</p>
                        <p className='text-gray-500 text-[10px] xs:text-[11px] md:text-xs lg:text-sm'>Partner Institutions</p>
                    </div>
                </div>

                <div className='flex items-center gap-3'>
                    <span className='flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 md:w-10 md:h-10 rounded-lg bg-green-100 text-green-600 shrink-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="lg:w-5 lg:h-5 w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </span>
                    <div>
                        <p className='text-black font-bold text-sm xs:text-md md:text-lg lg:text-xl'>99.98%</p>
                        <p className='text-gray-500 text-[10px] xs:text-[11px] md:text-xs lg:text-sm'>Accuracy Rate</p>
                    </div>
                </div>
            </motion.div>
            </motion.div>
            <motion.div
            initial = {{
                x: 120,
                opacity: 0
            }}
            animate = {{
                x:0,
                opacity:1
            }}
            transition={{
                type : "spring",
                stiffness:65,
                damping:18,
                delay:0.25
            }}
            className='flex justify-center lg:justify-start items-center mt-5 lg:mt-30 xl:mt-38 lg:pr-8 xl:pr-20 '>
                <FloatingCertificateCard/>
            </motion.div>

        </div>
    )
}
export default HeroSection;
