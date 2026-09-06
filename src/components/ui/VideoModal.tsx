"use client";

import React, { useState } from "react";
import { VideoSetItem } from "@/types";
import { Modal } from "./Modal";
import { SoundcloudIcon, YoutubeIcon } from "@/components/icons/CustomIcons";
import {
  MapPin,
  Clock,
  Radio,
  Eye,
  Share2,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { AudioEqualizer } from "./AudioEqualizer";

interface VideoModalProps {
  videoSet: VideoSetItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ videoSet, isOpen, onClose }: VideoModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!videoSet) return null;

  const handleShare = () => {
    const shareUrl = videoSet.youtubeUrl || window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={videoSet.dj}
      subtitle={videoSet.location}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Real Responsive YouTube Embed Player */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/20 shadow-2xl">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoSet.youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
            title={videoSet.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Video Metadata & Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-[10px] font-mono font-bold text-red-400 flex items-center gap-1.5">
                <YoutubeIcon className="w-3.5 h-3.5" />
                4K OFFICIAL MASTER
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {videoSet.duration}
              </span>
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-white font-mono uppercase leading-snug">
              {videoSet.title}
            </h4>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {videoSet.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {videoSet.genres.map((genre, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-[10px] font-mono text-zinc-400 uppercase tracking-wider"
                >
                  #{genre}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links / Location Card */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                <span className="text-white font-semibold truncate">
                  {videoSet.locationType}
                </span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Eye className="w-3.5 h-3.5" />
                <span>{videoSet.views} reproducciones</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>{videoSet.bpm} BPM Master Audio</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <a
                href={videoSet.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold tracking-wider transition-colors shadow-lg hover:shadow-red-600/20"
              >
                <YoutubeIcon className="w-4 h-4" />
                Abrir en YouTube
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Enlace Copiado</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartir Video</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
