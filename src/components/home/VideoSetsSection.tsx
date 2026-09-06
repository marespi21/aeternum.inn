"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { VideoSetItem } from "@/types";
import { VideoModal } from "@/components/ui/VideoModal";
import { YoutubeIcon } from "@/components/icons/CustomIcons";
import {
  Play,
  MapPin,
  Clock,
  Eye,
  Sparkles,
  ExternalLink,
  Film,
} from "lucide-react";

type FilterType = "ALL" | "CAPITULOS" | "BOSQUE" | "LIVE_SETS";

export function VideoSetsSection({ initialVideos }: { initialVideos: any[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [selectedSet, setSelectedSet] = useState<VideoSetItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Mapeamos los datos de la base de datos al formato del frontend
  const mappedVideos = initialVideos.map(v => ({
    id: v.id,
    title: v.title,
    dj: v.dj,
    location: v.location,
    coverUrl: v.cover_url,
    youtubeUrl: v.youtube_url,
    youtubeId: (v.youtube_url?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]{11})/) || [])[1] || '',
    releaseDate: v.created_at || new Date().toISOString(),
    description: '',
    bpm: 125,
    category: v.category,
    locationType: v.category,
    duration: v.duration,
    chapterNumber: v.chapter_number,
    views: v.views,
    genres: ["TECHNO"] // Default genre
  }))

  const filteredSets = mappedVideos.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.category === activeFilter;
  });

  const handleOpenSet = (set: VideoSetItem) => {
    setSelectedSet(set);
    setModalOpen(true);
  };

  const filterTabs: { label: string; value: FilterType; count: number }[] = [
    { label: "TODOS LOS SETS", value: "ALL", count: mappedVideos.length },
    {
      label: "CAPÍTULOS",
      value: "CAPITULOS",
      count: mappedVideos.filter((i) => i.category === "CAPITULOS").length,
    },
    {
      label: "SESIONES EN EL BOSQUE",
      value: "BOSQUE",
      count: mappedVideos.filter((i) => i.category === "BOSQUE").length,
    },
    {
      label: "LIVE SETS",
      value: "LIVE_SETS",
      count: mappedVideos.filter((i) => i.category === "LIVE_SETS").length,
    },
  ];

  return (
    <section
      id="video-sets"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400 mb-2">
            <YoutubeIcon className="w-4 h-4" />
            CANAL OFICIAL // YOUTUBE @AETERNUM-INN
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono uppercase tracking-tight text-white">
            LUGARES DE PELÍCULA
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="max-w-md text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed">
            Explora las grabaciones audiovisuales oficiales en 4K. Sets cinematográficos capturados en los escenarios más imponentes de Antioquia.
          </p>
          <a
            href="https://www.youtube.com/@aeternum-inn?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-600/15 hover:bg-red-600/25 border border-red-500/30 text-xs font-mono font-bold text-red-400 hover:text-red-300 transition-colors"
          >
            <YoutubeIcon className="w-4 h-4" />
            <span>Suscribirse al Canal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 custom-scrollbar">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 ${
              activeFilter === tab.value
                ? "bg-white text-black font-bold shadow-lg shadow-white/10"
                : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === tab.value
                  ? "bg-black text-white"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Video Sets Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence>
          {filteredSets.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onClick={() => handleOpenSet(item)}
              className="group relative cursor-pointer bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden hover:border-white/35 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-white/5 flex flex-col justify-between"
            >
              {/* Thumbnail Box */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                <Image
                  src={item.coverUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/70 group-hover:bg-red-600 text-white border border-white/30 group-hover:border-red-500 flex items-center justify-center backdrop-blur-md transition-all duration-300 transform group-hover:scale-110 shadow-2xl">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Chapter or Badge */}
                {item.chapterNumber && (
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-[10px] font-mono font-bold text-white tracking-widest">
                    CAPÍTULO 0{item.chapterNumber}
                  </div>
                )}

                {!item.chapterNumber && (
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-[10px] font-mono text-zinc-300">
                    {item.locationType}
                  </div>
                )}

                {/* Duration */}
                <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-[10px] font-mono text-zinc-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  {item.duration}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold tracking-wider uppercase">
                      {item.dj}
                    </span>
                    <span className="text-zinc-500 text-[11px] flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {item.views}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold font-mono text-zinc-200 group-hover:text-white transition-colors uppercase leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="uppercase text-[10px] text-zinc-500">
                    #{item.genres[0]}
                  </span>
                  <span className="text-white flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>Ver Set</span>
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Video Modal */}
      <VideoModal
        videoSet={selectedSet}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
