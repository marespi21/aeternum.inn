"use client";

import React from "react";
import { Disc, Radio, Zap } from "lucide-react";

export function MarqueeBanner() {
  const marqueeItems = [
    "POTENCIAMOS DJS NACIONALES",
    "RAVES EN LUGARES DE PELÍCULA",
    "MOMENTOS PARA LA ETERNIDAD",
    "MEDELLÍN UNDERGROUND",
    "SONIDO FUNKTION-ONE",
    "TRANSMISIÓN 24/7",
    "AETERNUM SESSIONS",
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/15 bg-black py-4 select-none">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {/* First track */}
        <div className="flex items-center gap-8 px-4">
          {marqueeItems.map((item, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-8">
              <span className="text-sm sm:text-base font-extrabold font-mono uppercase tracking-[0.25em] text-white">
                {item}
              </span>
              <span className="w-2 h-2 rounded-full bg-zinc-600 inline-block" />
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless infinite loop */}
        <div className="flex items-center gap-8 px-4" aria-hidden="true">
          {marqueeItems.map((item, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-8">
              <span className="text-sm sm:text-base font-extrabold font-mono uppercase tracking-[0.25em] text-white">
                {item}
              </span>
              <span className="w-2 h-2 rounded-full bg-zinc-600 inline-block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
