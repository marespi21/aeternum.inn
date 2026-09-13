"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Disc, Flame } from "lucide-react";
import { MarqueeBanner } from "./MarqueeBanner";

export function HeroSection() {
  const pillars = [
    {
      pilar: "01",
      title: "POTENCIAMOS DJS NACIONALES",
      desc: "Plataforma de desarrollo y proyección del talento local.",
    },
    {
      pilar: "02",
      title: "RAVES EN LUGARES DE PELICULA",
      desc: "Locaciones secretas, plantas industriales y miradores.",
    },
    {
      pilar: "03",
      title: "MOMENTOS PARA LA ETERNIDAD",
      desc: "Grabaciones en 4K, audio 24-bit y experiencias 360°.",
    },
  ];

  return (
    <>
      {/* Fullscreen Video Hero */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center scale-105"
          >
            <source src="/videos/minuto_07_20.mov" />
          </video>
          {/* Cinematic overlays for premium mobile & desktop feel */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black font-title tracking-[0.2em] text-white uppercase drop-shadow-2xl select-none leading-none"
          >
            AETERNUM
          </motion.h1>
        </div>
      </section>

      {/* Marquee Banner exactly below the video */}
      <MarqueeBanner />

      {/* Info & Pillars Section (Below the fold) */}
      <section className="relative w-full pt-16 pb-12 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-t border-white/5">
        {/* Ambient Dark Neon Glows for a premium feel */}
        <div className="absolute top-0 left-1/4 w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[50%] h-[50%] rounded-full bg-zinc-600/5 blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-black/80 blur-[80px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">


          {/* Central Compact Block */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex flex-col items-center text-center space-y-6 sm:space-y-8"
          >
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.05] shadow-[0_0_15px_rgba(255,255,255,0.03)] text-[10px] sm:text-xs font-mono text-zinc-300 tracking-widest backdrop-blur-md transition-all hover:bg-white/[0.05] hover:border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <Flame className="w-3.5 h-3.5 text-zinc-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="text-white/80 font-medium">UNDERGROUND TECHNO & AUDIOVISUAL PLATFORM</span>
            </div>

            {/* Subtitle */}
            <div className="space-y-3 max-w-2xl px-2">
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-body tracking-wide font-normal leading-relaxed">
                Colectivo y plataforma de música electrónica en Colombia. Transformamos espacios icónicos en templos sónicos para la eternidad.
              </p>
            </div>


          </motion.div>

          {/* 3 Pillars Grid */}
          <div className="w-full pt-12 sm:pt-16 mt-12 sm:mt-16 border-t border-white/[0.03]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-left">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="group relative p-6 sm:p-8 rounded-2xl bg-zinc-950/40 border border-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white/10 hover:bg-zinc-900/40 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)] hover:-translate-y-1"
                >
                  {/* Subtle inner dark neon gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Animated top glowing line */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="text-[10px] sm:text-[11px] font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-between mb-4">
                      <span className="group-hover:text-zinc-400 transition-colors duration-300">PILAR {pillar.pilar}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-zinc-200 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-500" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-title text-zinc-200 group-hover:text-white tracking-wider uppercase mb-2 transition-colors duration-300 drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-zinc-500 group-hover:text-zinc-400 font-body leading-relaxed transition-colors duration-300">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
