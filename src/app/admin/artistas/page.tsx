import { createClient } from "@/utils/supabase/server";
import { Plus, Trash2, Edit, PlaySquare, Camera, Headphones } from "lucide-react";
import Link from "next/link";
import { deleteArtist } from "./actions";

export default async function AdminArtistasPage() {
  const supabase = await createClient();
  const { data: artists } = await supabase
    .from("artists")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-mono uppercase tracking-tight text-white mb-2">
            GESTION DE ARTISTAS
          </h1>
          <p className="text-zinc-400 font-sans text-sm">
            Añade DJs, edita su información y administra su galería exclusiva.
          </p>
        </div>
        
        <Link
          href="/admin/artistas/nuevo"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono text-sm font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors rounded-xl"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Artista</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(!artists || artists.length === 0) ? (
          <div className="col-span-full py-12 text-center bg-zinc-900/50 border border-white/5 rounded-2xl">
            <p className="text-zinc-500 font-mono text-sm">No hay artistas registrados aún.</p>
          </div>
        ) : (
          artists.map((artist) => (
            <div key={artist.id} className="group relative bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img 
                  src={artist.image_url} 
                  alt={artist.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold font-mono text-white truncate">
                  {artist.name}
                </h3>
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4 text-zinc-400">
                  {artist.youtube_url && <PlaySquare className="w-4 h-4 hover:text-red-500 transition-colors" />}
                  {artist.soundcloud_url && <Headphones className="w-4 h-4 hover:text-orange-500 transition-colors" />}
                  {artist.instagram_url && <Camera className="w-4 h-4 hover:text-pink-500 transition-colors" />}
                </div>

                <div className="mt-auto pt-4 border-t border-white/10 flex justify-between gap-3">
                  <Link
                    href={`/admin/artistas/${artist.id}`}
                    className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-mono font-bold hover:bg-emerald-500/20 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Editar y Galería</span>
                  </Link>

                  <form action={async () => {
                    "use server";
                    await deleteArtist(artist.id);
                  }}>
                    <button
                      type="submit"
                      className="flex items-center justify-center w-10 h-10 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
                      title="Eliminar Artista"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
