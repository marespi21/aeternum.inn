import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2, Camera } from "lucide-react";
import Link from "next/link";
import { ArtistGalleryUpload } from "./ArtistGalleryUpload";
import { deleteArtistGalleryImage } from "../actions";

export default async function EditArtistPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const [{ data: artist }, { data: gallery }] = await Promise.all([
    supabase.from("artists").select("*").eq("id", params.id).single(),
    supabase.from("artist_gallery").select("*").eq("artist_id", params.id).order("created_at", { ascending: false }),
  ]);

  if (!artist) {
    notFound();
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <Link
          href="/admin/artistas"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Artistas</span>
        </Link>
        <h1 className="text-3xl font-black font-mono uppercase tracking-tight text-white mb-2">
          {artist.name}
        </h1>
        <p className="text-zinc-400 font-sans text-sm">
          Sube fotos o videos exclusivos del set de este DJ para su galería independiente.
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Camera className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold font-mono text-white uppercase">Galería del Evento</h2>
        </div>
        
        <ArtistGalleryUpload artistId={artist.id} />

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
          {(!gallery || gallery.length === 0) ? (
            <div className="col-span-full py-12 text-center border border-dashed border-white/20 rounded-xl bg-zinc-950/50">
              <p className="text-zinc-500 font-mono text-sm">No hay imágenes en la galería de este artista.</p>
            </div>
          ) : (
            gallery.map((item) => (
              <div key={item.id} className="relative group aspect-square rounded-xl overflow-hidden bg-zinc-950 border border-white/10">
                {item.type === 'video' ? (
                  <video src={item.url} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                ) : (
                  <img src={item.url} alt="Gallery item" className="w-full h-full object-cover" />
                )}
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <form action={async () => {
                    "use server";
                    await deleteArtistGalleryImage(item.id, artist.id);
                  }}>
                    <button
                      type="submit"
                      className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-xl"
                      title="Eliminar archivo"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
