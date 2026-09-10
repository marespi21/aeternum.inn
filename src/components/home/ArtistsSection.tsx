import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ScrollColorizer } from "@/components/ui/ScrollColorizer";

export async function ArtistsSection() {
  const supabase = await createClient();
  const { data: artists } = await supabase
    .from("artists")
    .select("*")
    .order("created_at", { ascending: false });

  if (!artists || artists.length === 0) {
    return null; // No mostrar la sección si no hay artistas
  }

  return (
    <section id="artistas" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            <Sparkles className="w-4 h-4" />
            EL TALENTO // ROSTER OFICIAL
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase tracking-tight text-white">
            NUESTROS ARTISTAS
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed">
          Los arquitectos del sonido de Aeternum. Perfiles, sets exclusivos y memorias de nuestros invitados de honor.
        </p>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <ScrollColorizer key={artist.id}>
            <Link
              href={`/artistas/${artist.id}`}
              className="group block relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 transform transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)] group-data-[inview=true]/colorizer:-translate-y-2 group-data-[inview=true]/colorizer:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)] group-data-[inview=true]/colorizer:border-white/20"
            >
              {/* Efecto hover estilo pilares */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left z-20" />

              <div className="aspect-[3/4] w-full overflow-hidden relative">
                <img
                  src={artist.image_url}
                  alt={artist.name}
                  className="w-full h-full object-cover filter grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 group-data-[inview=true]/colorizer:grayscale-0 group-data-[inview=true]/colorizer:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 group-hover:opacity-80 group-data-[inview=true]/colorizer:opacity-80 transition-opacity" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl sm:text-3xl font-black font-mono uppercase tracking-tight text-white mb-1 group-hover:text-emerald-400 group-data-[inview=true]/colorizer:text-emerald-400 transition-colors">
                    {artist.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-data-[inview=true]/colorizer:opacity-100 group-data-[inview=true]/colorizer:translate-y-0 transition-all duration-500">
                    <span>Ver Perfil</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          </ScrollColorizer>
        ))}
      </div>
    </section>
  );
}
