'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'

export function EventForm({ createEventAction }: { createEventAction: (formData: FormData) => Promise<void> }) {
  const [loading, setLoading] = useState(false)
  const [flyerUrl, setFlyerUrl] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSubmitError(null)

    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    if (flyerUrl) {
      formData.set('flyerUrl', flyerUrl)
    }

    try {
      await createEventAction(formData)
      // Reset form
      formElement.reset()
      setFlyerUrl(null)
    } catch (err: any) {
      console.error(err)
      setSubmitError(err.message || "Error al crear el evento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.02)]">
      <h2 className="text-xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        Crear Nuevo Evento
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* General Info Section */}
        <div className="space-y-6 bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
          <h3 className="text-emerald-400 font-bold font-mono uppercase text-base mb-6 flex items-center gap-3">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
            Datos Generales
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-zinc-400 uppercase font-mono block mb-2">Título</label>
              <input required type="text" name="title" className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="EJ: AETERNUM 005" />
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-zinc-400 uppercase font-mono block mb-2">Fecha</label>
                <input required type="datetime-local" name="date" className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono [color-scheme:dark]" />
              </div>
              <div>
                <label className="text-sm text-zinc-400 uppercase font-mono block mb-2">Capacidad</label>
                <input required type="number" name="capacity" className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="300" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="space-y-6">
              <div>
                <label className="text-sm text-zinc-400 uppercase font-mono block mb-2">Ubicación</label>
                <input type="text" name="location" className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="Medellín, Colombia" />
              </div>
              <div>
                <label className="text-sm text-zinc-400 uppercase font-mono block mb-2">Flyer Oficial</label>
                <CloudinaryUpload 
                  onUploadSuccess={(url) => setFlyerUrl(url)}
                  label={flyerUrl ? 'Flyer Subido Exitosamente' : 'Subir flyer del evento'}
                />
              </div>
            </div>

            <div className="flex flex-col h-full">
              <label className="text-sm text-zinc-400 uppercase font-mono block mb-2">Descripción del Evento</label>
              <textarea name="description" className="w-full h-[142px] bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white custom-scrollbar resize-none font-mono" placeholder="Ingresa los detalles del evento..." />
            </div>
          </div>
        </div>

        {/* Pricing Info Section */}
        <div className="space-y-6 bg-white/[0.02] border border-white/5 p-8 rounded-2xl">
          <h3 className="text-emerald-400 font-bold font-mono uppercase text-base mb-6 flex items-center gap-3">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
            Configuración de Precios
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-5 bg-black/30 rounded-2xl border border-white/5 space-y-5 h-full">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-zinc-400 uppercase font-mono block mb-2">Precio Early (COP)</label>
                  <input required type="number" name="early_price" className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="40000" />
                </div>
                <div>
                  <label className="text-sm text-emerald-500 uppercase font-mono block mb-2">Early Puerta (COP)</label>
                  <input required type="number" name="early_puerta_price" className="w-full bg-black/50 border border-emerald-500/30 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="50000" />
                </div>
              </div>
              <div>
                <label className="text-sm text-zinc-400 uppercase font-mono block mb-2">Límite Hora Early (Opcional)</label>
                <input type="text" name="early_time" className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="Ej. Antes de la 1:00 AM" />
              </div>
            </div>

            <div className="p-5 bg-black/30 rounded-2xl border border-white/5 space-y-5 h-full">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-zinc-400 uppercase font-mono block mb-2">Precio Anytime (COP)</label>
                  <input required type="number" name="anytime_price" className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="60000" />
                </div>
                <div>
                  <label className="text-sm text-emerald-500 uppercase font-mono block mb-2">Anytime Puerta (COP)</label>
                  <input required type="number" name="anytime_puerta_price" className="w-full bg-black/50 border border-emerald-500/30 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="70000" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 mt-6 flex justify-end items-center">
          <div className="w-full md:w-auto">
            {submitError && (
              <div className="mb-3 text-red-400 text-xs font-mono bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                ⚠️ Error: {submitError}
              </div>
            )}
            <button type="submit" disabled={loading} className="w-full md:w-auto px-8 h-12 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 font-bold font-mono uppercase rounded-xl transition-all flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publicar Evento Oficial'}
            </button>
          </div>
          </div>
      </form>
    </div>
  )
}
