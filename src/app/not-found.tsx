"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f5] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-8 flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 bg-zinc-950 px-4 py-2 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          ERROR 404 // FRECUENCIA PERDIDA
        </div>
        
        <h1 className="text-8xl sm:text-9xl font-black font-title tracking-[0.1em] text-white uppercase drop-shadow-2xl">
          404
        </h1>
        
        <p className="text-zinc-400 font-sans max-w-md mx-auto text-sm sm:text-base leading-relaxed">
          Parece que te has perdido en la oscuridad. La ruta que buscas no existe o ha sido movida.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:scale-105 hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] group mt-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Inicio</span>
        </Link>
      </div>
    </div>
  );
}
