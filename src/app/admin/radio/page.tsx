import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Radio, Trash2, Music } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { RadioUploadForm } from './RadioUploadForm'

export default async function AdminRadioPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'ADMIN') redirect('/perfil')

  const { data: tracks } = await supabase
    .from('audio_tracks')
    .select('*')
    .order('created_at', { ascending: false })

  async function deleteTrack(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    
    const supabase = await createClient()

    await supabase.from('audio_tracks').delete().eq('id', id)
    revalidatePath('/admin/radio')
    revalidatePath('/')
  }

  return (
    <div className="p-4 sm:p-8 text-white">
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        <div className="flex items-center gap-3 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,255,128,0.05)]">
          <Radio className="w-8 h-8 text-emerald-500" />
          <div>
            <h1 className="text-3xl font-bold font-mono tracking-tighter text-white uppercase">Aeternum Radio</h1>
            <p className="text-zinc-400 font-mono text-sm">Sube sets de audio MP3 para la barra de radio interactiva</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <RadioUploadForm />
          </div>

          <div className="lg:col-span-2 space-y-4">
            {tracks?.map((track) => (
              <div key={track.id} className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-5 rounded-xl flex items-center justify-between gap-4 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shrink-0 border border-white/10 shadow-[0_0_15px_rgba(0,255,128,0.1)]">
                    <Music className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold font-mono text-base uppercase truncate text-white">{track.title}</h3>
                    <p className="text-xs text-zinc-400 font-mono mt-1 truncate">{track.dj} · {track.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 shrink-0 border-l border-white/10 pl-4">
                  <div className="text-xs text-zinc-500 font-mono max-w-[150px] truncate hidden md:block">
                    {track.audio_url}
                  </div>
                  <form action={deleteTrack}>
                    <input type="hidden" name="id" value={track.id} />
                    <button type="submit" className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors border border-red-500/20" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            ))}
            
            {tracks?.length === 0 && (
              <div className="text-center p-8 border border-white/10 border-dashed rounded-xl text-zinc-500 font-mono">
                No hay sets de audio subidos.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
