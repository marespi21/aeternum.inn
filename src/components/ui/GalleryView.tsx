"use client";

import React, { useState, useEffect } from "react";
import { Camera, Video, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: string;
  type: string;
  url: string;
}

export function GalleryView({ items }: { items: GalleryItem[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight' && selectedIndex !== null) {
        setSelectedIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : prev));
      }
      if (e.key === 'ArrowLeft' && selectedIndex !== null) {
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, items.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex < items.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <>
      {/* Masonry Grid Full */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedIndex(index)}
            className="break-inside-avoid relative group rounded-xl overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer"
          >
            <div className="relative w-full overflow-hidden">
              {item.type === 'video' ? (
                <video
                  src={item.url}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105 group-hover:brightness-75"
                  muted loop autoPlay playsInline
                />
              ) : (
                <img
                  src={item.url}
                  alt="Aeternum Rave"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105 group-hover:brightness-75"
                  loading="lazy"
                />
              )}
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="p-4 bg-black/60 rounded-full backdrop-blur-sm border border-white/20 shadow-lg">
                  {item.type === 'video' ? <Video className="w-6 h-6 text-white" /> : <Camera className="w-6 h-6 text-white" />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            {selectedIndex > 0 && (
              <button 
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/20 rounded-full transition-colors z-50 text-white hidden sm:block"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* Next Button */}
            {selectedIndex < items.length - 1 && (
              <button 
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/20 rounded-full transition-colors z-50 text-white hidden sm:block"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            <div 
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking on media
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {items[selectedIndex].type === 'video' ? (
                    <video
                      src={items[selectedIndex].url}
                      className="max-w-full max-h-[90vh] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                      controls
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={items[selectedIndex].url}
                      alt="Aeternum Rave Enlarged"
                      className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Mobile Controls */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 sm:hidden z-50">
              <button 
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className="p-4 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-full transition-colors text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNext}
                disabled={selectedIndex === items.length - 1}
                className="p-4 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-full transition-colors text-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
