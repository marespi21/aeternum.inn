'use client'

import { useState } from 'react'
import { Trash2, Edit2, X, Loader2 } from 'lucide-react'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'

export function EventCard({ 
  event, 
  deleteEventAction, 
  updateEventAction,
  isAdmin = false
}: { 
  event: any, 
  deleteEventAction: (formData: FormData) => Promise<void>,
  updateEventAction: (formData: FormData) => Promise<void>,
  isAdmin?: boolean
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [flyerUrl, setFlyerUrl] = useState<string | null>(event.flyer_url)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSubmitError(null)

    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    formData.set('id', event.id)
    if (flyerUrl) {
      formData.set('flyerUrl', flyerUrl)
    }

    try {
      await updateEventAction(formData)
      setIsEditing(false)
    } catch (err: any) {
      console.error(err)
      setSubmitError(err.message || "Error al actualizar el evento")
    } finally {
      setLoading(false)
    }
  }

  if (isEditing) {
    return (
      <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-5 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.02)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold font-mono text-lg text-emerald-400 uppercase">Editar: {event.title}</h3>
          <button onClick={() => setIsEditing(false)} className="p-1 text-zinc-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          
          {/* General Info Section */}
          <div className="space-y-6 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
            <h4 className="text-emerald-400 font-bold font-mono uppercase text-sm mb-4 flex items-center gap-3">
              <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
              Datos Generales
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-zinc-400 uppercase font-mono block mb-2">Título</label>
                <input required type="text" name="title" defaultValue={event.title} className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-zinc-400 uppercase font-mono block mb-2">Fecha</label>
                  <input required type="datetime-local" name="date" defaultValue={new Date(event.date).toISOString().slice(0, 16)} className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono [color-scheme:dark]" />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 uppercase font-mono block mb-2">Capacidad</label>
                  <input required type="number" name="capacity" defaultValue={event.total_tickets} className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" />
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-zinc-400 uppercase font-mono block mb-2">Ubicación</label>
                  <input type="text" name="location" defaultValue={event.location || ''} className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="Medellín, Colombia" />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 uppercase font-mono block mb-2">Flyer</label>
                  <CloudinaryUpload 
                    onUploadSuccess={(url) => setFlyerUrl(url)}
                    label={flyerUrl ? 'Cambiar Flyer' : 'Subir flyer'}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 uppercase font-mono block mb-2">Descripción</label>
                <textarea name="description" defaultValue={event.description || ''} className="w-full h-[126px] bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono custom-scrollbar resize-none" />
              </div>
            </div>
          </div>

          {/* Pricing Info Section */}
          <div className="space-y-6 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
            <h4 className="text-emerald-400 font-bold font-mono uppercase text-sm mb-4 flex items-center gap-3">
              <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
              Precios
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-black/30 rounded-2xl border border-white/5 space-y-5 h-full">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-zinc-400 uppercase font-mono block mb-2">Early Base (COP)</label>
                    <input required type="number" name="early_price" defaultValue={event.early_price} className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-xs text-emerald-500 uppercase font-mono block mb-2">Early Puerta (COP)</label>
                    <input required type="number" name="early_puerta_price" defaultValue={event.early_puerta_price} className="w-full bg-black/50 border border-emerald-500/30 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 uppercase font-mono block mb-2">Límite Hora Early (Opcional)</label>
                  <input type="text" name="early_time" defaultValue={event.early_time || ''} className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="Ej: Antes 1:00 AM" />
                </div>
              </div>

              <div className="p-5 bg-black/30 rounded-2xl border border-white/5 space-y-5 h-full">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-zinc-400 uppercase font-mono block mb-2">Anytime Base (COP)</label>
                    <input required type="number" name="anytime_price" defaultValue={event.anytime_price} className="w-full bg-black/50 border border-white/10 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" />
                  </div>
                  <div>
                    <label className="text-xs text-emerald-500 uppercase font-mono block mb-2">Anytime Puerta (COP)</label>
                    <input required type="number" name="anytime_puerta_price" defaultValue={event.anytime_puerta_price} className="w-full bg-black/50 border border-emerald-500/30 rounded-xl p-3.5 text-base focus:border-emerald-500 outline-none transition-colors text-white font-mono" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {submitError && (
            <div className="text-red-400 text-xs font-mono bg-red-500/10 p-2 rounded border border-red-500/20">
              ⚠️ Error: {submitError}
            </div>
          )}
          
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 font-bold font-mono uppercase rounded-lg transition-all flex items-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-5 rounded-xl flex items-start justify-between shadow-[0_0_20px_rgba(255,255,255,0.02)]">
      <div className="space-y-2">
        <h3 className="font-bold font-mono text-lg text-emerald-400 uppercase">{event.title}</h3>
        <div className="flex flex-wrap gap-2 text-xs text-zinc-400 font-mono">
          <span className="bg-white/5 px-2 py-1 rounded">{new Date(event.date).toLocaleDateString()}</span>
          <span className="bg-white/5 px-2 py-1 rounded">{event.location || 'Ubicación por definir'}</span>
          <span className="bg-white/5 px-2 py-1 rounded text-emerald-400">Early: ${(event.early_price || 0).toLocaleString()}</span>
          <span className="bg-white/5 px-2 py-1 rounded text-emerald-400">Early Puerta: ${(event.early_puerta_price || 0).toLocaleString()}</span>
          {event.early_time && (
            <span className="bg-white/5 px-2 py-1 rounded text-emerald-400">Hora Early: {event.early_time}</span>
          )}
          <span className="bg-white/5 px-2 py-1 rounded text-emerald-400">Anytime: ${(event.anytime_price || 0).toLocaleString()}</span>
          <span className="bg-white/5 px-2 py-1 rounded text-emerald-400">Anytime Puerta: ${(event.anytime_puerta_price || 0).toLocaleString()}</span>
          <span className="bg-white/5 px-2 py-1 rounded">Aforo: {event.total_tickets}</span>
        </div>
        {event.description && (
          <p className="text-xs text-zinc-500 font-mono mt-2 line-clamp-2 pr-4">
            {event.description}
          </p>
        )}
      </div>
      
      {isAdmin && (
        <div className="flex gap-2">
          <button 
            onClick={() => setIsEditing(true)} 
            className="text-zinc-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10"
            title="Editar Evento"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          
          <form action={deleteEventAction}>
            <input type="hidden" name="id" value={event.id} />
            <button 
              type="submit" 
              className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
              title="Eliminar Evento"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
