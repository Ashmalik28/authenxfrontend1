
import { IoShieldCheckmark } from "react-icons/io5";
import { GoOrganization } from "react-icons/go";

const StatsCard = ({svg , metrics , headline , subheadline , classprops }) => {
    return <span className={`md:p-7 p-3 place-content-center xs:p-5 w-32 2xl:w-72 2xl:h-64 xs:w-40 sm:w-48 flex lg:w-56 xl:w-64 flex-col rounded-2xl outline-1 outline-gray-200 hover:scale-105 transition-all duration-300 ease-in-out items-center bg-white`}>
     <span className={`${classprops}`}>
        {svg}
    </span>   
     <div className="mt-2 xs:text-xl lg:text-3xl 2xl:text-4xl font-bold xs:font-medium">{metrics}</div>
     <div className="lg:text-base 2xl:text-xl text-sm">{headline}</div>
     <div className="lg:text-base 2xl:text-xl text-sm">{subheadline}</div>
    </span>
}
const statsData = [
    {svg : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" size-6 xs:size-8 lg:size-12 2xl:size-16">
    <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd" />
    <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
    </svg> , metrics : "1K+" , headline : "Certificates" , subheadline : "Generated" , classprops : "text-blue-500"
    },
    {svg : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 xs:size-8 lg:size-12 2xl:size-16">
    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
    </svg> , metrics : "500+" , headline : "Verified" , subheadline : "Users" , classprops: "text-lime-600"
    },
    {svg : <div className="w-6 h-6 xs:w-8 xs:h-8 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16 text-purple-600"><IoShieldCheckmark className="w-full h-full" /></div> , metrics : "99.9%" , headline : "System" , subheadline : "Reliability" , classprops : "text-purple-600"},
    {svg: <div className="w-6 h-6 xs:w-8 xs:h-8 lg:w-12 lg:h-12 2xl:h-16 2xl:w-16 text-amber-500"><GoOrganization className="w-full h-full" /></div> , metrics : "50+" , headline : "Organizations" , subheadline : "Onboarded" , classprops : "text-amber-500" }
];
const Stats = () => {
    return (
        <div className="max-w-full flex flex-col justify-center items-center rounded-2xl bg-gray-100 lg:mt-20 2xl:h-full lg:h-72">
            <div className="flex flex-col w-full items-center ">
            <div className="flex justify-center items-center lg:mt-0 2xl:mt-2 mt-4 2xl:text-3xl  sm:text-2xl xs:text-lg gap-1 font-semibold">
                Trusted by Professionals Worldwide
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
            </div>
            <div className="grid grid-cols-2 lg:flex lg:flex-row items-center pr-4 pl-4 lg:pl-20 lg:pr-20 mt-5 gap-4 mb-4 lg:gap-5">
            {statsData.map((stats , index) => (
            <StatsCard
            key={stats.metrics + index}
            svg={stats.svg}
            metrics={stats.metrics}
            headline={stats.headline}
            subheadline={stats.subheadline}
            classprops={stats.classprops} />  
            ))}
            </div>
            </div>
        </div>
    )
}

export default Stats;