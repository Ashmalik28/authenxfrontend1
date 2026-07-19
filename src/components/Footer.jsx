import logo from '../../images/logowhite.png'

const Footer = () => {
    return (
        <div className="bg-black max-w-screen justify-center min-h-80">
            <div className="w-full 2xl:w-[1800px] xl:pl-15 lg:pl-8 pl-10 pr-5 lg:pr-5 xl:pr-15 flex lg:flex-row flex-col mx-auto pb-10">
            <div className='mt-5 lg:w-1/4 w-full flex flex-col justify-between'>
            <div>
             <div className='w-full flex lg:justify-start justify-center'>
                <img src={logo} alt="logo"  className=' w-24 lg:w-40 cursor-pointer'/>
            </div>
            <div className='text-gray-300 text-sm text-center lg:text-start lg:text-base mt-4'>Secure, Transparent, and Blockchain-Powered Platform for Trusted Document Verification.</div>
            </div>
            <p className="text-center hidden text-sm lg:flex justify-start text-gray-400 mt-4">
             © {new Date().getFullYear()} AuthenX. All rights reserved.
            </p>   
        </div>. 
            <div className='flex md:flex-row flex-col pr-5 flex-1 lg:pl-8 xl:pl-10 xl:justify-around justify-between'>
                <div className='mt-5 flex md:flex-col gap-3 lg:gap-0 justify-between'>
                <div className='flex flex-col gap-2'>
                <span className='text-gray-500 lg:text-base text-sm font-semibold'>Solutions</span> 
                <ul className='text-gray-300 space-y-2 text-xs lg:text-sm'>
                <li className='hover:text-white'><a href="#">Document Verification</a></li>
                <li className='hover:text-white'><a href="#">Identity Authentication</a></li>
                <li className='hover:text-white'><a href="#">API Integrations</a></li>
                <li className='hover:text-white'><a href="#">Enterprise Solutions</a></li>
                </ul> 
                </div>  
                <div className='lg:mt-5 flex flex-col gap-2'>
                <span className='text-gray-500 lg:text-base text-sm font-semibold'>Resources</span> 
                <ul className='text-gray-300 space-y-1.5 text-xs lg:text-sm'>
                <li className='hover:text-white'><a href="#">How AuthenX Works</a></li>
                <li className='hover:text-white'><a href="#">Blog & Insights</a></li>
                <li className='hover:text-white'><a href="#">Case Studies</a></li>
                <li className='hover:text-white'><a href="#">FAQ</a></li>
                </ul> 
                </div>  
                </div>
                <div>
                <div className='mt-5 flex md:flex-col gap-3 lg:gap-0 justify-between'>
                <div className='flex flex-col gap-2'>
                <span className='text-gray-500 lg:text-base text-sm font-semibold'>Developers</span> 
                <ul className='text-gray-300 space-y-2 text-xs lg:text-sm '>
                <li className='hover:text-white'><a href="#">API Documentation</a></li>
                <li className='hover:text-white'><a href="#">Integration Guides</a></li>
                <li className='hover:text-white'><a href="#">SDKs & Tools</a></li>
                <li className='hover:text-white'><a href="#">Open Source Contributions</a></li>
                </ul> 
                </div>  
                <div className='lg:mt-5 flex justify-start w-29 flex-col gap-2'>
                <span className='text-gray-500 lg:text-base text-sm font-semibold'>Company</span> 
                <ul className='text-gray-300 space-y-1.5 text-xs lg:text-sm'>
                <li className='hover:text-white'><a href="#">About Us</a></li>
                <li className='hover:text-white'><a href="#">Pricing</a></li>
                <li className='hover:text-white'><a href="#">Careers</a></li>
                <li className='hover:text-white'><a href="#">Contact</a></li>
                </ul> 
                </div>  
                </div>
                </div>
                <div>
                <div className='mt-5 flex lg:flex-col justify-between'>
                <div className='lg:flex hidden flex-col gap-2'>
                <span className='text-gray-500 font-semibold'>Legal</span> 
                <ul className='text-gray-300 space-y-2 text-xs lg:text-sm'>
                <li className='hover:text-white'><a href="#">Privacy Policy</a></li>
                <li className='hover:text-white'><a href="#">Terms of Service</a></li>
                <li className='hover:text-white'><a href="#">Security</a></li>
                <li className='hover:text-white'><a href="#">Compliance</a></li>
                </ul> 
                </div>  
                <div className='lg:mt-5 flex flex-col gap-2'>
                <span className='text-gray-500 lg:text-base text-sm font-semibold'>Contact</span> 
                <ul className='text-gray-300 space-y-1.5 text-xs lg:text-sm'>
                <li className='hover:text-white'><a href="#">📧 Email: support@authenx.com</a></li>
                <li className='hover:text-white'><a href="#">🐦 Twitter: @AuthenXHQ</a></li>
                <li className='hover:text-white'><a href="#">💼 LinkedIn: linkedin.com/company/authenx</a></li>
                <li className='hover:text-white'><a href="#">🌐 Website: www.authenx.org</a></li>
                </ul> 
                </div>  
                </div>

                </div>
            </div>
            <p className="text-center text-sm lg:hidden justify-start text-gray-400 mt-8">
             © {new Date().getFullYear()} AuthenX. All rights reserved.
            </p> 
            </div>
            <div className="border-t border-white/10 pt-4 pb-3">
            <div className="flex w-full flex-row items-center justify-center sm:gap-3 gap-2 text-[10px] sm:text-sm text-gray-400">

                <span className="flex items-center gap-2">
                <span className="text-red-500 text-base">❤️</span>
                Built solo with passion by
                <span className="font-semibold text-blue-500">
                    Ashyam Malik
                </span>
                </span>

                <a
                href="https://www.linkedin.com/in/ashyam-malik/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors duration-300 group"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                >
                    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.34 18V9.5H5.67V18H8.34ZM7 8.34C7.85 8.34 8.54 7.65 8.54 6.8C8.54 5.95 7.85 5.26 7 5.26C6.15 5.26 5.46 5.95 5.46 6.8C5.46 7.65 6.15 8.34 7 8.34ZM18.33 18V13.33C18.33 10.83 16.99 9.33 14.77 9.33C13.7 9.33 12.91 9.92 12.47 10.49V9.5H9.8V18H12.47V13.28C12.47 12.04 13.15 11.31 14.16 11.31C15.16 11.31 15.66 12 15.66 13.28V18H18.33Z" />
                </svg>

                <span className="font-medium">LinkedIn</span>
                </a>

            </div>
           </div>
        </div>
    )
}

export default Footer;