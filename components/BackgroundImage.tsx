"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function BackgroundImage() {
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
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden bg-gradient-to-r from-[#172D7F] to-[#FECF99]">
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