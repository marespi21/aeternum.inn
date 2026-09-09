import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Camera, MonitorPlay, Headphones, Sparkles, Play } from 'lucide-react'
import { ScrollColorizer } from "@/components/ui/ScrollColorizer"

// Icon components mapping
const SocialIcon = ({ type, className }: { type: string, className?: string }) => {
  switch (type) {
    case 'instagram':
      return <Camera className={className} />
    case 'youtube':
      return <MonitorPlay className={className} />
    case 'soundcloud':
      return <Headphones className={className} />
    default:
      return null
  }
}

// Helper to extract YouTube video ID and create embed URL
const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
}

export default async function ArtistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // 1. Fetch Artist Data
  const { data: artist, error: artistError } = await supabase
    .from('artists')
    .select('*')
    .eq('id', id)
    .single()

  if (artistError || !artist) {
    notFound()
  }

  // 2. Fetch Artist Gallery
  const { data: gallery } = await supabase
    .from('artist_gallery')
    .select('*')
    .eq('artist_id', id)
    .order('created_at', { ascending: false })

  const embedUrl = artist.youtube_url ? getYouTubeEmbedUrl(artist.youtube_url) : null;

  return (
    <div className="min-h-screen bg-black pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        
        {/* Navigation */}
        <Link href="/#artistas" className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 font-mono text-sm uppercase transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver a los artistas
        </Link>

        {/* 
          MAIN CARD 
        */}
        <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.03)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            
            {/* Left: Artist Image */}
            <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto h-full w-full bg-zinc-900 border-r border-white/10 group">
              <ScrollColorizer className="w-full h-full">
                <Image
                  src={artist.image_url}
                  alt={artist.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover filter grayscale hover:grayscale-0 group-data-[inview=true]/colorizer:grayscale-0 transition-all duration-700"
                  priority
                />
              </ScrollColorizer>
            </div>

            {/* Right: Info */}
            <div className="md:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
              
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4">
                <Sparkles className="w-4 h-4" />
                AETERNUM ROSTER
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-title uppercase tracking-tighter text-white mb-8">
                {artist.name}
              </h1>

              {/* Biography */}
              {artist.bio ? (
                <div className="text-zinc-300 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-wrap mb-10">
                  {artist.bio}
                </div>
              ) : (
                <div className="text-zinc-500 font-mono text-sm mb-10 italic">
                  Sin descripción disponible.
                </div>
              )}

              {/* Social Links */}
              <div className="mt-auto">
                <p className="text-xs font-mono uppercase text-zinc-500 mb-4 tracking-widest border-b border-white/10 pb-2">
                  Conectar con el artista
                </p>
                <div className="flex items-center gap-4">
                  {artist.instagram_url && (
                    <a href={artist.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all group">
                      <SocialIcon type="instagram" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-xs uppercase">Instagram</span>
                    </a>
                  )}
                  {artist.soundcloud_url && (
                    <a href={artist.soundcloud_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/20 transition-all group">
                      <SocialIcon type="soundcloud" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-xs uppercase">SoundCloud</span>
                    </a>
                  )}
                  {artist.youtube_url && !embedUrl && (
                    <a href={artist.youtube_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all group">
                      <SocialIcon type="youtube" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-xs uppercase">YouTube</span>
                    </a>
                  )}
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* 
          LIVE SET SECTION (Embed)
        */}
        {embedUrl && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-mono uppercase text-white tracking-widest flex items-center gap-3">
              <Play className="w-6 h-6 text-emerald-500" />
              Live Set // Video
            </h2>
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <iframe 
                src={embedUrl} 
                title={`${artist.name} Live Set`} 
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* 
          GALLERY SECTION
        */}
        {gallery && gallery.length > 0 && (
          <div className="space-y-8 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold font-mono uppercase text-white tracking-widest text-center">
              Momentos // {artist.name}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item, index) => (
                <ScrollColorizer key={item.id}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 group cursor-pointer">
                    <Image
                      src={item.url}
                      alt={`${artist.name} gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 group-data-[inview=true]/colorizer:grayscale-0 group-data-[inview=true]/colorizer:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-data-[inview=true]/colorizer:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 group-data-[inview=true]/colorizer:opacity-100 transform translate-y-4 group-hover:translate-y-0 group-data-[inview=true]/colorizer:translate-y-0 transition-all duration-500" />
                    </div>
                  </div>
                </ScrollColorizer>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  )
}
