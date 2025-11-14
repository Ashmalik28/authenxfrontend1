

const FeatureCard = ({svg , headline ,  text , stats , stattext , width , bgcolor}) => {
    return <div className={`${width} 2xl:h-96  lg:h-80 flex flex-col hover:scale-110 justify-between 2xl:p-6 p-4 transition-all duration-300 ease-in-out ${bgcolor} rounded-2xl`}>
        <div>
        <span>{svg}</span>
        <span className="flex flex-col mt-3">
            <span className="text-lg 2xl:text-3xl lg:text-xl xl:text-2xl font-bold">
                {headline}
            </span>
            <span className="text-sm 2xl:text-lg lg:text-base mt-2">
                {text}
            </span>
        </span>
        </div>
         <div className="lg:mt-8 mt-5 flex justify-between items-center" >
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 lg:size-12 2xl:size-14">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clip-rule="evenodd" />
                </svg>
            </span>
            <span className="flex flex-col items-end">
                <span className="text-xl lg:text-3xl 2xl:text-4xl font-extrabold">
                {stats}
                </span>
                <span className="2xl:text-lg">
                {stattext}
                </span>
            </span>
        </div>
    </div>
}

const TabletViewUpperCard = [
    {svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9">
     <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
     <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clip-rule="evenodd" />
    </svg> , headline : "Secure Document Issuance" ,  text : "Issue tamper-proof digital documents secured through advanced blockchain technology." , stats : "12,000+" , stattext : "Documents Secured" , width : "w-[50%] lg:w-80 hidden sm:flex lg:hidden mt-8" , bgcolor : "bg-[#d8fcfe]"
    }
]

const FeatureCardUpperData = [
    {svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9">
     <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
     <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clip-rule="evenodd" />
    </svg> , headline : "Secure Document Issuance" ,  text : "Issue tamper-proof digital documents secured through advanced blockchain technology." , stats : "12,000+" , stattext : "Documents Secured" , width : "xs:w-[85%] lg:w-72 2xl:w-96 xl:w-80 sm:hidden lg:flex" , bgcolor : "bg-[#d8fcfe]"
    },
    {svg : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9">
     <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
    </svg> , headline : "Trusted Organizations Only" ,  text : "Partner with verified organizations ensuring compliance, reliability, and trust." , stats : "850+" , stattext : "Verified Partners" , width : "xs:w-[85%] 2xl:w-96 lg:w-72 xl:w-80" , bgcolor : "bg-[#fef2d4]"
    },
    {svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9">
    <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
    </svg> , headline : "Seamless Global Accessibility" ,  text : "Access and verify documents anytime, anywhere with decentralized storage." , stats : "30+" , stattext : "Countries Covered" , width : "xs:w-[85%] 2xl:w-96 lg:w-72 xl:w-80" , bgcolor : "bg-[#dafed8]"
    }
]
const FeatureCardLowerData = [
    {svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9">
     <path fill-rule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clip-rule="evenodd" />
    </svg>, headline : "Fraud Prevention" ,  text : "Ensure fraud prevention by eliminating forgery, duplication, and manipulation through blockchain verification, offering real-time validation, transparency, security, and credibility for organizations, institutions, and individuals globally." , stats : "99.9%" , stattext : "Fraud Prevented" , width : "xs:w-[90%] lg:w-[446px] 2xl:w-148 xl:w-124" , bgcolor : "bg-[#ffe4e3]"
    },
    {svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-9">
    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z" clip-rule="evenodd" />
    </svg> , headline : "User-Friendly Platform" ,  text : "Experience a user-friendly platform with seamless onboarding and effortless use, simplifying blockchain adoption, empowering organizations and individuals to verify documents securely without technical barriers." , stats : "95%" , stattext : "Positive User" , width : "xs:w-[90%] lg:w-[446px] 2xl:w-148 xl:w-124" , bgcolor: "bg-[#e2dfff]"
    },
]
const Features = () => {
    return (
        <span className="max-w-screen flex flex-col items-center">
            <div className="flex w-full flex-col items-center mt-8">
                <span className="xs:text-4xl 2xl:text-5xl text-2xl mb-1" >
                    🚀
                </span>
                <span className="flex gap-3">
                    <span className="text-2xl 2xl:text-5xl xs:text-3xl lg:text-4xl ">Powering</span><span className="lg:text-4xl xs:text-3xl 2xl:text-5xl text-2xl font-bold">Trusted</span>
                </span>
                <span className="flex gap-3">
                  <span className="lg:text-4xl 2xl:text-5xl xs:text-3xl text-2xl font-bold">Document</span><span className="lg:text-4xl text-2xl 2xl:text-5xl xs:text-3xl">Verification</span>  
                </span>
                <span className="xl:w-3/7 lg:w-4/6 2xl:text-xl sm:w-4/5 px-3 lg:px-0 flex text-center mt-3 text-sm lg:text-base">
                    With AuthenX's blockchain-powered features, institutions, organizations, and individuais can securely issue, verify, and acces documents anywhere, anytime —with complete trust and transparency.
                </span>
            </div>
            <div className="flex w-full items-center flex-col mb-10">
                <div className="flex items-center w-[100%] lg:justify-center flex-col gap-8 ">
                {TabletViewUpperCard.map((data , index) => (
                <FeatureCard
                key={data.headline + index}
                svg={data.svg}
                headline={data.headline}
                text={data.text}
                stats={data.stats}
                stattext={data.stattext}
                width={data.width}
                bgcolor={data.bgcolor} />  
                ))}
            </div>
                <div className="flex items-center w-[90%] lg:justify-center sm:flex-row flex-col mt-10 gap-8 ">
                {FeatureCardUpperData.map((data , index) => (
                <FeatureCard
                key={data.headline + index}
                svg={data.svg}
                headline={data.headline}
                text={data.text}
                stats={data.stats}
                stattext={data.stattext}
                width={data.width}
                bgcolor={data.bgcolor} />  
                ))}
            </div>
            <div className="flex items-center w-[95%] lg:justify-center lg:flex-row flex-col gap-8 mt-8">
                {FeatureCardLowerData.map((data , index) => (
                <FeatureCard
                key={data.headline + index}
                svg={data.svg}
                headline={data.headline}
                text={data.text}
                stats={data.stats}
                stattext={data.stattext}
                width={data.width}
                bgcolor={data.bgcolor} />  
                ))}
            </div>

            </div>
        </span>
    )
};

export default Features;