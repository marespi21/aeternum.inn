"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function GuestListSection() {
  return (
    <section id="comunidad" className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <div className="relative rounded-3xl bg-zinc-950 border border-white/15 p-6 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
        {/* Glow ambient background inside card */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>AETERNUM SOCIETY // ACCESO EXCLUSIVO</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-white tracking-tight uppercase leading-tight">
              UNETE A LA COMUNIDAD
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              Regístrate para recibir acceso prioritario a la preventa de boletos, y el contenido más reciente.
            </p>

            <ul className="space-y-3 pt-2 text-xs sm:text-sm font-mono text-zinc-400">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live sets inéditos</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Beneficios exclusivos en nuestros eventos</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Acceso a grabaciones de live sets</span>
              </li>
            </ul>
          </div>

          {/* Right Column: CTA Button */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6 bg-black/60 border border-white/10 p-8 sm:p-10 rounded-2xl backdrop-blur-md">
            <div className="text-center space-y-2 mb-4">
              <h3 className="text-xl font-bold font-mono text-white uppercase">Membresía Gratuita</h3>
              <p className="text-xs text-zinc-400 font-mono">Únete en menos de 1 minuto</p>
            </div>

            <Link
              href="/login?mode=signup"
              className="inline-flex px-8 py-3.5 rounded-full bg-white text-black font-mono text-[11px] font-bold uppercase tracking-widest hover:scale-105 hover:bg-zinc-200 transition-all items-center justify-center gap-2 shadow-lg hover:shadow-white/20"
            >
              <span>Registrarme Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500 text-center mt-4">
              <Lock className="w-3.5 h-3.5" />
              <span>Tus datos son 100% privados y confidenciales.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
