"use client";

import React from "react";

interface AudioEqualizerProps {
  isPlaying: boolean;
  barsCount?: number;
  color?: "white" | "emerald";
  className?: string;
}

export function AudioEqualizer({
  isPlaying,
  barsCount = 5,
  color = "white",
  className = "",
}: AudioEqualizerProps) {
  const bars = Array.from({ length: barsCount });

  return (
    <div className={`flex items-end gap-[3px] h-5 ${className}`}>
      {bars.map((_, index) => {
        const animationClass = isPlaying
          ? `animate-eq-${(index % 5) + 1}`
          : "h-[3px]";

        const barColor =
          color === "emerald" ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-white";

        return (
          <span
            key={index}
            className={`w-[2.5px] rounded-full transition-all duration-300 ${barColor} ${animationClass}`}
            style={{
              height: isPlaying ? undefined : "3px",
            }}
          />
        );
      })}
    </div>
  );
}
