"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollColorizer } from "@/components/ui/ScrollColorizer";
import { EventModal } from "@/components/ui/EventModal";
import {
  Calendar,
  MapPin,
  Ticket,
  ArrowUpRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function EventsGrid({ events }: { events: any[] }) {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenEvent = (event: any) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleBuy = (eventId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    // Redirige al checkout dinámicamente en la misma pestaña
    router.push(`/eventos/${eventId}/pago`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event, idx) => (
          <ScrollColorizer key={event.id} className="h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => handleBuy(event.id)}
              className="group relative flex flex-col h-full bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 group-data-[inview=true]/colorizer:border-white/20 transition-all duration-500 shadow-xl hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)] group-data-[inview=true]/colorizer:-translate-y-1 group-data-[inview=true]/colorizer:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              {/* Efecto hover estilo pilares */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-400/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left z-20" />

              {/* Flyer Vertical Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                <Image
                  src={event.flyer_url || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop"}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 group-data-[inview=true]/colorizer:scale-105 group-data-[inview=true]/colorizer:grayscale-0 transition-all duration-700 ease-out"
                />
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono font-bold text-white tracking-widest flex items-center gap-1.5 shadow-lg">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                {new Date(event.date).toLocaleDateString("en-GB", { timeZone: "UTC" })}
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4 bg-emerald-950/90 border border-emerald-500/40 px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider text-emerald-300 backdrop-blur-md">
                AVAILABLE
              </div>
            </div>

            {/* Event Info Card Content */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-bold font-mono text-white group-hover:text-emerald-300 transition-colors uppercase leading-snug">
                  {event.title}
                </h3>
                
                {/* Location */}
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-1">
                  <MapPin className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span className="truncate">{event.location || "Secret Location"}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-center">
                <button
                  onClick={(e) => handleBuy(event.id, e)}
                  className="flex w-full justify-center items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 group-data-[inview=true]/colorizer:bg-white group-data-[inview=true]/colorizer:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow hover:shadow-white/20"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Comprar Tickets</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
              </div>
            </motion.div>
          </ScrollColorizer>
        ))}
      </div>

      {/* Modal (Opcional por ahora) */}
      <EventModal
        event={selectedEvent}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
