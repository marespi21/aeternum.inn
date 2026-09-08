import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, PlaySquare, Headphones, Camera, Video, Sparkles } from "lucide-react";

export default async function ArtistProfilePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const [{ data: artist }, { data: gallery }, { data: otherArtists }] = await Promise.all([
    supabase.from("artists").select("*").eq("id", params.id).single(),
    supabase.from("artist_gallery").select("*").eq("artist_id", params.id).order("created_at", { ascending: false }),
    supabase.from("artists").select("*").neq("id", params.id).limit(4)
  ]);

  if (!artist) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f5]">
      {/* Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] w-full">
        <img 
          src={artist.image_url} 
          alt={artist.name} 
          className="w-full h-full object-cover filter grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 md:p-24 max-w-7xl mx-auto">
          <Link
            href="/#artistas"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-sm mb-6 sm:mb-10 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Artistas</span>
          </Link>
          
          <h1 className="text-6xl sm:text-8xl font-black font-mono uppercase tracking-tighter text-white drop-shadow-2xl">
            {artist.name}
          </h1>
          
          {/* Social Links */}
          <div className="flex items-center gap-6 mt-8">
            {artist.youtube_url && (
              <a href={artist.youtube_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/20 hover:bg-white hover:text-black transition-all">
                <PlaySquare className="w-5 h-5" />
              </a>
            )}
            {artist.soundcloud_url && (
              <a href={artist.soundcloud_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/20 hover:bg-white hover:text-black transition-all">
                <Headphones className="w-5 h-5" />
              </a>
            )}
            {artist.instagram_url && (
              <a href={artist.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/20 hover:bg-white hover:text-black transition-all">
                <Camera className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-24 py-16 sm:py-24">
        {/* Bio Section */}
        {artist.bio && (
          <div className="max-w-3xl mb-24">
            <h2 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4">Biografía</h2>
            <p className="text-zinc-300 font-sans text-lg sm:text-xl leading-relaxed">
              {artist.bio}
            </p>
          </div>
        )}

        {/* Exclusive Event Gallery */}
        {gallery && gallery.length > 0 && (
          <div className="mb-32">
            <h2 className="text-3xl font-black font-mono uppercase tracking-tight text-white mb-10 flex items-center gap-3">
              <Camera className="text-emerald-400" />
              <span>Memorias del Evento</span>
            </h2>
            
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {gallery.map((item) => (
                <div key={item.id} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
                  {item.type === 'video' ? (
                    <video src={item.url} className="w-full h-auto" muted loop autoPlay playsInline />
                  ) : (
                    <img src={item.url} alt={`${artist.name} evento`} className="w-full h-auto object-cover" loading="lazy" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    {item.type === 'video' ? <Video className="w-8 h-8 text-white/50" /> : <Sparkles className="w-8 h-8 text-white/50" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* More Artists Section */}
        {otherArtists && otherArtists.length > 0 && (
          <div className="border-t border-white/10 pt-24">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-2xl sm:text-3xl font-black font-mono uppercase tracking-tight text-white">
                Descubre Más Artistas
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherArtists.map((other) => (
                <Link
                  key={other.id}
                  href={`/artistas/${other.id}`}
                  className="group block relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-white/10"
                >
                  <img src={other.image_url} alt={other.name} className="w-full h-full object-cover filter grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold font-mono text-white truncate group-hover:text-emerald-400 transition-colors">{other.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
