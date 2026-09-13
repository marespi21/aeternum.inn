'use client'

import { useState } from 'react'
import { Trash2, Edit2, X, Loader2 } from 'lucide-react'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'

export function EventCard({
  event,
  deleteEventAction,
  updateEventAction
}: {
  event: any,
  deleteEventAction: (formData: FormData) => Promise<void>,
  updateEventAction: (formData: FormData) => Promise<void>
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
        
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Título</label>
              <input required type="text" name="title" defaultValue={event.title} className="w-full bg-black/50 border border-white/10 rounded-xl p-2 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-mono" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Fecha</label>
              {/* Note: The datetime-local input expects YYYY-MM-DDThh:mm format. Let's slice the date string. */}
              <input required type="datetime-local" name="date" defaultValue={new Date(event.date).toISOString().slice(0, 16)} className="w-full bg-black/50 border border-white/10 rounded-xl p-2 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-mono [color-scheme:dark]" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Ubicación</label>
              <input type="text" name="location" defaultValue={event.location || ''} className="w-full bg-black/50 border border-white/10 rounded-xl p-2 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-mono" placeholder="Medellín, Colombia" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Precio Early</label>
              <input required type="number" name="early_price" defaultValue={event.early_price} className="w-full bg-black/50 border border-white/10 rounded-xl p-2 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-mono" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Precio Anytime</label>
              <input required type="number" name="anytime_price" defaultValue={event.anytime_price} className="w-full bg-black/50 border border-white/10 rounded-xl p-2 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-mono" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Capacidad</label>
              <input required type="number" name="capacity" defaultValue={event.total_tickets} className="w-full bg-black/50 border border-white/10 rounded-xl p-2 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-mono" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Flyer</label>
              <CloudinaryUpload 
                onUploadSuccess={(url) => setFlyerUrl(url)}
                label={flyerUrl ? 'Cambiar Flyer' : 'Subir flyer'}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Descripción</label>
              <textarea name="description" defaultValue={event.description || ''} className="w-full h-20 bg-black/50 border border-white/10 rounded-xl p-2 text-sm focus:border-emerald-500 outline-none transition-colors text-white font-mono custom-scrollbar resize-none" />
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
          <span className="bg-white/5 px-2 py-1 rounded text-emerald-400">Anytime: ${(event.anytime_price || 0).toLocaleString()}</span>
          <span className="bg-white/5 px-2 py-1 rounded">Aforo: {event.total_tickets}</span>
        </div>
        {event.description && (
          <p className="text-xs text-zinc-500 font-mono mt-2 line-clamp-2 pr-4">
            {event.description}
          </p>
        )}
      </div>
      
      <div className="flex flex-col gap-2 shrink-0">
        <button onClick={() => setIsEditing(true)} className="p-2.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-500 rounded-lg transition-colors" title="Editar Evento">
          <Edit2 className="w-4 h-4" />
        </button>
        <form action={deleteEventAction}>
          <input type="hidden" name="id" value={event.id} />
          <button type="submit" className="p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-lg transition-colors" title="Eliminar Evento">
            <Trash2 className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
