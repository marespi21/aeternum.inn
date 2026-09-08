"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { addArtist } from "../actions";

export function ArtistForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      
      if (data.secure_url) {
        setImageUrl(data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      alert("Hubo un error subiendo la imagen. Revisa la consola.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      alert("Debes subir una imagen principal para el artista.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("image_url", imageUrl);
    
    try {
      await addArtist(formData);
      router.push("/admin/artistas");
    } catch (error: any) {
      console.error(error);
      alert("Error al guardar artista: " + error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
        
        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Nombre del DJ</label>
          <input 
            type="text" 
            name="name" 
            required
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
            placeholder="Ej. OGUZ"
          />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Biografía / Descripción (Opcional)</label>
          <textarea 
            name="bio" 
            rows={4}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-sans text-sm"
            placeholder="Escribe algo sobre el artista..."
          />
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">YouTube URL</label>
            <input 
              type="url" 
              name="youtube_url" 
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono text-sm"
              placeholder="https://youtube.com/..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">SoundCloud URL</label>
            <input 
              type="url" 
              name="soundcloud_url" 
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono text-sm"
              placeholder="https://soundcloud.com/..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Instagram URL</label>
            <input 
              type="url" 
              name="instagram_url" 
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono text-sm"
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
        <h3 className="text-lg font-mono font-bold text-white uppercase">Foto Principal</h3>
        
        {imageUrl ? (
          <div className="relative aspect-video w-full max-w-lg rounded-xl overflow-hidden border border-white/10">
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            <button 
              type="button" 
              onClick={() => setImageUrl("")}
              className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded text-xs font-bold"
            >
              Cambiar
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl p-12 bg-zinc-950/50">
            <UploadCloud className="w-8 h-8 text-zinc-500 mb-4" />
            <label className="cursor-pointer">
              <span className="px-6 py-3 rounded-full bg-zinc-800 text-white font-mono text-xs font-bold hover:bg-zinc-700 transition-colors">
                {isUploading ? "Subiendo..." : "Seleccionar Foto"}
              </span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </label>
            <p className="mt-4 text-xs text-zinc-500 font-mono">Alta resolución. JPG o PNG.</p>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Link
          href="/admin/artistas"
          className="px-6 py-3 rounded-xl bg-zinc-800 text-white font-mono text-sm font-bold hover:bg-zinc-700 transition-colors"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={isSubmitting || isUploading || !imageUrl}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-500 text-black font-mono text-sm font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Guardar Artista</span>
        </button>
      </div>
    </form>
  );
}
