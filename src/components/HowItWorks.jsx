import loginimage from "../../images/HowItWorks/login1.png"
import uploadimage from "../../images/HowItWorks/upload.png"
import blockchainimage from "../../images/HowItWorks/BVerify.png"
import happyimg from "../../images/HowItWorks/happy.png"
import { useRef, useState } from "react"
import connectW from "../../images/HowItWorks/connect.png"
import registerOrg from "../../images/HowItWorks/register.png"
import issueDoc from "../../images/HowItWorks/IssueDoc.png"
import verifyDoc from "../../images/HowItWorks/VerifyDoc.png"
import management from "../../images/HowItWorks/manage.png"

const HowItWorksCard = ({cardNo , image , heading , subheading}) => {
    return (
        <div className="xs:min-w-80 min-w-[90%] xs:h-96 shadow-2xl bg-white rounded-xl flex flex-col items-center p-4 snap-center">
            <span className="text-blue-500 text-xl font-bold w-7 h-7 rounded-full outline-2 outline-blue-500 flex justify-center items-center">{cardNo}</span>
            <div className="max-w-45 h-45 flex justify-center items-center">{image}</div>
            <span className="text-xl mt-2 text-black font-bold">{heading}</span>
            <span className="text-sm xs:text-base mt-2 text-black text-center">{subheading}</span>
        </div>
    )
}

const HowItWorksData = [
    {cardNo : "1" , image : <img src={loginimage} alt="login" /> , heading : "Login" , subheading : "Start by logging in with your email and password on AuthenX. This ensures secure access and links your verifier account for document validation."},
    {cardNo : "2" , image : <img className="w-45 h-40" src={uploadimage} alt="upload" /> , heading : "Upload Document" , subheading : "Upload your digital document directly to the platform for verification."} ,
    {cardNo : "3" , image : <img src={blockchainimage} alt="verify" /> , heading : "Blockchain Verification" ,  subheading : "AuthenX matches the document’s unique digital fingerprint (hash) with blockchain records to ensure authenticity."},
    {cardNo : "4" , image : <img src={happyimg} alt="happy" /> , heading : "Instant Results" , subheading : "Get immediate confirmation of your document’s authenticity, ensuring trust and protection from fraud"}
]
const HowItWorksOrgData = [
    {cardNo : "1" , image : <img className="w-32 h-32" src={connectW} alt="connect" /> , heading : "Connect Wallet" , subheading : "Securely connect your MetaMask wallet to AuthenX. This ensures verified access for your organization."},
    {cardNo : "2" , image : <img src={registerOrg} alt="register" /> , heading : "Register Organization" , subheading : "Complete a quick on-chain registration to verify your organization’s identity and enable document management."} ,
    {cardNo : "3" , image : <img src={issueDoc} alt="issue" /> , heading : "Issue Documents" ,  subheading : "Upload and issue tamper-proof digital documents, instantly linked to the blockchain for authenticity."},
    {cardNo : "4" , image : <img className="h-40" src={verifyDoc} alt="verify" /> , heading : "Verify Anytime" , subheading : "Easily validate documents your organization issued, ensuring trust for employees, clients, or partners."},
    {cardNo : "5" , image : <img src={management} alt="manage" /> , heading : "Seamless Management" , subheading : "Track, manage, and update issued records with full transparency through blockchain-powered security."},
]


