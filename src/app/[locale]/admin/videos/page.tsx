import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { MonitorPlay, Trash2, Video } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'
import { VideoForm } from './VideoForm'
import { VideoCard } from './VideoCard'

export default async function AdminVideosPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'ADMIN' && profile?.role !== 'STAFF') redirect('/perfil')

  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  async function createVideo(formData: FormData) {
    'use server'
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No autorizado')
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'ADMIN' && profile?.role !== 'STAFF') throw new Error('No autorizado para crear videos')

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
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No autorizado')
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'ADMIN') throw new Error('Solo los administradores pueden borrar videos')

    await supabase.from('videos').delete().eq('id', id)
    revalidatePath('/admin/videos')
    revalidatePath('/')
  }

  async function updateVideo(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const youtube_url = formData.get('youtube_url') as string
    const supabase = await createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No autorizado')
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'ADMIN' && profile?.role !== 'STAFF') throw new Error('No autorizado para editar videos')
    
    // Robust YouTube ID extraction (same as create)
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

    await supabase.from('videos').update({
      title: formData.get('title'),
      dj: formData.get('dj'),
      duration: formData.get('duration'),
      location: formData.get('location'),
      category: formData.get('category'),
      chapter_number: formData.get('chapter_number') ? Number(formData.get('chapter_number')) : null,
      youtube_url,
      ...(cover_url ? { cover_url } : {}) // Only update cover_url if it successfully parsed a new one
    }).eq('id', id)

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
          {/* Formulario */}
          <VideoForm createVideoAction={createVideo} />

          <div>
            <h2 className="text-2xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
              Videos Publicados
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
              {videos?.map((video) => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  deleteVideoAction={deleteVideo} 
                  updateVideoAction={updateVideo}
                  isAdmin={profile?.role === 'ADMIN'}
                />
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
