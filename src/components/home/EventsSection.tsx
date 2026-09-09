import React from "react";
import { createClient } from "@/utils/supabase/server";
import { EventsGrid } from "./EventsGrid";

export async function EventsSection() {
  const supabase = await createClient();

  // Obtener eventos futuros de la base de datos
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true })
    // .gte("date", new Date().toISOString()) // Opcional: solo futuros

  // Si no hay eventos reales, mostramos un estado vacío o mensaje
  const activeEvents = events || [];

  return (
    <section id="eventos" className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            TEMPORADA 2026 // LINEUP OFICIAL
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase tracking-tight text-white">
            PROXIMOS EVENTOS
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed">
          Raves inmersivos en locaciones exclusivas. Aforos limitados para preservar la experiencia y la cultura underground.
        </p>
      </div>

      {activeEvents.length === 0 ? (
        <div className="text-center py-20 border border-white/10 rounded-2xl bg-zinc-900/50">
          <p className="text-zinc-400 font-mono">No hay eventos programados en este momento.</p>
        </div>
      ) : (
        <EventsGrid events={activeEvents} />
      )}
    </section>
  );
}
