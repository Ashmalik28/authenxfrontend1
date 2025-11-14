import { useState } from "react";
import Faqimage from "../../images/FAQ/FAQ.png"

const FAQitem = ({question , answer }) => {
    const [open , setOpen] = useState(false)
    return (
     <div role="button" onClick={() => setOpen(!open)} className="mt-4 flex w-90% w-[92%] bg-gray-100 py-3 bg-opacity-100 px-4  rounded-2xl flex-col items-between justify-center">
        <div className="flex justify-between items-center">
            <div className="text-sm lg:text-base font-semibold">{question}</div>
            <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className={`transform transition-transform duration-200 ease-in-out  size-4 font-semibold ${open ? "rotate-180" : ""}`}>
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            </div>
        </div>
        <div className={`bg-gray-100 relative z-10 bg-opacity-100 transition-all duration-500 ease-in-out ${open ? "py-2" : "py-0"} `}  >{open && (
            <div className="text-xs lg:text-base">{answer}</div>
        )}</div>
     </div>
    )

}
export const faqs = [
  {
    question: "What is AuthenX?",
    answer: (
      <>
        AuthenX is a blockchain-powered verification platform designed to provide{" "}
        <strong>secure, transparent, and tamper-proof</strong> document authentication.  
        Instead of relying on centralized authorities, AuthenX uses blockchain records  
        to validate documents instantly, ensuring trust and reliability.
      </>
    ),
  },
  {
    question: "How does AuthenX verify documents?",
    answer: (
      <>
        When you upload a document, AuthenX does not store the file.  
        Instead, it generates a unique <strong>cryptographic hash</strong> of your document  
        and compares it against existing records on the blockchain.  
        If the hash matches, the document is verified as authentic;  
        if not, you are immediately alerted.
      </>
    ),
  },
  {
    question: "Why is blockchain used for verification?",
    answer: (
      <>
        Blockchain is <strong>immutable</strong>—once data is stored, it cannot be changed.  
        This makes it ideal for authentication since no one can alter or forge verification records.  
        AuthenX leverages this immutability to guarantee that your document’s authenticity  
        is permanent and tamper-proof.
      </>
    ),
  },
  {
    question: "What types of documents can I verify?",
    answer: (
      <>
        AuthenX supports a wide range of documents, including:
        <ul className="list-disc pl-5 mt-2">
          <li>Academic certificates</li>
          <li>Government-issued IDs</li>
          <li>Business contracts</li>
          <li>Property and financial records</li>
          <li>Medical reports</li>
          <li>Employment documents</li>
        </ul>
        <p className="mt-2">
          If your document can be digitally represented, AuthenX can verify it.
        </p>
      </>
    ),
  },
  {
    question: "Is my data safe with AuthenX?",
    answer: (
      <>
        Yes, absolutely. Your documents are <strong>never uploaded or stored</strong> on our servers.  
        Only the hash (a mathematical fingerprint) of your file is processed and compared  
        with the blockchain. This ensures complete privacy and security of your sensitive information.
      </>
    ),
  },
  {
    question: "How fast is the verification process?",
    answer: (
      <>
        Verification with AuthenX is <strong>instant</strong>.  
        The entire process, from uploading your file to receiving a confirmation,  
        typically takes just a few seconds, depending on network speed  
        and blockchain confirmation times.
      </>
    ),
  },
  {
    question: "Who can use AuthenX?",
    answer: (
      <>
        AuthenX is designed for individuals, businesses, and institutions:
        <ul className="list-disc pl-5 mt-2">
          <li>Students can verify academic records</li>
          <li>Employers can validate resumes and certificates</li>
          <li>Businesses can confirm contracts and compliance documents</li>
          <li>Governments and organizations can ensure transparency in public records</li>
        </ul>
      </>
    ),
  },
  {
    question: "Can AuthenX detect fake or altered documents?",
    answer: (
      <>
        Yes. Even the <strong>smallest modification</strong> to a document completely changes its cryptographic hash.  
        This means that if someone alters your file, AuthenX will immediately detect the change  
        and flag the document as inauthentic.
      </>
    ),
  },
  {
    question: "How much does AuthenX cost to use?",
    answer: (
      <>
        AuthenX offers different pricing tiers:
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Free tier:</strong> Basic verification for individual users</li>
          <li><strong>Business plans:</strong> Advanced features, bulk verification, and integrations</li>
          <li><strong>Enterprise solutions:</strong> Tailored for universities, corporations, and government bodies</li>
        </ul>
      </>
    ),
  },
  {
    question: "Can I integrate AuthenX with my existing systems?",
    answer: (
      <>
        Yes. AuthenX provides <strong>API integrations</strong> that allow businesses and institutions  
        to connect the verification system directly with their own platforms, HR systems,  
        or academic portals. This makes large-scale verification seamless and automated.
      </>
    ),
  },
  {
    question: "What makes AuthenX different from traditional verification methods?",
    answer: (
      <>
        Unlike traditional verification methods that depend on manual checks, third-party agencies,  
        or physical stamps, AuthenX:
        <ul className="list-disc pl-5 mt-2">
          <li>Works instantly</li>
          <li>Is tamper-proof</li>
          <li>Removes the need for intermediaries</li>
          <li>Provides a transparent and permanent record</li>
        </ul>
        <p className="mt-2">
          This ensures faster, more reliable, and cost-effective verification.
        </p>
      </>
    ),
  },
];

const FAQ = () => {
    return (
        <div className="max-w-screen min-h-full flex justify-center bg-black pt-2 mt-10">
            <div className="max-w-full 2xl:w-[1800px] 2xl:ml-3 flex lg:flex-row flex-col bg-gray-100 h-full mt-10 rounded-xl">
            <div className="w-full lg:w-1/2 items-center lg:items-start pt-15 lg:pl-15 flex flex-col gap-2">
            <span className="bg-blue-500 w-15 text-white flex justify-center pt-1 pb-1 rounded-2xl mb-3">FAQ</span>
            <span className="lg:text-5xl text-2xl xs:text-3xl sm:text-4xl font-semibold">What would you like to</span>
            <span className="lg:text-5xl text-2xl xs:text-3xl sm:text-4xl font-semibold mb-3">know about AuthenX ?</span>
            <span className="border-1 border-gray-300 w-32 flex justify-center px-3 py-2 rounded-2xl gap-1">
                <span className="flex justify-center items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
                </span>
                Talk to us
            </span>
            <div className="flex lg:justify-start justify-center items-center">
            <img src={Faqimage} alt="FAQ" className="lg:w-4/5 w-64"/>
            </div>
            </div>
            <div className="w-full min-h-full lg:w-1/2 bg-blue-500 pb-8 rounded-xl">
            <div className="xs:mt-10 mt-5 h-full min-w-full flex flex-col items-center">
                {faqs.map((item , index) => (
                <FAQitem
                key={index} 
                question={item.question}
                answer={item.answer} />
            ))}
            </div>
            </div>

        </div>
    </div>
    )
}
export default FAQ;