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
        </div>
    )
}

export default Footer;