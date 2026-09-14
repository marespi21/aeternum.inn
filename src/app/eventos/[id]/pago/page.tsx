import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { CheckoutForm } from './CheckoutForm'
import { Calendar, MapPin, Loader2 } from 'lucide-react'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params

  // 1. Verificar sesión (Opcional)
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Traer info del evento
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
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
        
        {event.flyer_url && (
          <div className="w-full max-w-md mx-auto mb-8 relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,255,128,0.1)]">
            <img src={event.flyer_url} alt={`Flyer de ${event.title}`} className="w-full h-auto object-cover" />
          </div>
        )}

        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20 mb-2">
            PAGO SEGURO
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-mono uppercase tracking-tighter text-white">
            {event.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-sm text-zinc-400 font-mono mt-4 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-zinc-500" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-500" />
              {event.location || 'Ubicación por definir'}
            </div>
          </div>

          {event.description && (
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-white/5 border border-white/10 rounded-xl text-left">
              <h3 className="text-emerald-400 font-mono uppercase tracking-wider text-sm font-bold mb-3">Sobre el Evento</h3>
              <p className="text-zinc-300 whitespace-pre-wrap text-sm leading-relaxed">
                {event.description}
              </p>
            </div>
          )}
        </div>

        <CheckoutForm 
          eventId={event.id} 
          eventTitle={event.title}
          earlyPrice={event.early_price}
          earlyTime={event.early_time || ''}
          anytimePrice={event.anytime_price}
          userEmail={user?.email || ''}
          userMetadata={user?.user_metadata || {}}
        />
        
      </div>
    </div>
  )
}
