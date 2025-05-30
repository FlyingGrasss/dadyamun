"use client"

import { motion } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className="relative z-10 "
      style={{ scrollbarWidth: "none" }} // Ensures the div takes full height
    >
      {children}
    </motion.div>
  )
}