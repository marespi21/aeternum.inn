import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Calendar, Trash2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { EventForm } from './EventForm'

export default async function AdminEventosPage() {
  const supabase = await createClient()

  // 1. Verificar sesión y ROL
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'ADMIN') redirect('/perfil')

  // 2. Traer todos los eventos
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })

  // 3. Server Actions
  async function createEvent(formData: FormData) {
    'use server'
    const supabase = await createClient()
    
    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const price = formData.get('price') as string
    const capacity = formData.get('capacity') as string
    const flyerUrl = formData.get('flyerUrl') as string
    const description = formData.get('description') as string

    const { error } = await supabase.from('events').insert({
      title,
      date: new Date(date).toISOString(),
      price: Number(price),
      total_tickets: Number(capacity),
      flyer_url: flyerUrl || null,
      description: description || null
    })

    if (error) {
      console.error("Supabase Error:", error)
      throw new Error(error.message)
    }

    revalidatePath('/admin/eventos')
    revalidatePath('/')
  }

  async function deleteEvent(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const supabase = await createClient()
    await supabase.from('events').delete().eq('id', id)
    revalidatePath('/admin/eventos')
    revalidatePath('/')
  }

  return (
    <div className="p-4 sm:p-8 text-white">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="flex items-center gap-3 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,255,128,0.05)]">
          <Calendar className="w-8 h-8 text-emerald-500" />
          <div>
            <h1 className="text-3xl font-bold font-mono tracking-tighter text-white uppercase">Eventos</h1>
            <p className="text-zinc-400 font-mono text-sm">Gestiona los próximos eventos de AETERNUM</p>
          </div>
        </div>

        <div className="space-y-12">
          
          {/* Formulario */}
          <EventForm createEventAction={createEvent} />

          {/* Lista */}
          <div>
            <h2 className="text-2xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
              Eventos Creados
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {events?.map((event) => (
                <div key={event.id} className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-5 rounded-xl flex items-start justify-between shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                  <div className="space-y-2">
                    <h3 className="font-bold font-mono text-lg text-emerald-400 uppercase">{event.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-zinc-400 font-mono">
                      <span className="bg-white/5 px-2 py-1 rounded">{new Date(event.date).toLocaleDateString()}</span>
                      <span className="bg-white/5 px-2 py-1 rounded">${event.price.toLocaleString()}</span>
                      <span className="bg-white/5 px-2 py-1 rounded">Aforo: {event.total_tickets}</span>
                    </div>
                    {event.description && (
                      <p className="text-xs text-zinc-500 font-mono mt-2 line-clamp-2 pr-4">
                        {event.description}
                      </p>
                    )}
                  </div>
                  
                  <form action={deleteEvent} className="shrink-0">
                    <input type="hidden" name="id" value={event.id} />
                    <button type="submit" className="p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-lg transition-colors" title="Eliminar Evento">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              ))}
              
              {events?.length === 0 && (
                <div className="col-span-2 text-center p-12 border border-white/10 border-dashed rounded-xl text-zinc-500 bg-white/[0.02] font-mono">
                  No hay eventos creados todavía.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
