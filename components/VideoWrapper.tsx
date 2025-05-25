"use client";

import { useEffect, useState } from "react";

export default function VideoBackground() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden">
      <video
        className="object-cover w-full h-full"
        autoPlay
        muted
        loop
        playsInline
        src={isMobile ? "/videos/mobile.mp4" : "/videos/desktop.mp4"}
      />
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
}