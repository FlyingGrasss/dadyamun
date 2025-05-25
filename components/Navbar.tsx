"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768)
  }

  // Add event listener for window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Set initial state based on window width
  useEffect(() => {
    handleResize()
  }, [])

  // Helper function to determine if a link is active
  const isActive = (path: string) => pathname === path

  return (
    <div className='mt-5 mx-auto max-sm:mt-0 max-sm:w-full w-[1000px] flex justify-between h-[69px] max-sm:h-[80px] items-center py-2 max-sm:py-1 bg-white/50 max-sm:rounded-none rounded-full'>
      <Link 
        href="/" 
        className={`text-2xl max-sm:hidden font-extrabold py-2 px-4 pl-8 max-sm:text-xs cursor-pointer max-sm:py-1 max-sm:px-2 rounded-full ${isActive('/') ? 'text-[#172D7F]' : 'text-white'}`}
      >
        Home
      </Link>
      <Link 
        href="/letters" 
        className={`text-2xl max-sm:hidden font-extrabold py-2 px-4 max-sm:text-xs cursor-pointer max-sm:py-1 max-sm:px-2 rounded-full ${isActive('/letters') ? 'text-[#172D7F]' : 'text-white'}`}
      >
        Letters
      </Link>
      <Link 
        href="/secretariat" 
        className={`text-2xl max-sm:hidden font-extrabold py-2 px-4 max-sm:text-xs cursor-pointer max-sm:py-1 max-sm:px-2 rounded-full ${isActive('/secretariat') ? 'text-[#172D7F]' : 'text-white'}`}
      >
        Secretariat
      </Link>
      <Link 
        href="/committees" 
        className={`text-2xl max-sm:hidden font-extrabold py-2 px-4 max-sm:text-xs cursor-pointer max-sm:py-1 max-sm:px-2 rounded-full ${isActive('/committees') ? 'text-[#172D7F]' : 'text-white'}`}
      >
        Committees
      </Link>
      <Link 
        href="/apply" 
        className={`text-2xl max-sm:hidden font-extrabold py-2 px-4 pr-8 max-sm:text-xs cursor-pointer max-sm:py-1 max-sm:px-2 rounded-full ${isActive('/apply') ? 'text-[#172D7F]' : 'text-[#FF0F0F]'}`}
      >
        Apply
      </Link>

      {isMobile && (<>
        <Link href="/" >
          <Image 
            src={"/dadyamunLogoWhite.png"}
            alt="DADYAMUN'25 Logo"
            width={50}
            height={50}
            className='max-sm:w-[50px] max-sm:h-[50px] sm:hidden max-sm:mx-5 max-sm:my-2 cursor-pointer'
            priority
            quality={100}
          />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-50 cursor-pointer focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <Image 
            src={"/hamburger.svg"}
            alt="Menu"
            width={36}
            height={36}
            className='sm:hidden max-sm:mx-5 max-sm:my-2 cursor-pointer'
            priority
          />
        </button>

        {isOpen && (
          <div 
            className="fixed inset-0 bg-white opacity-40 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-[#fff] z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full pt-20 px-6">
            <Link 
              href="/" 
              className={`text-2xl py-4 border-b border-[#2A2A2A] ${isActive('/') ? 'text-[#172D7F]' : 'text-black'}`}
              onClick={() => setIsOpen(false)}
              aria-label="Home"
            >
              Home
            </Link>
            <Link 
              href="/letters" 
              className={`text-2xl py-4 border-b border-[#2A2A2A] ${isActive('/letters') ? 'text-[#172D7F]' : 'text-black'}`}
              onClick={() => setIsOpen(false)}
              aria-label="Letters"
            >
              Letters
            </Link>
            <Link 
              href="/secretariat" 
              className={`text-2xl py-4 border-b border-[#2A2A2A] ${isActive('/secretariat') ? 'text-[#172D7F]' : 'text-black'}`}
              onClick={() => setIsOpen(false)}
              aria-label="Secretariat"
            >
              Secretariat
            </Link>
            <Link 
              href="/committees" 
              className={`text-2xl py-4 border-b border-[#2A2A2A] ${isActive('/committees') ? 'text-[#172D7F]' : 'text-black'}`}
              onClick={() => setIsOpen(false)}
              aria-label="Committees"
            >
              Committees
            </Link>
            <Link 
              href="/apply" 
              className={`text-2xl py-4 border-b border-[#2A2A2A] ${isActive('/apply') ? 'text-[#172D7F]' : 'text-[#FF0F0F]'}`}
              onClick={() => setIsOpen(false)}
              aria-label="Apply"
            >
              Apply
            </Link>
          </div>
        </div>
      </>)}
    </div>
  )
}

export default Navbar