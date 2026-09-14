import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { MonitorPlay, Trash2, Video } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'
import { VideoForm } from './VideoForm'

export default async function AdminVideosPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'ADMIN') redirect('/perfil')

  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  async function createVideo(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const youtube_url = formData.get('youtube_url') as string
    
    // Robust YouTube ID extraction
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let youtubeId = ''
    const match = youtube_url.match(regExp);
    if (match && match[2].length === 11) {
      youtubeId = match[2];
    } else {
      const backupMatch = youtube_url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
      youtubeId = backupMatch ? backupMatch[1] : '';
    }
    const cover_url = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : ''

    await supabase.from('videos').insert({
      title: formData.get('title'),
      dj: formData.get('dj'),
      duration: formData.get('duration'),
      location: formData.get('location'),
      category: formData.get('category'),
      chapter_number: formData.get('chapter_number') ? Number(formData.get('chapter_number')) : null,
      youtube_url,
      cover_url
    })

    revalidatePath('/admin/videos')
    revalidatePath('/')
  }

  async function deleteVideo(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const supabase = await createClient()
    await supabase.from('videos').delete().eq('id', id)
    revalidatePath('/admin/videos')
    revalidatePath('/')
  }

  return (
    <div className="p-4 sm:p-8 text-white">
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        <div className="flex items-center gap-3 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,255,128,0.05)]">
          <MonitorPlay className="w-8 h-8 text-red-500" />
          <div>
            <h1 className="text-3xl font-bold font-mono tracking-tighter text-white uppercase">Videos</h1>
            <p className="text-zinc-400 font-mono text-sm">Gestiona los Live Sets y Capítulos de YouTube</p>
          </div>
        </div>

        <div className="space-y-12">
          
          <VideoForm createVideoAction={createVideo} />

          <div>
            <h2 className="text-2xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
              Videos Publicados
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
              {videos?.map((video) => (
                <div key={video.id} className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.02)] flex flex-col">
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
                      <a href={video.youtube_url} target="_blank" rel="noreferrer" className="text-red-400 hover:text-red-300 flex items-center gap-1 text-xs font-mono">
                        <MonitorPlay className="w-3 h-3" /> Ver
                      </a>
                      <form action={deleteVideo}>
                        <input type="hidden" name="id" value={video.id} />
                        <button type="submit" className="text-red-600 hover:text-red-500 transition-colors p-2 bg-red-500/10 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
              
              {videos?.length === 0 && (
                <div className="col-span-full text-center p-12 border border-white/10 border-dashed rounded-xl text-zinc-500 bg-white/[0.02] font-mono">
                  No hay videos subidos todavía.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
