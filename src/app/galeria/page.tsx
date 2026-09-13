import React from "react";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { GalleryView } from "@/components/ui/GalleryView";

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
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
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
        <GalleryView items={galleryItems} />
      )}
    </div>
  );
}
