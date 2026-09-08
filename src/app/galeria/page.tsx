import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Video } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function GaleriaPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  const placeholderItems = [
    { id: "1", type: "image", url: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop" },
    { id: "2", type: "image", url: "https://images.unsplash.com/photo-1558317751-bc3ed6eb6d22?q=80&w=800&auto=format&fit=crop" },
    { id: "3", type: "image", url: "https://images.unsplash.com/photo-1470229722913-7c092bce8e4e?q=80&w=800&auto=format&fit=crop" },
    { id: "4", type: "image", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop" },
    { id: "5", type: "image", url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
    { id: "6", type: "image", url: "https://images.unsplash.com/photo-1525926472898-7651a443c5b5?q=80&w=800&auto=format&fit=crop" },
    { id: "7", type: "image", url: "https://images.unsplash.com/photo-1542314831-c5a4d407e202?q=80&w=800&auto=format&fit=crop" },
    { id: "8", type: "image", url: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=800&auto=format&fit=crop" },
  ];

  const displayItems = items && items.length > 0 ? items : placeholderItems;

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f5] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              <Sparkles className="w-4 h-4" />
              AETERNUM SOCIETY // ARCHIVO
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-mono uppercase tracking-tight text-white">
              GALERIA COMPLETA
            </h1>
          </div>
        </div>

        {/* Masonry Grid Full */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid relative group rounded-xl overflow-hidden bg-zinc-900 border border-white/5"
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
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="p-4 bg-black/60 rounded-full backdrop-blur-sm border border-white/20">
                    {item.type === 'video' ? <Video className="w-6 h-6 text-white" /> : <Sparkles className="w-6 h-6 text-white" />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
