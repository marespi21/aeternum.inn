import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Camera, Plus, Trash2, Image as ImageIcon, Video } from "lucide-react";
import { GalleryUploadForm } from "./GalleryUploadForm";
import { GalleryGrid } from "./GalleryGrid";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const galleryItems = items || [];

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-10">
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="p-3 bg-emerald-500/10 rounded-xl">
          <Camera className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-3xl font-black font-mono uppercase tracking-tight text-white mb-2">
            GESTION DE GALERIA
          </h1>
          <p className="text-zinc-400 font-sans mt-1">
            Sube fotos o videos directamente desde tu computadora.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1">
          <GalleryUploadForm />
        </div>

        {/* Current Items */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl space-y-6 min-h-[400px]">
            <h2 className="text-xl font-bold font-mono text-white flex items-center justify-between">
              <span>Archivos Actuales</span>
              <span className="text-sm font-normal text-zinc-500">{galleryItems.length} elementos</span>
            </h2>

            <GalleryGrid initialItems={galleryItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
