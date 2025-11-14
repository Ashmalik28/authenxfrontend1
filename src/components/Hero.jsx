
import image from '../../images/heroleft.png'
import Button from './Button';
const HeroSection = () => {
    return (
        <div className="max-w-screen 2xl:max-w-[1800px] mx-auto flex flex-col lg:flex-row justify-between p-5 lg:p-2 ">
            <div className='flex flex-col sm:items-center lg:items-start justify-center lg:pl-8 xl:pl-20 lg:mt-10  xl:mt-26 mb-5 lg:mb-10'>
            <span className="flex justify-center cursor-pointer items-center rounded-3xl border-1 border-[#343434] px-1.5 gap-1 text-[#343434] h-12 2xl:mt-25 mt-17 lg:mt-22 hover:shadow-md hover:shadow-blue-500">
                <span className='bg-blue-500 h-9 text-white font-semibold flex items-center lg:justify-start text-[9px] xs:text-xs lg:text-xs xl:text-base rounded-3xl pl-3 justify-center sm:pl-2 pr-2 xs:pl-4 xs:pr-0 md:pr-2'>Blockchain Powered </span><span className='xl:text-base lg:text-xs text-xs'>Solution for Secure, Verified Certificates Worldwide</span>
                <span className='text-blue-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                </span>
            </span>
            <h1 className="text-2xl xs:text-3xl lg:text-5xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-black mt-6 lg:mt-12 gap-2.5 flex flex-col items-center lg:items-start">
            <div className=" border-slate-900 dark:border-white">
            Verify any document,
            </div>
            <div className="text-xl xs:text-2xl sm:text-4xl xl:text-5xl 2xl:text-6xl lg:mt-3 gap-2 flex">
            <div className='text-black'>Anywhere ,</div><span className='text-white bg-black rounded-md px-0.5'>Instantly.</span> 
            </div>
            <div className='text-gray-500 w-[95%] sm:w-[80%] text-center lg:text-start text-xs xs:text-sm lg:text-base 2xl:text-xl mt-2 lg:mt-4 2xl:mt-5 lg:w-[70%] '>
                AuthenX uses blockchain to make academic, legal, and professional documents tamper-proof and easy to verify across institutions
            </div>
            </h1>
            <div className='flex w-full justify-center lg:justify-start items-center lg:items-start mt-6 lg:mt-9 lg:ml-1 gap-4 lg:gap-7'>
                <Button variant="primary" size="lg" className="before:bg-white  rounded-lg outline-blue-400 flex gap-2 items-center">
                Get Started
                </Button>
                <Button onClick={() => {
                    const faqSection = document.getElementById("faq");
                    if (faqSection) {
                    faqSection.scrollIntoView({ behavior: "smooth"  , block: "end"});
                    }
                }} variant="secondary" size="lg" className="before:bg-blue-500 rounded-lg  outline-blue-400 flex gap-2 items-center">
                Learn More
                </Button>
            </div>
            </div>
            <div className='flex justify-center lg:justify-start items-center mt-5 lg:mt-30 xl:mt-38 lg:pr-8 xl:pr-20 '>
                <img className='max-w-80% sm:max-w-sm lg:max-w-sm xl:max-w-lg 2xl:max-w-2xl' src={image} alt="hero" />
            </div>

        </div>
    )
}
export default HeroSection;