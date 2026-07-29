import logo from "../../images/AuthenXLogo.webp";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";
import { useState, useContext } from "react";
import ticon from "../../images/Signup/tw.png";
import cbicon from "../../images/Signup/cb.png";
import { signup } from "../../api";
import { TransactionContext } from "../context/TransactionContext";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  UserCheck,
  RefreshCcw,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";
import logo1 from "../../images/vite.svg";
import ConnectingWallet from "@/components/ConnectingWallet";
import { Link } from "react-router-dom";

const Signup = () => {
  const { connectWallet, currentAccount, checkIfWalletIsConnected } =
    useContext(TransactionContext);
  const navigate = useNavigate();
  const [active, setActive] = useState("verifier");
  const [hide, sethide] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [connecting, setConnecting] = useState(false);

  const handleTabSwitch = (tab) => {
    setActive(tab);
  };

  const handleSignup = async () => {
    try {
      const data = await signup(formData);
      toast.success("Signup Successfull");
      navigate("/signin");
    } catch (err) {
      const zodErrors = err.response?.data?.errors;
      if (zodErrors && zodErrors.length > 0) {
        toast.error(zodErrors[0].message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleConnect = async () => {
    setConnecting(true);

    try {
      const ok = await connectWallet();

      if (ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setConnecting(false);
    }
  };

  // password strength
  const strength = Math.min(4, Math.floor(formData.password.length / 3));
  const strengthColors = [
    "bg-gray-200",
    "bg-red-400",
    "bg-amber-400",
    "bg-lime-500",
    "bg-green-500",
  ];

  const roleChecklist = {
    verifier: [
      "Verify documents instantly with trust & transparency",
      "Suited for individuals, employers, or institutions validating credentials",
      "Just create an account — no extra setup needed",
    ],
    organization: [
      "Issue or verify official documents on blockchain",
      "Ideal for universities, businesses, and government bodies",
      "Requires a valid Ethereum wallet to issue documents",
    ],
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Top nav*/}
      <div className="w-full hidden lg:flex bg-white border-b border-gray-200">
        <div className="flex w-full lg:px-10 px-5 mx-auto justify-between items-center py-3 max-w-7xl">
          <div
            onClick={() => navigate("/home")}
            className="flex-initial justify-center items-center cursor-pointer"
          >
            <img src={logo} alt="AuthenX logo" className="lg:w-36 w-24" />
          </div>
          <div className="flex items-center gap-3 lg:text-base text-xs font-semibold text-gray-600">
            Already Have an account ?
            <Button
              onClick={() => navigate("/signin")}
              variant="secondary"
              size="sm"
              className="rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50 flex gap-2 items-center"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-col pb-3 items-center bg-gradient-to-br from-[#0b0f2e] via-[#151a45] to-[#0d1b3f] w-full">
        <div className="w-8 h-8 mt-3 flex justify-center items-center bg-white rounded-md ">
          <img
            src={logo1}
            alt="logo at signin and signup pages"
            className="w-8 h-7"
          />
        </div>
        <p className="text-white font-bold mt-2 text-xl">Create your account</p>
        <p className="text-sm mt-0.5 text-gray-400 font-bold">
          Join Authenx as a Verifier
        </p>
      </div>

      {/* Main card */}
      <div className="flex-1 w-full flex lg:items-center items-start justify-center px-4 sm:px-25 xs:px-6  pt-0 lg:py-2 pb-2 lg:pb-0  2xl:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 65, damping: 18 }}
          className="w-full max-w-6xl bg-white lg:rounded-3xl rounded-b-3xl shadow-xl shadow-indigo-100/60 border border-gray-100 overflow-hidden flex lg:flex-row flex-col"
        >
          {/* Left: dark role-selection panel  */}
          <div className="lg:w-[50%] w-full hidden lg:flex lg:flex-col relative overflow-hidden bg-gradient-to-br from-[#0b0f2e] via-[#151a45] to-[#0d1b3f] p-7">
            {/* decorative dot-grid + glow, purely visual */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -left-16 w-56 h-56 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-3">
                Choose your role
                <br />
                to get started
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-3 max-w-sm">
                AuthenX provides two secure pathways — as a Verifier or an
                Organization on-chain.
              </p>

              {/* role selector cards */}
              <div className="flex flex-col gap-3">
                <div
                  onClick={() => handleTabSwitch("verifier")}
                  className={`relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                    active === "verifier"
                      ? "bg-gradient-to-br from-indigo-600/40 to-blue-600/30 border-indigo-400/60"
                      : "bg-white/5 border-white/10 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${active === "verifier" ? "bg-gradient-to-br from-indigo-500 to-blue-500" : "bg-white/10"}`}
                    >
                      <UserCheck size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">Verifier</p>
                      <p className="text-gray-400 text-sm">
                        Instantly check document authenticity with full on-chain
                        trust.
                      </p>
                    </div>
                    <span
                      className={`ml-auto w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${active === "verifier" ? "bg-blue-500 border-blue-500" : "border-white/30"}`}
                    >
                      {active === "verifier" && (
                        <Check size={14} className="text-white" />
                      )}
                    </span>
                  </div>
                  <ul className="mt-4 flex flex-col gap-2">
                    {roleChecklist.verifier.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-indigo-400/20 text-indigo-300 flex items-center justify-center shrink-0">
                          <Check size={10} />
                        </span>
                        <span className="text-gray-300 text-xs leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  onClick={() => handleTabSwitch("organization")}
                  className={`relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                    active === "organization"
                      ? "bg-gradient-to-br from-indigo-600/40 to-blue-600/30 border-indigo-400/60"
                      : "bg-white/5 border-white/10 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${active === "organization" ? "bg-gradient-to-br from-indigo-500 to-blue-500" : "bg-white/10"}`}
                    >
                      <Building2 size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">
                        Organization
                      </p>
                      <p className="text-gray-400 text-sm">
                        Issue & verify official documents with blockchain
                        permanence.
                      </p>
                    </div>
                    <span
                      className={`ml-auto w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${active === "organization" ? "bg-blue-500 border-blue-500" : "border-white/30"}`}
                    >
                      {active === "organization" && (
                        <Check size={14} className="text-white" />
                      )}
                    </span>
                  </div>
                  <ul className="mt-4 flex flex-col gap-2">
                    {roleChecklist.organization.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-indigo-400/20 text-indigo-300 flex items-center justify-center shrink-0">
                          <Check size={10} />
                        </span>
                        <span className="text-gray-300 text-xs leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 pt-8">
                <span className="flex items-center gap-1.5 bg-white/10 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full">
                  <Lock size={12} /> End-to-end encrypted
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />{" "}
                  Ethereum Sepolia Testnet
                </span>
              </div>
            </div>
          </div>

          {/* Right: form panel */}
          <div className="lg:w-[50%] w-full p-3 xs:p-5 sm:p-8 lg:p-7">
            <h2 className="text-2xl hidden lg:flex lg:text-3xl font-bold text-gray-900">
              Create your AuthenX account
            </h2>
            <p className="text-gray-500 hidden lg:flex text-sm mt-2 mb-6">
              Join AuthenX to verify documents securely or issue them with
              complete trust.
            </p>

            {/* signing up as bar  */}
            <div className="lg:flex hidden items-center justify-between bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shrink-0">
                  {active == "verifier" && (
                    <UserCheck size={16} className="text-white" />
                  )}
                  {active == "organization" && (
                    <Building2 size={16} className="text-white" />
                  )}
                </span>
                <span className="text-sm text-gray-600">
                  Signing up as:{" "}
                  <span className="text-indigo-600 font-semibold">
                    {active === "verifier" ? "Verifier" : "Organization"}
                  </span>
                </span>
              </div>
              <button
                onClick={() =>
                  handleTabSwitch(
                    active === "verifier" ? "organization" : "verifier",
                  )
                }
                className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:bg-[#eef2ff] hover:text-[#4f46e5] transition-colors"
              >
                <RefreshCcw size={12} /> Change role
              </button>
            </div>

            <div className="flex lg:hidden items-center justify-between bg-indigo-50 border border-indigo-100 rounded-xl px-2 py-2 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center shrink-0">
                  <UserCheck size={14} className="text-white" />
                </span>
                <span className="text-xs font-bold bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent ">
                  VERIFIER ACCESS
                </span>
              </div>
            </div>

            {active === "verifier" && (
              <div>
                <div className="flex w-full gap-4 justify-between">
                  <div className="w-1/2">
                    <div className="font-semibold text-sm text-gray-600 mb-1.5">
                      First Name *
                    </div>
                    <div className="flex gap-0 w-full border border-gray-200 bg-[#fafbff] rounded-lg lg:rounded-xl lg:p-3 p-2 transition-all duration-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                      <input
                        className="w-full placeholder:text-sm lg:placeholder:text-base outline-none bg-transparent"
                        type="text"
                        placeholder="Alex"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="font-semibold text-sm text-gray-600 mb-1.5">
                      Last Name *
                    </div>
                    <div className="flex gap-0 w-full border border-gray-200 rounded-lg lg:rounded-xl lg:p-3 p-2 bg-[#fafbff] transition-all duration-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                      <input
                        className="w-full placeholder:text-sm lg:placeholder:text-base outline-none bg-transparent"
                        type="text"
                        placeholder="Morgan"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:mt-4 mt-2">
                  <div className="font-semibold text-sm text-gray-600 mb-1.5">
                    Email *
                  </div>
                  <div className="flex items-center gap-2 w-full border border-gray-200 rounded-lg lg:rounded-xl lg:p-3 p-2 bg-[#fafbff]  transition-all duration-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                    <Mail size={16} className="text-gray-400 shrink-0" />
                    <input
                      className="w-full outline-none placeholder:text-sm lg:placeholder:text-base bg-transparent"
                      type="email"
                      placeholder="you@organization.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="lg:mt-4 mt-2">
                  <div className="font-semibold text-sm text-gray-600 mb-1.5">
                    Password *
                  </div>
                  <div className="flex items-center gap-2 w-full border border-gray-200 rounded-lg lg:rounded-xl lg:p-3 p-2 bg-[#fafbff]  transition-all duration-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                    <Lock size={16} className="text-gray-400 shrink-0" />
                    <input
                      className="w-full outline-none placeholder:text-sm lg:placeholder:text-base bg-transparent"
                      type={hide ? "password" : "text"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    {hide ? (
                      <Eye
                        size={16}
                        onClick={() => sethide(false)}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
                      />
                    ) : (
                      <EyeOff
                        size={16}
                        onClick={() => sethide(true)}
                        className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
                      />
                    )}
                  </div>
                  {/* password strength bar */}
                  <div className="flex gap-1.5 mt-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          formData.password.length > 0 && i < strength
                            ? strengthColors[strength]
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleSignup}
                  variant="primary"
                  size="md"
                  className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl justify-center text-base py-3 flex items-center hover:shadow-lg hover:shadow-indigo-200 transition-shadow"
                >
                  Create Account as Verifier
                </Button>

                <div className="mt-3 lg:text-xs text-[10px] text-center text-gray-500">
                  By signing up, you agree to our{" "}
                  <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
                    Privacy Policy
                  </span>
                  .
                </div>

                <div className="flex items-center gap-3 lg:my-5 my-2">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-[11px] font-semibold tracking-widest text-gray-400">
                    OR CONTINUE WITH
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => toast.info("Google signup coming soon!")}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 48 48">
                      <path
                        fill="#FFC107"
                        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    onClick={() => toast.info("Microsoft signup coming soon!")}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M1 1h10v10H1z" />
                      <path fill="#81bc06" d="M12 1h10v10H12z" />
                      <path fill="#05a6f0" d="M1 12h10v10H1z" />
                      <path fill="#ffba08" d="M12 12h10v10H12z" />
                    </svg>
                    Microsoft
                  </button>
                </div>
              </div>
            )}

            {active === "organization" && (
              <div>
                <div className="text-amber-800 bg-amber-50 border border-amber-200 rounded-xl py-2.5 w-full flex justify-center text-sm items-center gap-1.5">
                  <Lock size={14} /> Please unlock your wallet before continuing
                </div>

                <div className="w-full bg-gray-50 border border-gray-100 rounded-2xl mt-5 p-6">
                  <div className="text-center text-lg font-bold text-gray-900 mb-4">
                    Select Wallet
                  </div>

                  <span
                    onClick={handleConnect}
                    className="w-full font-semibold text-white flex justify-between items-center bg-black hover:bg-neutral-800 py-5 px-5 rounded-xl cursor-pointer transition-colors"
                  >
                    Continue with MetaMask
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      id="Metamask-Icon--Streamline-Svg-Logos"
                      height="24"
                      width="24"
                    >
                      <desc>
                        Metamask Icon Streamline Icon: https://streamlinehq.com
                      </desc>
                      <path
                        fill="#e17726"
                        d="M23.205225 0.9874275 13.121575 8.448625l1.87515 -4.397125 8.2085 -3.0640725Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#e27625"
                        d="M0.818115 0.996155 9.00465 4.052l1.780525 4.454775L0.818115 0.996155Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#e27625"
                        d="m19.147225 16.855225 4.4568 0.084825 -1.5576 5.291375 -5.438275 -1.49735 2.539075 -3.87885Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#e27625"
                        d="m4.852525 16.855225 2.529675 3.878875 -5.429175 1.497425 -1.5481175 -5.291475 4.4476175 -0.084825Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#e27625"
                        d="m10.543275 7.372 0.1822 5.882675 -5.450075 -0.247975 1.550225 -2.33875 0.019625 -0.02255L10.543275 7.372Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#e27625"
                        d="m13.4003 7.30645 3.75445 3.33925 0.019425 0.022375 1.550275 2.33875 -5.448825 0.247925 0.124675 -5.9483Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#e27625"
                        d="m7.541775 16.87225 2.9759 2.318675 -3.456875 1.669025 0.480975 -3.9877Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#e27625"
                        d="m16.458725 16.871875 0.471 3.988075 -3.447175 -1.669175 2.976175 -2.3189Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#d5bfb2"
                        d="m13.558475 18.9724 3.4981 1.69385 -3.253925 1.546475 0.033775 -1.022125 -0.27795 -2.2182Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#d5bfb2"
                        d="m10.44055 18.97315 -0.26705 2.2007 0.0219 1.037625 -3.26155 -1.54525 3.5067 -1.693075Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#233447"
                        d="m9.430425 14.02245 0.914125 1.921125 -3.11225 -0.911675 2.198125 -1.00945Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#233447"
                        d="m14.56965 14.02265 2.20845 1.009175 -3.12235 0.91145 0.9139 -1.920625Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#cc6228"
                        d="m7.779875 16.852725 -0.5031 4.1345 -2.696325 -4.044125 3.199425 -0.090375Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#cc6228"
                        d="m16.22045 16.852775 3.199525 0.0904L16.7135 20.9874l-0.49305 -4.134625Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#cc6228"
                        d="m18.803175 12.773 -2.328475 2.37305 -1.795225 -0.820375 -0.85955 1.8069 -0.56345 -3.1072 5.5467 -0.252375Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#cc6228"
                        d="m5.19555 12.77295 5.547675 0.2524 -0.563475 3.107225 -0.8597 -1.8067 -1.785775 0.8202 -2.338725 -2.373125Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#e27525"
                        d="m5.038825 12.286075 2.6344 2.6732 0.0913 2.63905 -2.7257 -5.31225Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#e27525"
                        d="M18.963975 12.28125 16.2334 17.603l0.1028 -2.643775L18.963975 12.28125Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#e27525"
                        d="m10.6146 12.448725 0.106025 0.667375 0.262 1.6625 -0.168425 5.10625 -0.79635 -4.1019 -0.000275 -0.0424 0.597025 -3.291825Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#e27525"
                        d="m13.384 12.439575 0.5986 3.301025 -0.00025 0.0424 -0.79835 4.11215 -0.0316 -1.028525 -0.124575 -4.1182 0.356175 -2.30885Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#f5841f"
                        d="m16.5705 14.8529 -0.08915 2.2929 -2.77905 2.16525 -0.5618 -0.39695 0.62975 -3.243675 2.80025 -0.817525Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#f5841f"
                        d="m7.439075 14.852975 2.790625 0.817525 0.629725 3.243625 -0.561825 0.396925 -2.7792 -2.165425 -0.079325 -2.29265Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#c0ac9d"
                        d="m6.4021 20.15985 3.555475 1.68465 -0.01505 -0.719375L10.24 20.864h3.51895l0.30825 0.26025 -0.0227 0.718875 3.532925 -1.679025 -1.719125 1.420625L13.7795 23.0125H10.211525l-2.07745 -1.433625 -1.731975 -1.419025Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#161616"
                        d="m13.303775 18.748225 0.5027 0.3551 0.2946 2.35045 -0.426325 -0.36H10.326425l-0.418225 0.36725 0.284925 -2.357525 0.502875 -0.355275h2.607775Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#763e1a"
                        d="m22.539625 1.19397 1.2104 3.631255 -0.7559 3.67155 0.538275 0.41525 -0.728375 0.555725 0.547375 0.42275 -0.72485 0.660175 0.445025 0.322275 -1.181025 1.379325 -4.844125 -1.4104 -0.041975 -0.0225 -3.490775 -2.9447L22.539625 1.19397Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#763e1a"
                        d="M1.460435 1.19397 10.4864 7.874675l-3.49075 2.9447 -0.042 0.0225 -4.844145 1.4104 -1.181015 -1.379325 0.44467 -0.322025 -0.72453 -0.6604 0.5463775 -0.422325 -0.73926 -0.5573 0.55858 -0.4155L0.25 4.82535 1.460435 1.19397Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#f5841f"
                        d="m16.809475 10.533375 5.132675 1.49435 1.667525 5.1393 -4.39925 0 -3.031225 0.03825 2.204425 -4.296825 -1.57415 -2.375075Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#f5841f"
                        d="m7.19055 10.533375 -1.574425 2.375075 2.204725 4.296825 -3.029725 -0.03825H0.3996575l1.65816 -5.13925 5.1327325 -1.4944Z"
                        stroke-width="0.25"
                      ></path>
                      <path
                        fill="#f5841f"
                        d="m15.248075 4.026975 -1.43565 3.8774 -0.30465 5.238 -0.116575 1.64175 -0.00925 4.193975H10.617825l-0.008975 -4.1861 -0.11695 -1.651075 -0.3048 -5.23655 -1.4354 -3.8774h6.496375Z"
                        stroke-width="0.25"
                      ></path>
                    </svg>
                  </span>

                  <div className="text-center text-gray-400 text-xs font-semibold my-3">
                    Or
                  </div>

                  <div className="flex flex-col gap-3">
                    <span
                      onClick={() =>
                        toast.info(
                          "Trust wallet support coming soon! Continue with Metamask for now",
                        )
                      }
                      className="w-full font-semibold text-gray-700 flex justify-between items-center bg-white border border-gray-200 hover:bg-gray-100 py-3.5 px-5 rounded-xl cursor-pointer transition-colors"
                    >
                      Continue with Trust Wallet
                      <img
                        className="w-[22px] h-[22px]"
                        src={ticon}
                        alt="Trust Wallet"
                      />
                    </span>
                    <span
                      onClick={() =>
                        toast.info(
                          "Coinbase wallet support coming soon! Continue with Metamask for now",
                        )
                      }
                      className="w-full font-semibold text-gray-700 flex justify-between items-center bg-white border border-gray-200 hover:bg-gray-100 py-3.5 px-5 rounded-xl cursor-pointer transition-colors"
                    >
                      Continue with Coinbase Wallet
                      <img
                        className="w-[22px] h-[22px]"
                        src={cbicon}
                        alt="Coinbase Wallet"
                      />
                    </span>
                  </div>
                </div>

                <div className="text-center text-xs text-gray-500 mt-4">
                  AuthenX will never store your{" "}
                  <span className="underline text-indigo-600 cursor-pointer">
                    private keys
                  </span>
                  . You stay in control of your wallet.
                </div>
                {connecting && <ConnectingWallet />}
              </div>
            )}
          </div>
        </motion.div>
      </div>
      <div className="mt-2 lg:hidden">
        {/* Organization Notice */}
        <div className="rounded-2xl border border-gray-200 bg-[#f8faff] mx-4 xs:mx-6 md:mx-25 px-4 py-3 text-center">
          <div className="flex justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50">
              <Building2 size={16} className="text-indigo-600" />
            </div>
          </div>

          <h3 className="mt-2 text-sm w-full font-bold text-gray-900">
            Are you an Organization?
          </h3>
          <p className="mt-1 text-xs text-center font-medium leading-5 text-gray-500">
            Issuing documents requires an Ethereum wallet.
            Please use our{" "}
            <span className="font-semibold text-gray-700">
              Desktop Web version
            </span>{" "}
            to sign up
            and connect your wallet.
          </p>
        </div>

        {/* Login */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <span>Already have an account? </span>

          <Link
            to="/signin"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Log in
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-3 border-t border-gray-200 pt-2 pb-2 text-center">
          <p className="text-[8px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
            © 2026 AuthenX Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
