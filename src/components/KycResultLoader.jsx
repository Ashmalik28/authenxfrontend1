import React from 'react'
import Loader from '../components/loading.json';
import Lottie from 'lottie-react';

export default function KycResultLoader() {
  return (
    <div className="flex flex-col items-center md:p-3 lg:p-4 2xl:p-7">
      <div className='w-24 h-24'>
      <Lottie animationData={Loader} loop={true} />
      </div>
      <p className="text-black font-semibold md:text-sm text-xs lg:text-lg">
        Verifying document...
      </p>
      <p className="text-gray-500 text-[9px] md:text-xs lg:text-sm mt-1 max-w-sm">
        Checking your document against the Ethereum blockchain. This usually
        takes a few seconds.
      </p>
    </div>
  )
}