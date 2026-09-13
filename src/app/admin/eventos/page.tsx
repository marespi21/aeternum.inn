import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Calendar, Trash2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { EventForm } from './EventForm'
import { EventCard } from './EventCard'

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
    const early_price = formData.get('early_price') as string
    const anytime_price = formData.get('anytime_price') as string
    const capacity = formData.get('capacity') as string
    const flyerUrl = formData.get('flyerUrl') as string
    const description = formData.get('description') as string
    const location = formData.get('location') as string

    const { error } = await supabase.from('events').insert({
      title,
      date: new Date(date).toISOString(),
      location: location || null,
      early_price: Number(early_price),
      anytime_price: Number(anytime_price),
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

  async function updateEvent(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const early_price = formData.get('early_price') as string
    const anytime_price = formData.get('anytime_price') as string
    const capacity = formData.get('capacity') as string
    const flyerUrl = formData.get('flyerUrl') as string
    const description = formData.get('description') as string
    const location = formData.get('location') as string

    const supabase = await createClient()
    const { error } = await supabase.from('events').update({
      title,
      date: new Date(date).toISOString(),
      location: location || null,
      early_price: Number(early_price),
      anytime_price: Number(anytime_price),
      total_tickets: Number(capacity),
      flyer_url: flyerUrl || null,
      description: description || null
    }).eq('id', id)

    if (error) throw new Error(error.message)
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
                <EventCard 
                  key={event.id} 
                  event={event} 
                  deleteEventAction={deleteEvent} 
                  updateEventAction={updateEvent} 
                />
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
