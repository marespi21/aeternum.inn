'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Video, MonitorPlay, Trash2, Edit2, X, Loader2, Save } from 'lucide-react'

export function VideoCard({ 
  video, 
  deleteVideoAction, 
  updateVideoAction,
  isAdmin = false
}: { 
  video: any, 
  deleteVideoAction: (formData: FormData) => Promise<void>,
  updateVideoAction: (formData: FormData) => Promise<void>,
  isAdmin?: boolean
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    formData.append('id', video.id)

    try {
      await updateVideoAction(formData)
      setIsEditing(false)
    } catch (err: any) {
      console.error(err)
      setSubmitError(err.message || 'Error al actualizar el video')
    } finally {
      setLoading(false)
    }
  }

  if (isEditing) {
    return (
      <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-red-500/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.05)] p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
          <h3 className="font-bold font-mono text-base text-red-400 uppercase flex items-center gap-2">
            <Edit2 className="w-4 h-4" />
            Editar Video
          </h3>
          <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Título del Set</label>
              <input required type="text" name="title" defaultValue={video.title} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-zinc-400 uppercase font-mono block mb-1">DJ</label>
                <input required type="text" name="dj" defaultValue={video.dj} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono" />
              </div>
              <div>
                <label className="text-[10px] text-zinc-400 uppercase font-mono block mb-1">Locación</label>
                <input required type="text" name="location" defaultValue={video.location} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono" />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 uppercase font-mono block mb-1">Link de YouTube</label>
              <input required type="url" name="youtube_url" defaultValue={video.youtube_url} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono" />
              <p className="text-[10px] text-zinc-500 font-mono mt-1">* Se actualizará la portada automáticamente si lo cambias.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="text-[10px] text-zinc-400 uppercase font-mono block mb-1">Duración</label>
                <input required type="text" name="duration" defaultValue={video.duration} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono" />
              </div>
              <div className="col-span-1">
                <label className="text-[10px] text-zinc-400 uppercase font-mono block mb-1">Categoría</label>
                <select required name="category" defaultValue={video.category} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono">
                  <option value="CAPITULOS">CAPITULOS</option>
                  <option value="BOSQUE">BOSQUE</option>
                  <option value="LIVE_SETS">LIVE SETS</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="text-[10px] text-zinc-400 uppercase font-mono block mb-1">Volumen</label>
                <input type="number" name="chapter_number" defaultValue={video.chapter_number || ''} className="w-full bg-black/50 border border-white/10 rounded-xl p-2.5 text-sm focus:border-red-500 outline-none transition-colors text-white font-mono" />
              </div>
            </div>
          </div>

          {submitError && (
            <div className="text-red-400 text-xs font-mono bg-red-500/10 p-2 rounded border border-red-500/20 text-center">
              {submitError}
            </div>
          )}

          <div className="pt-2 border-t border-white/10 mt-4">
            <button type="submit" disabled={loading} className="w-full bg-red-500 hover:bg-red-400 text-black font-bold font-mono uppercase py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.02)] flex flex-col">
      <div className="relative aspect-video w-full">
        <Image 
          src={video.cover_url}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded-md text-xs font-mono font-bold text-white flex items-center gap-1">
          <Video className="w-3 h-3 text-red-500" />
          {video.duration}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col justify-between items-start w-full">
        <div className="w-full">
          <h3 className="font-bold font-mono text-base line-clamp-1 text-white uppercase">{video.title}</h3>
          <p className="text-xs text-zinc-400 font-mono mt-1">{video.dj} · {video.location}</p>
          <span className="inline-block mt-2 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-zinc-300">
            {video.category} {video.chapter_number ? `Vol. ${video.chapter_number}` : ''}
          </span>
        </div>
        
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 w-full">
          <a href={video.youtube_url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white flex items-center gap-1 text-xs font-mono transition-colors">
            <MonitorPlay className="w-3 h-3" /> Ver
          </a>
          
          {isAdmin && (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsEditing(true)} 
                className="text-zinc-400 hover:text-white transition-colors p-2 bg-white/5 hover:bg-white/10 rounded-lg"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <form action={deleteVideoAction}>
                <input type="hidden" name="id" value={video.id} />
                <button type="submit" className="text-red-600 hover:text-red-500 transition-colors p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
