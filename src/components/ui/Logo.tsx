"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  variant?: "full" | "icon" | "badge";
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  className?: string;
  withGlow?: boolean;
}

export function Logo({
  variant = "full",
  size = "md",
  className = "",
  withGlow = true,
}: LogoProps) {
  const sizeStyles = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
    hero: "w-28 h-28 sm:w-36 sm:h-36",
  };

  if (variant === "badge") {
    return (
      <div
        className={`relative inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-black/80 border border-white/20 backdrop-blur-xl shadow-[0_0_25px_rgba(255,255,255,0.08)] group ${className}`}
      >
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/20 bg-black flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="Aeternum Logo"
            fill
            className="object-cover scale-125"
            priority
          />
        </div>
        <span className="text-xs font-title font-bold tracking-[0.2em] text-white uppercase group-hover:text-zinc-200 transition-colors">
          AETERNUM
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-block select-none ${sizeStyles[size]} ${className}`}
    >
      {/* Ambient Glow */}
      {withGlow && (
        <div className="absolute inset-0 bg-white/15 rounded-full blur-xl scale-95 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="Aeternum Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
