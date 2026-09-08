"use client";

import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { addGalleryItem } from "./actions";

export function GalleryUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);
    setUploadProgress(null);

    const formData = new FormData(e.currentTarget);
    const files = formData.getAll("file") as File[];
    const fileType = formData.get("type") as string;

    if (!files || files.length === 0 || files[0].size === 0) {
      setError("Por favor selecciona al menos un archivo.");
      setIsUploading(false);
      return;
    }

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "aeternum_uploads";
      const resourceType = fileType === "video" ? "video" : "image";
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      setUploadProgress(`Subiendo 0 de ${files.length}...`);
      
      let completedCount = 0;

      // Use Promise.all to upload concurrently
      const uploadPromises = files.map(async (file) => {
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", file);
        cloudinaryFormData.append("upload_preset", uploadPreset);

        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: cloudinaryFormData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || "Error al subir a Cloudinary");
        }

        const fileUrl = data.secure_url;

        // Guardar la URL en Supabase usando el Server Action
        const dbFormData = new FormData();
        dbFormData.append("url", fileUrl);
        dbFormData.append("type", fileType);

        const dbResult = await addGalleryItem(dbFormData);

        if (dbResult?.error) {
          throw new Error(dbResult.error);
        }

        completedCount++;
        setUploadProgress(`Subiendo ${completedCount} de ${files.length}...`);
        
        return fileUrl;
      });

      await Promise.all(uploadPromises);

      // Éxito: Limpiar el formulario
      (e.target as HTMLFormElement).reset();
      setUploadProgress(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl space-y-6">
      <h2 className="text-xl font-bold font-mono text-white">Subir Archivo</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-zinc-400">Tipo de archivo</label>
          <select 
            name="type"
            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="image">Imagen</option>
            <option value="video">Video (MP4/GIF)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-zinc-400">Seleccionar Archivo(s)</label>
          <input 
            type="file" 
            name="file" 
            accept="image/*,video/mp4,video/quicktime,image/gif"
            required
            multiple
            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm font-mono text-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-mono file:font-bold file:bg-white file:text-black hover:file:bg-zinc-200"
          />
        </div>

        {error && (
          <p className="text-red-400 text-xs font-mono">{error}</p>
        )}

        <button 
          type="submit"
          disabled={isUploading}
          className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-black font-bold font-mono text-sm uppercase rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              {uploadProgress || 'Subiendo...'}
            </>
          ) : (
            <>
              <UploadCloud className="w-4 h-4" />
              Subir a la Galería
            </>
          )}
        </button>
      </form>
    </div>
  );
}
