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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] font-black font-title tracking-[0.2em] text-white uppercase drop-shadow-2xl select-none"
          >
            AETERNUM
          </motion.h1>
        </div>
      </section>

      {/* Marquee Banner exactly below the video */}
      <MarqueeBanner />

      {/* Info & Pillars Section (Below the fold) */}
      <section className="relative w-full pt-16 pb-8 sm:pt-24 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-t border-white/10">
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-white tracking-widest">
              <Flame className="w-3 h-3 text-emerald-400" />
              <span>UNDERGROUND TECHNO & AUDIOVISUAL PLATFORM</span>
            </div>

            {/* Subtitle */}
            <div className="space-y-3 max-w-2xl px-2">
              <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-body tracking-wide font-normal leading-relaxed">
                Colectivo y plataforma de música electrónica en Colombia. Transformamos espacios icónicos en templos sónicos para la eternidad.
              </p>
            </div>


          </motion.div>

          {/* 3 Pillars Grid */}
          <div className="w-full pt-10 sm:pt-12 mt-10 sm:mt-12 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-zinc-950/50 border border-white/5 hover:border-white/10 transition-colors space-y-1 pl-4 border-l-2 border-l-emerald-500/60"
                >
                  <div className="text-[10px] sm:text-[11px] font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-between mb-2">
                    <span>PILAR {pillar.pilar}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <h3 className="text-sm font-bold font-title text-white tracking-wider uppercase">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-body leading-snug">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
