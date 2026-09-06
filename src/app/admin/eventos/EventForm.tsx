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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Título</label>
              <input required type="text" name="title" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="EJ: AETERNUM 005" />
            </div>
            
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Fecha</label>
              <input required type="datetime-local" name="date" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-mono [color-scheme:dark]" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Precio (COP)</label>
              <input required type="number" name="price" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="60000" />
            </div>
            
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Capacidad</label>
              <input required type="number" name="capacity" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="300" />
            </div>
          </div>

          <div className="lg:row-span-2 flex flex-col h-full">
            <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Descripción del Evento</label>
            <textarea name="description" className="w-full flex-1 bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none transition-colors text-white custom-scrollbar resize-none font-mono" placeholder="Ingresa los detalles del evento..." />
          </div>

          <div className="md:col-span-2 lg:col-span-3 border-t border-white/10 pt-6 mt-2 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-2">Flyer Oficial</label>
              <CloudinaryUpload 
                onUploadSuccess={(url) => setFlyerUrl(url)}
                label={flyerUrl ? 'Flyer Subido Exitosamente' : 'Subir flyer del evento'}
              />
            </div>
            
            <div className="flex flex-col h-full justify-end">
              {submitError && (
                <div className="mb-3 text-red-400 text-xs font-mono bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  ⚠️ Error: {submitError}
                </div>
              )}
              <button type="submit" disabled={loading} className="w-full h-12 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 font-bold font-mono uppercase rounded-xl transition-all flex items-center justify-center gap-2 mt-auto">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publicar Evento Oficial'}
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
