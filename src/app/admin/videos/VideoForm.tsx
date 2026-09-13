'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export function VideoForm({ createVideoAction }: { createVideoAction: (formData: FormData) => Promise<void> }) {
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)
    setLoading(true)
    
    const formElement = e.currentTarget
    const formData = new FormData(formElement)

    try {
      await createVideoAction(formData)
      formElement.reset()
    } catch (err: any) {
      console.error(err)
      setSubmitError(err.message || 'Error al publicar el video')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_0_40px_rgba(255,0,0,0.02)]">
      <h2 className="text-xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        Agregar Nuevo Video
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Título del Set</label>
              <input required type="text" name="title" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono" placeholder="AETERNUM 001" />
            </div>
            
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Locación</label>
              <input required type="text" name="location" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono" placeholder="Medellín, Colombia" />
            </div>
            
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Link de YouTube</label>
              <input required type="url" name="youtube_url" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono" placeholder="https://youtube.com/watch?v=..." />
              <p className="text-[10px] text-zinc-500 font-mono mt-1">* La miniatura (portada) se extraerá automáticamente del video.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">DJ</label>
                <input required type="text" name="dj" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono" placeholder="Nombre del DJ" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Duración</label>
                <input required type="text" name="duration" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono" placeholder="1:30:00" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Categoría</label>
                <select required name="category" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono">
                  <option value="CAPITULOS">CAPITULOS</option>
                  <option value="BOSQUE">SESIONES EN EL BOSQUE</option>
                  <option value="LIVE_SETS">LIVE SETS</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Volumen</label>
                <input type="number" name="chapter_number" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono" placeholder="Opcional" />
              </div>
            </div>
            
            </div>
          </div>

        </div>

        {/* Botón de Publicar */}
        <div className="pt-6 border-t border-white/10 flex flex-col">
          {submitError && (
            <div className="mb-4 text-red-400 text-xs font-mono bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">
              ⚠️ Error: {submitError}
            </div>
          )}
          <button type="submit" disabled={loading} className="w-full h-14 bg-red-500 hover:bg-red-400 text-black font-black font-mono uppercase rounded-xl transition-all flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin text-black" /> : 'Publicar Video'}
          </button>
        </div>
      </form>
    </div>
  )
}
