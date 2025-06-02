import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col h-[90vh] min-[1500px]:h-[95vh] justify-center items-center min-[1800px]:gap-7 gap-5 max-sm:gap-3'>
      <h1 className="text-4xl min-[1800px]:text-5xl max-sm:text-2xl text-center text-[#172D7F] font-bold">We couldn't find the page you were looking for</h1>
      <Image 
        src={"/404 Not Found.gif"}
        alt="404 Not Found"
        width={500}
        height={500}
        className="mx-auto min-[1500px]:w-[600px] max-sm:w-[300px] min-[1800px]:w-[700px] h-auto bg-black rounded-4xl  mix-blend-darken"
      />
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
  )
}

export default NotFound