const HowItWorks = () => {
    const carouselUserRef = useRef(null);
    const carouselOrgRef = useRef(null);
    const cardWidth = 340;
    const [activeUserIndex , setActiveUserIndex] = useState(2);
    const [activeOrgIndex, setActiveOrgIndex] = useState(2);  

    const handleNext = (ref , setActive , active , length) => {
        if(ref.current){
            ref.current.scrollBy({left : cardWidth , behavior : "smooth"});
            setActive(Math.min(active+1 , length-1));
        }
    }
    const handlePrev = (ref , setActive , active ) => {
        if(ref.current){
            if(active > 2){
            ref.current.scrollBy({left: -cardWidth , behavior : "smooth"});
            setActive(Math.max(active-1 , 0));
            }
        }
    }
    return (
        <div className="max-w-screen bg-blue-500 flex justify-center">
            <div className="2xl:w-[1800px] pb-8 lg:pb-0 flex flex-col items-center">
            <div className="flex w-full flex-col items-center">
            <span className="mt-4 text-white text-2xl xs:text-3xl sm:text-4xl 2xl:text-6xl lg:text-5xl font-bold">How AuthenX Works ??</span>
            <span className="mt-3 text-white sm:text-lg text-xs xs:text-sm w-screen lg:w-2/4 xl:text-2xl text-center">Tailored solutions for individuals verifying documents and organizations issuing and managing them with blockchain-powered trust.</span>
            <span className="mt-6 text-xl sm:text-2xl lg:text-3xl text-white font-bold">For End Users</span>
            </div>
            <div className="text-white flex justify-center items-center max-w-full mt-5 md:mt-10 pl-20 pr-20">
                <div className="flex justify-center pr-15">
                <button className="hidden lg:flex" onClick={() => handlePrev(carouselUserRef , setActiveUserIndex , activeUserIndex )}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-14">
                <path fill-rule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                </svg>
                </button>
                </div>
                <div ref={carouselUserRef} className="lg:px-0 px-3 flex gap-5 w-screen 2xl:max-w-[1250px] lg:max-w-3/5 xl:max-w-[1120px] overflow-hidden snap-x snap-mandatory overflow-x-auto scrollbar-none lg:overflow-hidden md:snap-none">
                    {HowItWorksData.map((data , index) => (
                    <HowItWorksCard
                    key={data.cardNo + index}
                    cardNo={data.cardNo}
                    image={data.image}
                    heading={data.heading}
                    subheading={data.subheading} />
                ))}
                </div>
                <div className="flex justify-center pl-15">
                <button onClick={() => handleNext(carouselUserRef , setActiveUserIndex , activeUserIndex , HowItWorksData.length)} className="lg:flex hidden justify-end"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-14">
                <path fill-rule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                </svg>
                </button>
                </div>
            </div>

            <div className="lg:flex hidden  justify-center gap-1.5 mt-4">
            {HowItWorksData.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeUserIndex ? "bg-black" : "bg-white"
              }`}
            ></span>
          ))}
            </div>
            <div className=" mt-6 text-xl sm:text-2xl lg:text-3xl text-white font-bold">For Organizations</div>
            <div className="text-white flex justify-center items-center max-w-full mt-10 pl-20 pr-20 ">
                <div className="flex justify-center pr-15">
                <button onClick={() => handlePrev(carouselOrgRef , setActiveOrgIndex ,activeOrgIndex)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-14">
                <path fill-rule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
                </svg>
                </button>
                </div>
                <div ref={carouselOrgRef} className="lg:px-0 px-3 2xl:max-w-[1250px] flex gap-5 w-screen lg:max-w-3/5 xl:max-w-[1120px] overflow-hidden snap-x snap-mandatory overflow-x-auto scrollbar-none lg:overflow-hidden lg:snap-none">
                    {HowItWorksOrgData.map((data , index) => (
                    <HowItWorksCard
                    key={data.cardNo + index}
                    cardNo={data.cardNo}
                    image={data.image}
                    heading={data.heading}
                    subheading={data.subheading} />
                ))}
                </div>
                <div className="flex justify-center pl-15">
                <button onClick={() => handleNext(carouselOrgRef , setActiveOrgIndex , activeOrgIndex , HowItWorksOrgData.length)} className="flex justify-end"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-14">
                <path fill-rule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
                </svg>
                </button>
                </div>
            </div>
             <div className="lg:flex hidden justify-center gap-1.5 mt-4 mb-10">
            {HowItWorksOrgData.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeOrgIndex ? "bg-black" : "bg-white"
              }`}
            ></span>
          ))}
            </div>
            </div>
        </div>
    )
}

export default HowItWorks;