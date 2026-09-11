"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  RadioTower,
  Users,
  ExternalLink,
} from "lucide-react";
import { AudioEqualizer } from "@/components/ui/AudioEqualizer";
import ReactPlayer from 'react-player';

export function RadioBar({ track }: { track?: any }) {
  const currentTrack = track || null;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [listeners, setListeners] = useState(134);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Determinar si es YouTube o SoundCloud
  const isSoundCloud = currentTrack.audio_url.includes('soundcloud.com');
  const isYouTube = currentTrack.audio_url.includes('youtube.com') || currentTrack.audio_url.includes('youtu.be');
  
  // Extraer ID de YouTube
  let ytId = '';
  if (isYouTube) {
    try {
      const urlObj = new URL(currentTrack.audio_url);
      ytId = urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop() || '';
    } catch {
      ytId = '';
    }
  }

  const scEmbedUrl = isSoundCloud 
    ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(currentTrack.audio_url)}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`
    : '';
    
  const ytEmbedUrl = isYouTube
    ? `https://www.youtube.com/embed/${ytId}?enablejsapi=1&autoplay=0&controls=0&playsinline=1`
    : '';

  const postMessageToPlayer = (method: string, value?: any) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      if (isSoundCloud) {
        const message = JSON.stringify({ method, value });
        iframeRef.current.contentWindow.postMessage(message, '*');
      } else if (isYouTube) {
        // YouTube API mappings
        let ytCommand = '';
        if (method === 'play') ytCommand = 'playVideo';
        else if (method === 'pause') ytCommand = 'pauseVideo';
        else if (method === 'setVolume') ytCommand = 'setVolume';
        
        const message = JSON.stringify({ event: 'command', func: ytCommand, args: value !== undefined ? [value] : [] });
        iframeRef.current.contentWindow.postMessage(message, '*');
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      postMessageToPlayer('pause');
    } else {
      setIsPlaying(true);
      postMessageToPlayer('play');
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    postMessageToPlayer(isSoundCloud ? 'setVolume' : 'setVolume', !isMuted ? 0 : volume * 100);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    postMessageToPlayer('setVolume', val * 100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setListeners((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!currentTrack || !mounted) return null;

  return (
    <>
      {(isSoundCloud || isYouTube) && (
        <iframe
          ref={iframeRef}
          src={isSoundCloud ? scEmbedUrl : ytEmbedUrl}
          width="200"
          height="200"
          allow="autoplay"
          style={{ position: 'fixed', top: 0, left: 0, opacity: 0.001, pointerEvents: 'none', zIndex: -100 }}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 px-2 sm:px-4 pb-2 sm:pb-3 pointer-events-none">
        <div className="max-w-6xl mx-auto pointer-events-auto bg-[#0a0a0a]/90 hover:bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-full p-2.5 sm:py-2.5 sm:px-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all duration-300">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Left: Play button & On-Air beacon */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-zinc-200 text-black flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-md shrink-0"
                aria-label={isPlaying ? "Pausar Radio" : "Reproducir Radio"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <div className="hidden sm:flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${
                      isPlaying ? "animate-ping" : ""
                    }`}
                  />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  ON AIR
                </span>
              </div>
            </div>

            {/* Center: Track & Station Info + Equalizer */}
            <div className="flex-1 min-w-0 flex items-center gap-3 sm:gap-5 justify-start sm:justify-center">
              <div className="shrink-0 hidden xs:block">
                <AudioEqualizer isPlaying={isPlaying} barsCount={5} color="white" />
              </div>

              <div className="truncate text-left">
                <div className="flex items-center gap-2">
                  <div className="relative w-4 h-4 rounded overflow-hidden border border-white/20 shrink-0">
                    <img
                      src="/images/logo.png"
                      alt="Aeternum"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white font-mono tracking-wider truncate">
                    Aeternum Radio
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono hidden md:inline">
                    //
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono truncate hidden md:inline">
                    {currentTrack.title} ({currentTrack.audio_url})
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs text-zinc-500 font-mono flex items-center gap-2 truncate">
                  <span>{currentTrack.location}</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="hidden sm:flex items-center gap-1 text-zinc-400">
                    <Users className="w-3 h-3 text-zinc-500" />
                    {listeners} ravers escuchando
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Volume & Station Link */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-zinc-400 hover:text-white transition-colors"
                  aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 lg:w-24 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              <a
                href="#eventos"
                className="hidden lg:flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-zinc-900 border border-white/10 transition-colors"
              >
                <RadioTower className="w-3 h-3 text-emerald-400" />
                <span>Lineup</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
