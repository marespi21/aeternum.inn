import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { CheckoutForm } from './CheckoutForm'
import { Calendar, MapPin, Loader2 } from 'lucide-react'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'

export default async function CheckoutPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  // 1. Verificar sesión
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    // Si no está logueado, redirigimos a login con un parámetro para que regrese
    redirect(`/login?next=/eventos/${params.id}/pago`)
  }

  // 2. Traer info del evento
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Evento no encontrado</h1>
          <p className="text-zinc-400">El evento que buscas no existe o ya no está disponible.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 pt-24">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20 mb-2">
            PAGO SEGURO
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-mono uppercase tracking-tighter text-white">
            {event.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-sm text-zinc-400 font-mono mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-500" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-500" />
              Medellín (Secret Location)
            </div>
          </div>
        </div>

        <CheckoutForm 
          eventId={event.id} 
          eventTitle={event.title}
          eventPrice={event.price}
        />
        
      </div>
    </div>
  )
}
