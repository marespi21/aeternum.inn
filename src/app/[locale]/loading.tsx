"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] min-h-screen">
      <motion.div
        initial={{ opacity: 0.3, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <img
            src="/images/logo.png"
            alt="Loading Aeternum"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xs font-mono font-bold tracking-[0.3em] text-white uppercase opacity-70">
          Cargando
        </div>
      </motion.div>
    </div>
  );
}
