"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";

export function ScrollColorizer({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  // Triggers when the element is in the middle 50% of the screen
  const isInView = useInView(ref, { margin: "-25% 0px -25% 0px" });

  return (
    <div 
      ref={ref} 
      data-inview={isInView} 
      className={`group/colorizer ${className}`}
    >
      {children}
    </div>
  );
}
