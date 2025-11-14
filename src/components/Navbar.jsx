import logo from "../../images/AuthenXLogo.png"
import Button from "./Button"
import { RiAdminFill } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { toast } from "react-toastify";


const NavbarItem = ({title , classprops , onClick}) => {
    return (
        <li onClick={onClick} className={`mx-4 cursor-pointer hover ${classprops}`}>
            {title}
        </li>
    )
}
const SidebarItem = ({title , classprops , onClick , icon}) => {
  return (
    <li onClick={onClick} className={` cursor-pointer hover flex justify-between items-center list-none w-full border-black text-black font-bold p-2 rounded-xl ${classprops}`}>
            <div className="flex gap-3 items-center">
            {icon}
            {title}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
        </li>
  )
}
const DropdownItem = ({title , subtitle , classprops , icon , onClick}) => {
    return (
        <li onClick={onClick} className={`px-2 py-2 m-3 cursor-pointer group/item hover:bg-gray-100 flex items-center gap-4 rounded-xl transition-colors duration-200 ${classprops}`}>
          <span className="bg-gray-100 group-hover/item:text-blue-500 group-hover/item:bg-white transition duration-200 ease-in-out p-5 rounded-lg">
            {icon}
          </span> 
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-medium group-hover/item:text-blue-500">{title}</span>
            <span className="text-sm text-[#566072]">{subtitle}</span> 
          </div> 
        </li>
    )
}

const services = [
  { title: "Register as Admin", subtitle: "Manage platform access & oversee document workflows" ,icon: <RiAdminFill size={20} />  },
  { title: "Register as Organization" , subtitle: "Get verified to issue trusted blockchain documents" , icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
  </svg>
 },
  { title: "Issue Document", subtitle: "Create and publish tamper-proof certificates" , icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
  <path fill-rule="evenodd" d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
 </svg>
},
  { title: "Help & Support", subtitle: "Get assistance with registration, issuing, or verification" , icon: <MdSupportAgent size={20} />},
];


const Navbar = () => {
    const [scrolled , setScrolled] = useState(false);
    const navigate = useNavigate();
    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(()=> {
      const handleScroll = () => {
        if(window.scrollY > 10){
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }

      window.addEventListener("scroll" , handleScroll);
      return () => window.removeEventListener("scroll" , handleScroll);
    }, []);
    return (
  <nav className="min-w-screen flex justify-center fixed z-50">
    <div className={`flex w-screen 2xl:max-w-[1800px] justify-between transition-colors duration-300 ease-in-out items-center mt-2 ${scrolled ? "card" : "bg-transparent border border-transparent"} pt-2 pb-2 rounded-2xl`}>
      
      <div className="flex-initial pl-5 lg:pl-8 xl:pl-20 justify-center items-center">
        <img src={logo} alt="AuthenXLogo" className=" w-32 lg:w-40 cursor-pointer" />
      </div>

      <ul className="hidden lg:flex text-[#343434] list-none flex-row justify-between items-center flex-initial font-medium text-base">
        <NavbarItem onClick={() => navigate("/home")} title="Home" classprops="hover:text-blue-500" />

        <li className="mx-4 relative group cursor-pointer hover:text-blue-500">
          <button className="flex items-center justify-center gap-1.5 ">Services
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 transition-transform duration-300 group-hover:rotate-180">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <ul className="absolute left-0 mt-2 top-full w-125 text-black scale-95 group-hover:scale-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out bg-white shadow-lg z-50 opacity-0 invisible group-hover:visible group-hover:opacity-100 flex-col border border-gray-300 rounded-2xl">
            {services.map((service, index) => {
            const handleClick = () => {
              if (service.title === "Register as Admin") {
                toast.info("Coming soon 🚧");
              }

              if (service.title === "Register as Organization") {
                navigate("/orgkyc");
              }

              if (service.title === "Issue Document") {
                navigate("/issue");
              }

              if (service.title === "Help & Support") {
                const section = document.getElementById("support");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                } else {
                  toast.error("Support section not found!");
                }
              }
            };

            return (
              <DropdownItem
                key={service.title + index}
                title={service.title}
                icon={service.icon}
                subtitle={service.subtitle}
                onClick={handleClick}
              />
            );
          })}
          </ul>
        </li>

        <NavbarItem onClick={() => navigate("/Verify")} title="Verify" classprops="hover:text-blue-500" />
        <NavbarItem onClick={() => navigate("/Dashboard")} title="Dashboard" classprops="hover:text-blue-500" />
        <NavbarItem onClick={() => navigate("/About")} title="About" classprops="hover:text-blue-500" />
      </ul>

      <div className="hidden lg:flex pr-5 lg:pr-8 xl:pr-20 gap-3">
        <Button onClick={() => navigate("/signup")} variant="primary" size="md" className="before:bg-white rounded-lg outline-blue-400 flex gap-2 items-center">
          Signup
        </Button>
        <Button onClick={() => navigate("/signin")} variant="secondary" size="md" className="before:bg-blue-500 rounded-lg outline-blue-400 flex gap-2 items-center">
          Login
        </Button>
      </div>

      <div className="lg:hidden flex text-black items-center pr-5 relative">
        {!toggleMenu ? (
          <HiMenuAlt4 fontSize={28} className="cursor-pointer" onClick={() => setToggleMenu(true)} />
        ) : (
          <AiOutlineClose fontSize={28} className="cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
      </div>

    </div>

    {toggleMenu && (
      <div className="absolute top-0 right-0 w-[75vw] h-screen bg-white shadow-2xl z-50 px-4 py-10 flex flex-col gap-4 animate-slide-in">
        
        <button onClick={() => setToggleMenu(false)} className="self-end">
          <AiOutlineClose fontSize={26} />
        </button>

        <SidebarItem icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
         <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
         <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
         </svg>
         } onClick={() => {navigate("/home"); setToggleMenu(false)}} classprops={"mt-3"} title="Home" />
        <SidebarItem icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
        </svg>
        } onClick={() => {navigate("/Verify"); setToggleMenu(false)}} title="Verify" />
        <SidebarItem icon={<MdDashboard size={20} />} onClick={() => {navigate("/Dashboard"); setToggleMenu(false)}} title="Dashboard" />
        <SidebarItem icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
        </svg>
        } onClick={() => {navigate("/About"); setToggleMenu(false)}} title="About" />

        <Button onClick={() => {navigate("/signup"); setToggleMenu(false)}} variant="primary" className="rounded-2xl p-2 mt-2">
          Login / Signup
        </Button>
      </div>
    )}
  </nav>
 );

}

export default Navbar;