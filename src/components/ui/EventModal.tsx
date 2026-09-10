"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EventItem } from "@/types";
import { Modal } from "./Modal";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
} from "lucide-react";

interface EventModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  const [copied, setCopied] = useState(false);
  const [userName, setUserName] = useState("");
  const [guestCount, setGuestCount] = useState("1");

  if (!event) return null;

  const handleCopySecretInfo = () => {
    navigator.clipboard.writeText(
      `${event.title} - ${event.date} | ${event.locationDetails}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hola Aeternum! Solicito reserva/Guest List para "${event.title}". Nombre: ${
        userName || "[Tu Nombre]"
      }, Cupos: ${guestCount}. Por favor enviarme confirmación y enlace de pago.`
    );
    return `https://wa.me/573001234567?text=${text}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event.title}
      subtitle={event.subtitle}
      maxWidth="max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Flyer Preview */}
        <div className="md:col-span-5 relative aspect-[3/4] rounded-xl overflow-hidden border border-white/15 bg-zinc-900">
          <Image
            src={event.flyerUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-mono font-semibold tracking-wider text-emerald-400">
            {event.status.replace("_", " ")}
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-left">
            <span className="text-xs font-mono uppercase text-zinc-400">Acceso</span>
            <p className="text-base font-bold text-white">{event.price}</p>
          </div>
        </div>

        {/* Event Details */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Meta info pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/80 border border-white/10">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-200">{event.fullDate}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/80 border border-white/10">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span className="text-zinc-200">{event.time}</span>
              </div>
            </div>

            {/* Location Secret Notice */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <MapPin className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="font-semibold text-white">{event.location}</span>
                </div>
                <button
                  onClick={handleCopySecretInfo}
                  className="text-[10px] font-mono flex items-center gap-1 text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-900 border border-white/10 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copiar Info
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {event.locationDetails}
              </p>
            </div>

            {/* Lineup */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Lineup Confirmado
              </h4>
              <ul className="space-y-1.5">
                {event.lineup.map((artist, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm font-mono text-zinc-200 flex items-center gap-2 pl-2 border-l border-zinc-700"
                  >
                    <span className="text-zinc-500 text-[10px]">0{idx + 1}</span>
                    <span className="font-semibold tracking-wide">{artist}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-1">
              {event.description}
            </p>
          </div>

          {/* Quick RSVP Form to WhatsApp */}
          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Tu Nombre completo"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="col-span-2 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40"
              />
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="px-2 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-white/40"
              >
                <option value="1">1 Cupo</option>
                <option value="2">2 Cupos</option>
                <option value="4">4 Cupos (VIP)</option>
                <option value="6">Mesa / Lounge</option>
              </select>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black hover:bg-zinc-200 font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-white/10 group"
            >
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              Reservar Directo vía WhatsApp
            </a>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verificación estricta +18 · Aforo controlado</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
