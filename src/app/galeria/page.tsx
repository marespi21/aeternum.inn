import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: 'Galería | AETERNUM',
  description: 'Archivo visual de nuestras experiencias underground en Medellín.',
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const galleryItems = items || [];

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f5] pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
        <div>
          <Link 
            href="/#experiencia" 
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            VOLVER AL INICIO
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            <Sparkles className="w-4 h-4" />
            ARCHIVO VISUAL
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-mono uppercase tracking-tight text-white">
            GALERIA
          </h1>
        </div>
        <p className="max-w-md text-sm font-sans text-zinc-400 leading-relaxed">
          Recuerdos de nuestras ediciones pasadas. La cultura electrónica viva en cada rincón. ({galleryItems.length} registros)
        </p>
      </div>

      {/* Grid */}
      {galleryItems.length === 0 ? (
        <div className="text-center py-32 border border-white/10 rounded-2xl bg-zinc-900/50">
          <p className="text-zinc-400 font-mono">No hay archivos en la galería aún.</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-xl"
            >
              {item.type === "video" ? (
                <video
                  src={item.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              ) : (
                <img
                  src={item.url}
                  alt="Aeternum Gallery"
                  loading="lazy"
                  className="w-full h-auto object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
