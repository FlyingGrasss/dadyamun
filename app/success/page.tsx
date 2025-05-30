import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Application Successful",
  description: "Thank you for applying as a delegate to DADYAMUN'25. Your application has been successfully received.",
  keywords: [
    "DADYAMUN'25",
    "Apply",
    "Application Successful",
    "Registration",
    "MUN conference",
    "Model United Nations",
    "Bodrum MUN"
  ],
  openGraph: {
    title: "Application Successful",
    description: "Thank you for applying as a delegate to DADYAMUN'25. Your application has been successfully received.",
    url: "https://www.dadyamun.org/apply/delegate",
  },
  twitter: {
    title: "Application Successful",
    description: "Thank you for applying as a delegate to DADYAMUN'25. Your application has been successfully received.",
    card: "summary_large_image",
  },
};



const Success = () => {
  return (
    <>
      <div className="flex justify-center max-sm:items-center max-sm:my-22">
        <div className="w-fit rounded-4xl h-fit py-12 p-16 mt-14 mb-14 max-sm:py-3 max-sm:p-4 max-sm:rounded-2xl max-sm:mx-8 max-sm:mt-8 max-sm:mb-8 bg-white text-center">
          {/* You could add a checkmark or success icon here */}
          <div className="">
            <svg
              className="mx-auto h-40 w-40 max-sm:h-25 max-sm:w-25 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#172D7F] mb-10 mt-4 max-sm:mb-8">
            Thank you, we have received your application.
          </h1>

          <Link href="/" className="w-fit">
            <button className="group max-sm:text-base text-xl hover:text-[#172D7F] cursor-pointer items-center transition-colors justify-center gap-4 max-sm:gap-2 inline-flex bg-[#0c0c0c] text-[#ffffff] rounded-full px-8 max-sm:px-6 max-sm:py-3 py-4">
              Home
              <Image 
                src="/arrowWhite.svg" 
                width={20} 
                height={16} 
                alt=""
                className="transition-transform duration-400 max-sm:w-[15px] h-auto group-hover:translate-x-2"
              />
              
            </button>
          </Link>
          
        </div>
      </div>
    </>
  );
};

export default Success;