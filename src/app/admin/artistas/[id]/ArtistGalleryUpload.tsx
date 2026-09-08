"use client";

import { useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { addArtistGalleryImage } from "../actions";

export function ArtistGalleryUpload({ artistId }: { artistId: string }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      
      if (data.secure_url) {
        const type = data.resource_type === 'video' ? 'video' : 'image';
        await addArtistGalleryImage(artistId, data.secure_url, type);
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      alert("Hubo un error subiendo el archivo. Revisa la consola.");
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl p-8 bg-zinc-950/50 hover:bg-zinc-950 transition-colors">
      <UploadCloud className="w-8 h-8 text-zinc-500 mb-4" />
      <label className="cursor-pointer">
        <span className={`flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs font-bold transition-colors ${
          isUploading 
            ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed' 
            : 'bg-emerald-500 text-black hover:bg-emerald-400'
        }`}>
          {isUploading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Subiendo...</>
          ) : (
            "Subir Foto o Video"
          )}
        </span>
        <input 
          type="file" 
          accept="image/*,video/*" 
          className="hidden" 
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </label>
      <p className="mt-4 text-xs text-zinc-500 font-mono text-center">
        Se mostrarán exclusivamente en la página de este artista.
      </p>
    </div>
  );
}
