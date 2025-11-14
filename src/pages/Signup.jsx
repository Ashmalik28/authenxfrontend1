import logo from "../../images/AuthenXLogo.png"
import { useNavigate } from "react-router-dom";
import { Button } from "../components";
import Verifier from "../../images/Signup/verifier.png"
import Org from "../../images/Signup/Org.png"
import { useState } from "react";
import ticon from "../../images/Signup/tw.png"
import cbicon from "../../images/Signup/cb.png"
import wcicon from "../../images/Signup/wc.png"
import {signup} from "../../api";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { toast } from "react-toastify";


const Signup = () => {
    const {connectWallet , currentAccount , checkIfWalletIsConnected } = useContext(TransactionContext);
    const navigate = useNavigate();
    const [active , setActive] = useState("verifier");
    const [hide , sethide] = useState(true);
    const [formData , setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : ""
    });
    const handleTabSwitch = (tab) => {
        setActive(tab);
    };
    const handleSignup = async () => {
        try {
            const data = await signup(formData);
            toast.success("Signup Successfull");
            navigate("/signin");
        }catch (err){
            const zodErrors = err.response?.data?.errors;
            if(zodErrors && zodErrors.length > 0){
                toast.error(zodErrors[0].message);
            } else {
                toast.error("Something went wrong. Please try again.")
            }

        }
    }
    const handleConnect = async () => {
        const ok = await connectWallet();
         if (ok) {
         navigate("/dashboard"); 
         }
    }


    return (
        <div className="w-full h-screen items-center  bg-black flex flex-col">
            <div className="w-full flex border-b-1 bg-white border-gray-300">
                <div className="flex w-full lg:px-10 px-5 mx-auto justify-between pb-2">
                <div onClick={() => navigate("/home") } className="flex-initial justify-center items-center cursor-pointer pt-3">
                    <img src={logo} alt="logo" className="lg:w-40 w-24" />
                </div>
                <div className="pt-3 flex items-center lg:text-base text-xs  font-semibold">
                Have an account ? <span className="pl-3"><Button onClick={() => navigate("/signin")} variant="secondary" size="sm" className="before:bg-blue-500 rounded-lg outline-blue-400 flex gap-2 items-center">
                Login
                </Button></span>
                </div>

            </div>

            </div>
            <div className="flex-1 2xl:max-w-[1650px] 2xl:mt-15 2xl:mb-15 flex h-full lg:flex-row flex-col">
            <div className="lg:w-1/2 w-full hidden lg:flex lg:flex-col 2xl:rounded-l-4xl bg-gray-200">
            <div className="w-full h-full 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:rounded-4xl rounded-r-4xl bg-blue-500 pt-5 pl-5 2xl:pr-5">
                <div className="xl:text-5xl lg:text-4xl 2xl:w-full 2xl:flex 2xl:justify-center text-white 2xl:text-5xl lg:font-bold xl:font-semibold w-3/4">Choose your role to Get Started</div>
                <div className="mt-5 text-white lg:text-base 2xl:flex 2xl:justify-center 2xl:w-full xl:text-xl w-5/6 font-medium">AuthenX provides two secure ways to sign up as — <p className="ml-1">Verifier or an Organization.</p>
                </div>
                <div className="w-full mt-5 pr-5 flex">
                    <div className="w-1/2 border-r-1 border-white pb-12 ">
                    <div className="flex justify-center items-center pr-5">
                    <img src={Verifier} alt="Verifier" className="xl:w-72 xl:h-64 2xl:w-80 2xl:h-72 lg:w-64 lg:h-48 " />
                    </div>
                    <div className="text-white text-3xl font-bold flex justify-center pr-5">Verifier</div>
                    <div className="mt-5 mr-3">
                        <ul className="text-white flex flex-col gap-1">
                        <li className="flex"><span className="flex items-center pr-2 text-cyan-300"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="2xl:size-7  size-6">
                        <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                        </svg>
                        </span><span className="xl:text-base 2xl:text-lg lg:text-sm">Can verify documents instantly with trust and transparency.</span></li>
                        <li className="flex"><span className="flex items-center pr-2 text-cyan-300"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="2xl:size-7 size-6">
                        <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                        </svg>
                        </span><span className="xl:text-base 2xl:text-lg lg:text-sm">Best suited for individuals, employers, or institutions validating credentials.</span></li>
                        <li className="flex"><span className="flex items-center pr-2 text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="2xl:size-7 size-6">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clip-rule="evenodd" />
                        </svg>
                        </span><span className="xl:text-base 2xl:text-lg lg:text-sm">Requirements: Just create an account with basic details — no extra setup needed.</span></li>
                        </ul>
                    </div>
                    </div>
                    <div className="w-1/2">
                    <div className="flex justify-center items-center">
                        <img src={Org} alt="Organization" className="xl:w-72 xl:h-64 2xl:w-80 2xl:h-72 lg:w-64 lg:h-48"/>
                    </div>
                    <div className="text-white text-3xl font-bold flex justify-center">Organization</div>
                     <div className="mt-5 ml-5">
                        <ul className="text-white flex flex-col gap-1">
                        <li className="flex"><span className="flex items-center pr-2 text-cyan-300"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="2xl:size-7 size-6">
                        <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                        </svg>
                        </span><span className="xl:text-base 2xl:text-lg lg:text-sm">Can issue or verify official documents on blockchain.</span></li>
                        <li className="flex"><span className="flex items-center pr-2 text-cyan-300"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="2xl:size-7  size-6">
                        <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                        </svg>
                        </span><span className="xl:text-base 2xl:text-lg lg:text-sm">Ideal for universities, businesses, and government bodies.</span></li>
                        <li className="flex"><span className="flex items-center pr-2 text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" 2xl:size-7  size-6">
                       <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clip-rule="evenodd" />
                       </svg>
                        </span><span className="xl:text-base 2xl:text-lg lg:text-sm" >Requirements: Must have a valid Ethereum wallet beforehand to issue documents.</span></li>
                        </ul>
                    </div>
                    </div>
                </div>

            </div>

            </div>
            <div className="flex lg:w-1/2 w-[100vw] h-full bg-gray-200 2xl:rounded-r-4xl justify-center items-center">
              <span className="xl:w-3/4 sm:w-4/6 justify-center lg:w-full m-5 bg-white border-gray-400 rounded-3xl shadow-blue-300 shadow-[-2px_4px_51px_20px_rgba(0,_0,_0,_0.1)] flex flex-col p-6">
              <span className="flex justify-start 2xl:justify-center text-xl sm:text-3xl lg:text-3xl font-bold">Create Your AuthenX Account</span>
              <span className="mt-3 text-sm sm:text-base sm:w-3/4 lg:w-full flex justify-center lg:text-base">Join AuthenX to verify documents securely or issue them with complete trust.</span>

              <div className="w-full lg:flex lg:flex-col hidden">
                <div className="flex justify-center text-xl font-bold mt-3 border-1 p-1 border-gray-400">Join As </div>
                <div className="w-full flex mt-3 mb-3 bg-gray-100 rounded-xl ">
                    <div onClick={() => handleTabSwitch("verifier")} className={`w-1/2 flex justify-center transition-all duration-300 ease-in-out p-2 rounded-xl text-lg ${active == "verifier" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"} `}>
                    Verifier 
                    </div>
                    <div onClick={() => handleTabSwitch("organization")} className={`w-1/2 flex justify-center transition-all duration-300 ease-in-out p-2 rounded-xl text-lg ${active == "organization" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"} `}>
                    Organization
                    </div>

                </div>
              </div>
              {active == "verifier" && <div className="min-w-full lg:mt-0 mt-1"> 
                <div className="flex w-full lg:gap-5 gap-3 justify-between mt-2">
                <div className="w-1/2">
                    <div className="font-semibold lg:text-base text-sm text-gray-600 mb-1">
                     First Name *
                    </div>
                    <div className="flex gap-0 w-full outline-1 outline-gray-400 rounded-xl p-3 "> 
                    <input className="w-full outline-none mt-0" 
                    type="text" 
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData , firstName : e.target.value})}
                    />
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="font-semibold lg:text-base text-sm text-gray-600 mb-1">
                     Last Name *
                    </div>
                    <div className="flex gap-0 w-full outline-1 outline-gray-400 rounded-xl p-3 "> 
                    <input className="w-full outline-none mt-0" 
                    type="text" 
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData , lastName : e.target.value})}
                    />
                    </div>
                </div>
              </div>
              <div>
                    <div className="font-semibold lg:text-base text-sm w-full text-gray-600 mb-1 mt-2">
                     Email *
                    </div>
                    <div className="flex gap-0 outline-1 outline-gray-400 rounded-xl p-3 "> 
                    <input className="w-full outline-none mt-0" 
                    type="email" 
                    placeholder="youremail@gmail.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData , email : e.target.value})}
                    />
                    </div>
              </div>
              <div>
                    <div className="font-semibold lg:text-base text-sm text-gray-600 mb-1 mt-2">
                     Password *
                    </div>
                    <div className="flex gap-0 outline-1 outline-gray-400 rounded-xl p-3 "> 
                    <input className="w-full outline-none mt-0" 
                    type={hide ? "password" : "text"}
                    placeholder="Enter your Password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData , password : e.target.value})}
                    />
                    {hide == true ? <div onClick={() => sethide(false)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                    </div> : <div onClick={() => sethide(true)} className="h-full"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    </div>  }
                    </div>
              </div>
              <span className="w-full flex items-center mt-4 flex-col">
                <Button onClick={handleSignup} variant="primary" size="md" className="before:bg-white rounded-full w-1/2 justify-center text-lg  outline-blue-400 flex gap-2 items-center">
                Sign Up
                </Button>
                <div className="mt-2 lg:text-sm text-xs lg:w-2/3 w-4/5 text-center">
                    By signing up, you agree to our Terms & Conditions and Privacy Policy.
                </div>
              </span> </div>}
              {active == "organization" && 
              <div>
               <div className="text-black bg-red-100 rounded-lg py-1 w-full flex justify-center text-sm items-center">🔒 Please unlock your wallet before continuing</div>
               <div className="w-full bg-gray-100 border-gray-100 rounded-2xl flex flex-col items-center border mt-3 pb-3">
                <div className="flex flex-col items-center bg-white p-5 rounded-2xl mt-5 mb-5">
                <div className=" flex justify-center text-xl font-bold">Select Wallet</div>
                <span onClick={handleConnect} className="text-lg w-96 font-semibold mt-4 text-white flex justify-center bg-black py-3 hover:bg-neutral-800 px-8 rounded-xl">Continue with Metamask <div className="pl-3 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Metamask-Icon--Streamline-Svg-Logos" height="24" width="24">
                <desc>
                    Metamask Icon Streamline Icon: https://streamlinehq.com
                </desc>
                <path fill="#e17726" d="M23.205225 0.9874275 13.121575 8.448625l1.87515 -4.397125 8.2085 -3.0640725Z" stroke-width="0.25"></path>
                <path fill="#e27625" d="M0.818115 0.996155 9.00465 4.052l1.780525 4.454775L0.818115 0.996155Z" stroke-width="0.25"></path>
                <path fill="#e27625" d="m19.147225 16.855225 4.4568 0.084825 -1.5576 5.291375 -5.438275 -1.49735 2.539075 -3.87885Z" stroke-width="0.25"></path>
                <path fill="#e27625" d="m4.852525 16.855225 2.529675 3.878875 -5.429175 1.497425 -1.5481175 -5.291475 4.4476175 -0.084825Z" stroke-width="0.25"></path>
                <path fill="#e27625" d="m10.543275 7.372 0.1822 5.882675 -5.450075 -0.247975 1.550225 -2.33875 0.019625 -0.02255L10.543275 7.372Z" stroke-width="0.25"></path>
                <path fill="#e27625" d="m13.4003 7.30645 3.75445 3.33925 0.019425 0.022375 1.550275 2.33875 -5.448825 0.247925 0.124675 -5.9483Z" stroke-width="0.25"></path>
                <path fill="#e27625" d="m7.541775 16.87225 2.9759 2.318675 -3.456875 1.669025 0.480975 -3.9877Z" stroke-width="0.25"></path>
                <path fill="#e27625" d="m16.458725 16.871875 0.471 3.988075 -3.447175 -1.669175 2.976175 -2.3189Z" stroke-width="0.25"></path>
                <path fill="#d5bfb2" d="m13.558475 18.9724 3.4981 1.69385 -3.253925 1.546475 0.033775 -1.022125 -0.27795 -2.2182Z" stroke-width="0.25"></path>
                <path fill="#d5bfb2" d="m10.44055 18.97315 -0.26705 2.2007 0.0219 1.037625 -3.26155 -1.54525 3.5067 -1.693075Z" stroke-width="0.25"></path>
                <path fill="#233447" d="m9.430425 14.02245 0.914125 1.921125 -3.11225 -0.911675 2.198125 -1.00945Z" stroke-width="0.25"></path>
                <path fill="#233447" d="m14.56965 14.02265 2.20845 1.009175 -3.12235 0.91145 0.9139 -1.920625Z" stroke-width="0.25"></path>
                <path fill="#cc6228" d="m7.779875 16.852725 -0.5031 4.1345 -2.696325 -4.044125 3.199425 -0.090375Z" stroke-width="0.25"></path>
                <path fill="#cc6228" d="m16.22045 16.852775 3.199525 0.0904L16.7135 20.9874l-0.49305 -4.134625Z" stroke-width="0.25"></path>
                <path fill="#cc6228" d="m18.803175 12.773 -2.328475 2.37305 -1.795225 -0.820375 -0.85955 1.8069 -0.56345 -3.1072 5.5467 -0.252375Z" stroke-width="0.25"></path>
                <path fill="#cc6228" d="m5.19555 12.77295 5.547675 0.2524 -0.563475 3.107225 -0.8597 -1.8067 -1.785775 0.8202 -2.338725 -2.373125Z" stroke-width="0.25"></path>
                <path fill="#e27525" d="m5.038825 12.286075 2.6344 2.6732 0.0913 2.63905 -2.7257 -5.31225Z" stroke-width="0.25"></path>
                <path fill="#e27525" d="M18.963975 12.28125 16.2334 17.603l0.1028 -2.643775L18.963975 12.28125Z" stroke-width="0.25"></path>
                <path fill="#e27525" d="m10.6146 12.448725 0.106025 0.667375 0.262 1.6625 -0.168425 5.10625 -0.79635 -4.1019 -0.000275 -0.0424 0.597025 -3.291825Z" stroke-width="0.25"></path>
                <path fill="#e27525" d="m13.384 12.439575 0.5986 3.301025 -0.00025 0.0424 -0.79835 4.11215 -0.0316 -1.028525 -0.124575 -4.1182 0.356175 -2.30885Z" stroke-width="0.25"></path>
                <path fill="#f5841f" d="m16.5705 14.8529 -0.08915 2.2929 -2.77905 2.16525 -0.5618 -0.39695 0.62975 -3.243675 2.80025 -0.817525Z" stroke-width="0.25"></path>
                <path fill="#f5841f" d="m7.439075 14.852975 2.790625 0.817525 0.629725 3.243625 -0.561825 0.396925 -2.7792 -2.165425 -0.079325 -2.29265Z" stroke-width="0.25"></path>
                <path fill="#c0ac9d" d="m6.4021 20.15985 3.555475 1.68465 -0.01505 -0.719375L10.24 20.864h3.51895l0.30825 0.26025 -0.0227 0.718875 3.532925 -1.679025 -1.719125 1.420625L13.7795 23.0125H10.211525l-2.07745 -1.433625 -1.731975 -1.419025Z" stroke-width="0.25"></path>
                <path fill="#161616" d="m13.303775 18.748225 0.5027 0.3551 0.2946 2.35045 -0.426325 -0.36H10.326425l-0.418225 0.36725 0.284925 -2.357525 0.502875 -0.355275h2.607775Z" stroke-width="0.25"></path>
                <path fill="#763e1a" d="m22.539625 1.19397 1.2104 3.631255 -0.7559 3.67155 0.538275 0.41525 -0.728375 0.555725 0.547375 0.42275 -0.72485 0.660175 0.445025 0.322275 -1.181025 1.379325 -4.844125 -1.4104 -0.041975 -0.0225 -3.490775 -2.9447L22.539625 1.19397Z" stroke-width="0.25"></path>
                <path fill="#763e1a" d="M1.460435 1.19397 10.4864 7.874675l-3.49075 2.9447 -0.042 0.0225 -4.844145 1.4104 -1.181015 -1.379325 0.44467 -0.322025 -0.72453 -0.6604 0.5463775 -0.422325 -0.73926 -0.5573 0.55858 -0.4155L0.25 4.82535 1.460435 1.19397Z" stroke-width="0.25"></path>
                <path fill="#f5841f" d="m16.809475 10.533375 5.132675 1.49435 1.667525 5.1393 -4.39925 0 -3.031225 0.03825 2.204425 -4.296825 -1.57415 -2.375075Z" stroke-width="0.25"></path>
                <path fill="#f5841f" d="m7.19055 10.533375 -1.574425 2.375075 2.204725 4.296825 -3.029725 -0.03825H0.3996575l1.65816 -5.13925 5.1327325 -1.4944Z" stroke-width="0.25"></path>
                <path fill="#f5841f" d="m15.248075 4.026975 -1.43565 3.8774 -0.30465 5.238 -0.116575 1.64175 -0.00925 4.193975H10.617825l-0.008975 -4.1861 -0.11695 -1.651075 -0.3048 -5.23655 -1.4354 -3.8774h6.496375Z" stroke-width="0.25"></path>
                </svg></div>
                </span>
                <div className="mt-2 mb-2 font-semibold">Or</div>
                <div className="flex flex-col gap-3">
                <span onClick={() => alert("Trust wallet support coming soon ! Continue with Metamask for now")} className="text-lg w-96 font-semibold justify-center text-black flex bg-gray-300 hover:bg-black hover:text-white py-3 px-8 rounded-xl">Continue with Trust Wallet <div className="pl-3 flex justify-center items-center"><img className="w-[24px] h-[24px]" src={ticon} alt="icon" /></div></span>
                <span onClick={() => alert("Coinbase wallet support coming soon ! Continue with Metamask for now")}  className="text-lg w-96 font-semibold justify-center text-black flex bg-gray-300 hover:bg-black hover:text-white py-3 px-8 rounded-xl">Continue with Coinbase Wallet <div className="pl-3 flex justify-center items-center"><img className="w-[24px] h-[24px]" src={cbicon} alt="icon" /></div></span>
                </div> 
                </div>
                <div className="w-2/3 text-center text-sm">AuthenX will never store your <span className="underline">private keys</span>. You stay in control of your wallet</div>
              </div>
              </div>
              }
              
              </span>
            </div>  
            </div>
        </div>
    )
}

export default Signup;