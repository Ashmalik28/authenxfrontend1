
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import Button from "./Button";
import emailjs from '@emailjs/browser';

const countries = [
  { code: "sg", dialCode: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "in", dialCode: "+91", flag: "🇮🇳", name: "India" },
  { code: "us", dialCode: "+1", flag: "🇺🇸", name: "United States" },
  { code: "gb", dialCode: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "au", dialCode: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "ca", dialCode: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "de", dialCode: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "fr", dialCode: "+33", flag: "🇫🇷", name: "France" },
  { code: "cn", dialCode: "+86", flag: "🇨🇳", name: "China" },
  { code: "jp", dialCode: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "ae", dialCode: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "sa", dialCode: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "za", dialCode: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "br", dialCode: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "ru", dialCode: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "id", dialCode: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "my", dialCode: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "th", dialCode: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "vn", dialCode: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "ph", dialCode: "+63", flag: "🇵🇭", name: "Philippines" }
];
const interests = [
  { id: 1, label: "Partnership" },
  { id: 2, label: "Collaboration" },
  { id: 3, label: "Career Opportunities" },
  { id: 4, label: "Press & Media" },
  { id: 5, label: "Support" },
  { id: 6, label: "Product Demo" },
  { id: 7, label: "Investment" },
  { id: 8, label: "General Inquiry" }
];

const Support = () => {
      const [selectedCountry, setSelectedCountry] = useState(countries[1]);
      const [isOpen, setIsOpen] = useState(false);
      const [interestOpen , setInterestOpen] = useState(false);
      const [phone, setPhone] = useState("");
      const [selectedInterest, setSelectedInterest] = useState({
    id: null,
    label: "Select your interest"
  });
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    });
   const [isLoading, setIsLoading] = useState(false);

   const handleSendMessage = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !phone || !formData.message) {
    alert("Please fill out all required fields.");
    return;
    }

    setIsLoading(true);

    const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: `${selectedCountry.dialCode}${phone}`,
        country: selectedCountry.name,
        interest: selectedInterest.label,
        message: formData.message,
    };
    emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID_SUPPORT, 
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((response) => {
      console.log("Message sent to support:", response.status);

      return emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_AUTOREPLY, 
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
    })
    .then(() => {
      alert("Your message has been sent! We’ve also sent you a confirmation email.");
      setFormData({ name: "", email: "", message: "" });
      setPhone("");
      setSelectedInterest({ id: null, label: "Select your interest" });
    })
    .catch((error) => {
      console.error("FAILED...", error);
      alert("Something went wrong. Please try again.");
    })
    .finally(() => setIsLoading(false));
   };

    return (
        <div className="flex flex-col max-w-screen items-center justify-center ">
            <div className="flex flex-col items-center justify-center">
            <span className="text-3xl xs:text-4xl lg:text-6xl font-semibold mt-10">Get in Touch with Us</span>
            <span className="lg:w-1/2 sm:w-3/4 text-center mt-3 text-xs xs:text-sm lg:px-0 px-3 lg:text-lg font-medium">Have questions , feedback or need support? We're here to help! Reach out to us for inquiries, technical assistance, or partnership opportunities. Our team will respond as soon as possible.</span>
            </div>
            <div className="xs:mt-13 mt-8 mb-6 flex md:flex-row flex-col gap-6">
                <div className="flex gap-0 outline-1 outline-gray-400 rounded-xl p-3 "> 
                <input value={formData.name} onChange={(e) => setFormData({...formData , name : e.target.value}) } className="w-64 xs:w-70 outline-none mt-0" type="text" placeholder="Your Name" />
                <span className="flex w-3 justify-end text-gray-400">*</span>
                </div>
                <div className="flex gap-0 outline-1 outline-gray-400 rounded-xl p-3 "> 
                <input value={formData.email} onChange={(e) => setFormData({...formData , email : e.target.value})} className="w-64 xs:w-70 outline-none mt-0" type="text" placeholder="Email Address" />
                <span className="flex w-3 justify-end text-gray-400">*</span>
                </div>
            </div>
            <div className="mb-8 h-full flex md:flex-row items-center flex-col gap-6">
            <div className="flex gap-0 outline-1 xs:w-79 w-[92%] outline-gray-400 rounded-xl relative "> 
                <div className="w-22 flex items-center justify-center text-3xl gap-1 rounded-l-xl outline-1 outline-gray-400 h-100%"
                onClick={() => setIsOpen(!isOpen)}>
                   <span>{selectedCountry.flag}</span>
                   <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                         <path fill-rule="evenodd" d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                         </svg>
                   </span>
                </div>
                <div className="w-57 h-full flex">
                    <div className="w-13 h-100% flex items-center justify-end text-xl">
                        <span>{selectedCountry.dialCode}</span>
                    </div>
                    <input type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder=" 99999-99999"
                    className="flex px-1 py-3 w-41 text-xl outline-none"
                    />
                    <span className="flex justify-end items-center pr-3 text-gray-400 ">*</span>
                </div>
            {isOpen && (
               <div className="absolute flex flex-col top-15 max-h-48 left-0 w-79 p-1 z-10 bg-white border overflow-y-scroll rounded-xl shadow-md">
               {countries.map((c) => (
               <div
                key={c.code}
                className="flex items-center rounded-xl gap-2 px-3 py-0.5 m-1 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                setSelectedCountry(c);
                setIsOpen(false);
              }}
              >
              <span className="text-3xl">{c.flag}</span>
              <span className="text-xl">{c.name}</span>
              <span className=" text-xl text-gray-500">{c.dialCode}</span>
            </div>
          ))}
        </div>
      )}
            </div>
             <div className="flex gap-0 outline-1 xs:w-79 w-[92%] outline-gray-400 rounded-xl relative">
            <div
                className="w-full flex items-center justify-between text-xl px-3 py-3 cursor-pointer rounded-xl outline-1 outline-gray-400"
                onClick={() => setInterestOpen(!interestOpen)}
            >
                <span className="">{selectedInterest.label}</span>
                <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                >
                    <path
                    fillRule="evenodd"
                    d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                    />
                </svg>
                
                </span>
            </div>
            {interestOpen && (
                <div className="absolute flex flex-col top-15 max-h-48 left-0 w-79 p-1 bg-white border overflow-y-scroll rounded-xl shadow-md">
                {interests.map((interest) => (
                    <div
                    key={interest.id}
                    className="flex items-center rounded-xl gap-2 px-3 py-2 m-1 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                        setSelectedInterest(interest);
                        setInterestOpen(false);
                    }}
                    >
                    <span className="text-lg">{interest.label}</span>
                    </div>
                ))}
                </div>
            )}
            </div>
            
            </div>
            <div className="outline-1 w-[90%] sm:w-3/5 outline-gray-400 lg:w-164 rounded-xl mb-8 xs:h-24 h-32 sm:h-32 lg:h-40 p-3">
                <textarea value={formData.message} onChange={(e) => setFormData({...formData , message : e.target.value})} className=" w-full h-full outline-none placeholder:top-1" type="text" placeholder="Type in your message" />
            </div>
            <Button onClick={handleSendMessage} variant="primary" size="md" className="before:bg-white pl-12 pr-12 rounded-full  outline-blue-400 flex gap-2 items-center">
                {isLoading ? "Sending..." : "Send your message"}
            </Button>
            <span className="mt-6 text-xs text-black font-medium lg:w-1/5 text-center justify-center">
                By clicking, you agree to our <span className="underline">Terms & Conditions</span> ,
                    <span className="underline">Privacy and Data Protection Policy</span>
            </span>
    </div>
    )
}

export default Support;