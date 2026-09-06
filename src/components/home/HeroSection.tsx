"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Disc, Flame } from "lucide-react";

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
    <section className="relative w-full pt-20 sm:pt-24 pb-10 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Top Mini Bar */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-500 uppercase tracking-widest border-b border-white/10 pb-2.5 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300">MEDELLIN // 6.2442° N, 75.5812° W</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-zinc-400">
            <span>SEASON 2026</span>
            <span className="text-zinc-600">//</span>
            <span className="text-emerald-400 font-semibold">24/7 ON AIR</span>
          </div>
        </div>

        {/* Central Compact Hero Block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex flex-col items-center text-center space-y-3 sm:space-y-4"
        >
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-zinc-400 tracking-widest">
            <Flame className="w-3 h-3 text-white" />
            <span>UNDERGROUND TECHNO & AUDIOVISUAL PLATFORM</span>
          </div>

          {/* Main Logo */}
          <div className="relative w-full max-w-[200px] sm:max-w-[260px] md:max-w-[320px] aspect-square mx-auto mb-6 sm:mb-8 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center my-0 select-none">
            <Image
              src="/images/logo.png"
              alt="AETERNUM"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 560px"
              className="object-contain mix-blend-screen pointer-events-none"
            />
          </div>

          {/* Slogan & Subtitle */}
          <div className="space-y-1.5 max-w-xl px-2">
            <p className="text-xs sm:text-sm md:text-base text-zinc-300 font-body tracking-wide font-normal leading-relaxed">
              Colectivo y plataforma de música electrónica en Medellín. Transformamos espacios icónicos en templos sónicos para la eternidad.
            </p>
          </div>

          {/* Compact CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1 w-full max-w-xs sm:max-w-sm">
            <a
              href="#eventos"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-title text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-md group"
            >
              <Disc className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Explorar Eventos</span>
            </a>

            <a
              href="#guest-list"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/20 hover:border-white/40 font-title text-xs font-semibold uppercase tracking-widest transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Guest List VIP</span>
            </a>
          </div>
        </motion.div>

        {/* 3 Pillars Grid - Tight and Balanced */}
        <div className="w-full pt-8 sm:pt-10 mt-6 sm:mt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-left">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-xl bg-zinc-950/60 border border-white/10 space-y-0.5 pl-3 border-l-2 border-l-white/40"
              >
                <div className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-between">
                  <span>PILAR {pillar.pilar}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                </div>
                <h3 className="text-xs font-bold font-title text-white tracking-wider uppercase">
                  {pillar.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400 font-body leading-snug">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
