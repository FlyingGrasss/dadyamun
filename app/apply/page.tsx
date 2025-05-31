import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to be a part of DADYAMUN'25.",
  keywords: [
    "DADYAMUN'25",
    "Apply",
    "Registration",
    "MUN conference",
    "Model United Nations",
    "Datça MUN"
  ],
  openGraph: {
    title: "Apply",
    description: "Apply to be a part of DADYAMUN'25.",
    url: "https://www.dadyamun.org/apply",
  },
  twitter: {
    title: "Apply",
    description: "Apply to be a part of DADYAMUN'25.",
    card: "summary_large_image",
  },
};

const Apply = () => {
  return (
    <>

      <div className='flex flex-col h-[80vh] min-[1500px]:h-[84vh] justify-center items-center min-[1800px]:gap-14 gap-10 max-sm:gap-6'>
          <h1 className="text-7xl min-[1800px]:text-8xl max-sm:text-5xl text-center text-[#172D7F] font-bold">Coming Soon</h1>
          <Link href="/" className="w-fit">
            <button className="group max-sm:text-base text-xl hover:text-[#172D7F] cursor-pointer  items-center transition-colors justify-center gap-4 max-sm:gap-2 inline-flex bg-[#0c0c0c] text-[#ffffff] rounded-full px-8 max-sm:px-6 max-sm:py-3 py-4">
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
    </>
    /* 
      <h1 className="text-6xl max-sm:text-3xl mt-16 mb-16 max-sm:mt-8 text-center text-[#172D7F] font-bold">Apply</h1>

      <div className="grid place-items-center w-full grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-16 px-4 sm:px-0 mt-12 mb-12 sm:mb-16 sm:mt-16">
          <Link
            className="w-fit hover:scale-105 relative  transition-transform duration-500"
            href="/apply/delegate"
            
            rel="noopener noreferrer"
          >
            <Image 
              src="/applications/delegate.webp"
              alt="Apply Delegate Image"
              width={300}
              height={300}
              className="object-cover rounded-3xl border-4 border-[#172D7F] max-sm:border-2 transition-transform"
            />
            <div className="absolute inset-0 flex items-center p-4 max-sm:p-2">
              <h1 className="text-white text-2xl max-sm:text-sm  bg-black/70 w-fit p-2 px-4 max-sm:p-1 max-sm:px-2 font-medium mx-auto rounded-full text-center">
                Delegate
              </h1>
            </div>

          </Link>

          <Link
            className="w-fit hover:scale-105 relative  transition-transform duration-500"
            href="/apply/press"
            
            rel="noopener noreferrer"
          >
            <Image 
              src="/applications/press.webp"
              alt="Apply Press Image"
              width={300}
              height={300}
              className="object-cover rounded-3xl border-4 border-[#172D7F] max-sm:border-2 transition-transform"
            />
            <div className="absolute inset-0 flex items-center p-4 max-sm:p-2">
              <h1 className="text-white text-2xl max-sm:text-sm  bg-black/70 w-fit p-2 px-4 max-sm:p-1 max-sm:px-2 font-medium mx-auto rounded-full text-center">
                Press
              </h1>
            </div>
          </Link>

          <Link
            className="w-fit hover:scale-105 relative  transition-transform duration-500"
            href="/apply/pr"
            
            rel="noopener noreferrer"
          >
            <Image 
              src="/applications/pr.webp"
              alt="Apply Public Relations Image"
              width={300}
              height={300}
              className="object-cover rounded-3xl border-4 border-[#172D7F] max-sm:border-2 transition-transform"
            />
            <div className="absolute inset-0 flex items-center p-4 max-sm:p-2">
              <h1 className="text-white text-2xl max-sm:text-sm  bg-black/70 w-fit p-2 px-4 max-sm:p-1 max-sm:px-2 font-medium mx-auto rounded-full text-center">
                Public Relations
              </h1>
            </div>
          </Link>

          <Link
            className="w-fit hover:scale-105 relative  transition-transform duration-500"
            href="/apply/admin"
            
            rel="noopener noreferrer"
          >
            <Image 
              src="/applications/admin.webp"
              alt="Apply Admin Image"
              width={300}
              height={300}
              className="object-cover rounded-3xl border-4 border-[#172D7F] max-sm:border-2 transition-transform"
            />
            <div className="absolute inset-0 flex items-center p-4 max-sm:p-2">
              <h1 className="text-white text-2xl max-sm:text-sm  bg-black/70 w-fit p-2 px-4 max-sm:p-1 max-sm:px-2 font-medium mx-auto rounded-full text-center">
                Admin
              </h1>
            </div>
          </Link>

          <Link
            className="w-fit hover:scale-105 relative  transition-transform duration-500"
            href="/apply/delegation"
            
            rel="noopener noreferrer"
          >
            <Image 
              src="/applications/delegation.webp"
              alt="Apply Delegation Image"
              width={300}
              height={300}
              className="object-cover rounded-3xl border-4 border-[#172D7F] max-sm:border-2 transition-transform"
            />
            <div className="absolute inset-0 flex items-center p-4 max-sm:p-2">
              <h1 className="text-white text-2xl max-sm:text-sm  bg-black/70 w-fit p-2 px-4 max-sm:p-1 max-sm:px-2 font-medium mx-auto rounded-full text-center">
                Delegation
              </h1>
            </div>
          </Link>
          
      </div>

    */

      
    
  );
};

export default Apply;