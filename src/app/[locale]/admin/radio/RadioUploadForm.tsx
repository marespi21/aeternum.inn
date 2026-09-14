'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { createTrack } from './actions'
import { useRef } from 'react'

export function RadioUploadForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError(null)

    try {
      await createTrack(formData)
      formRef.current?.reset()
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Error al subir el set')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl h-fit">
      <h2 className="text-xl font-bold mb-4 font-mono">Subir Set de Audio</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs text-zinc-400 uppercase font-mono">Título del Set</label>
          <input required type="text" name="title" className="w-full bg-black border border-zinc-800 rounded-lg p-2 text-sm mt-1 focus:border-emerald-500 outline-none" placeholder="AETERNUM RADIO VOL.1" />
        </div>
        <div>
          <label className="text-xs text-zinc-400 uppercase font-mono">DJ</label>
          <input required type="text" name="dj" className="w-full bg-black border border-zinc-800 rounded-lg p-2 text-sm mt-1 focus:border-emerald-500 outline-none" />
        </div>
        <div>
          <label className="text-xs text-zinc-400 uppercase font-mono">Locación (Ej: Secret Forest)</label>
          <input required type="text" name="location" className="w-full bg-black border border-zinc-800 rounded-lg p-2 text-sm mt-1 focus:border-emerald-500 outline-none" />
        </div>
        
        <div className="pt-2">
          <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Enlace (SoundCloud / YouTube)</label>
          <input required type="url" name="audio_url" className="w-full bg-black border border-zinc-800 rounded-lg p-2 text-sm mt-1 focus:border-emerald-500 outline-none" placeholder="https://soundcloud.com/..." />
        </div>
        
        <button type="submit" disabled={loading} className="w-full bg-white hover:bg-zinc-200 text-black font-bold font-mono py-3 rounded-lg transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-50">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</> : 'Guardar y Publicar'}
        </button>
      </form>
    </div>
  )
}
