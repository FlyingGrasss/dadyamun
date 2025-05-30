"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from 'next/navigation'

export default function BackgroundImage() {

  const pathname = usePathname();
  
  // Don't show navbar on studio routes
  if (pathname?.startsWith('/studio')) {
    return null;
  }
  
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if mobile on initial load
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial state
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Fix for mobile viewport height issue
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);
  
  return (
    <div 
      className="fixed top-0 left-0 w-full z-[-1] overflow-hidden bg-gradient-to-r from-[#172D7F] to-[#FECF99]"
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <Image
        src={isMobile ? "/background/mobile.jpg" : "/background/desktop.jpg"}
        alt="Ocean background"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30 mix-blend-overlay"
        quality={90}
      />
    </div>
  );
}