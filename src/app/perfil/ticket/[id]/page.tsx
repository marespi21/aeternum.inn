import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Ticket as TicketIcon } from 'lucide-react'
import { TicketQRCode } from '@/components/ui/TicketQRCode'

export default async function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params

  // 1. Verificar sesión
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Traer ticket
  const { data: ticket, error } = await supabase
    .from('tickets')
    .select('*, events(*)')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4 font-mono uppercase">Ticket no encontrado</h1>
        <Link href="/perfil" className="text-zinc-400 hover:text-white font-mono underline">Volver a tu perfil</Link>
      </div>
    )
  }

  if (ticket.status !== 'APPROVED') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-yellow-500 mb-2 font-mono uppercase">Ticket en revisión</h1>
        <p className="text-zinc-400 mb-6 font-mono text-center">Tu ticket debe ser aprobado para generar el código QR.</p>
        <Link href="/perfil" className="text-zinc-400 hover:text-white font-mono underline">Volver a tu perfil</Link>
      </div>
    )
  }

  const formattedDate = new Date(ticket.events.date).toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f5] pt-24 px-4 sm:px-8">
      <div className="max-w-md mx-auto relative z-10">
        
        <Link href="/perfil" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-sm uppercase mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>

        <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,255,128,0.1)]">
          {/* Header Ticket */}
          <div className="p-8 text-center border-b border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest font-bold mb-4">
              <TicketIcon className="w-4 h-4" />
              Ticket Oficial
            </div>
            <h1 className="text-3xl font-black font-mono uppercase tracking-tighter text-white mb-2">
              {ticket.events.title}
            </h1>
            <p className="text-zinc-400 font-mono text-sm capitalize">{formattedDate}</p>
          </div>

          {/* QR Code Section */}
          <div className="p-10 flex flex-col items-center justify-center relative bg-black/40">
            {/* Notch decoration */}
            <div className="absolute top-[-10px] left-[-10px] w-5 h-5 rounded-full bg-[#050505] border-r border-b border-white/10" />
            <div className="absolute top-[-10px] right-[-10px] w-5 h-5 rounded-full bg-[#050505] border-l border-b border-white/10" />
            
            <TicketQRCode ticketId={ticket.id} />
            
            <p className="text-xs text-zinc-500 font-mono tracking-widest mt-6">ID: {ticket.id}</p>
          </div>

          {/* Footer Info */}
          <div className="p-6 bg-white/[0.02] border-t border-white/10 relative">
            <div className="absolute bottom-[-10px] left-[-10px] w-5 h-5 rounded-full bg-[#050505] border-r border-t border-white/10" />
            <div className="absolute bottom-[-10px] right-[-10px] w-5 h-5 rounded-full bg-[#050505] border-l border-t border-white/10" />
            
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between items-center text-zinc-400">
                <span>Locación:</span>
                <span className="text-white font-bold">Secret Location</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Titular:</span>
                <span className="text-white font-bold">{user.email}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Tipo de Entrada:</span>
                <span className="text-emerald-400 font-bold">{ticket.ticket_type === 'EARLY' ? 'EARLY (Antes de la 1AM)' : 'ANYTIME'}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Estado:</span>
                <span className="text-emerald-400 font-bold uppercase">Aprobado</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-zinc-500 font-mono text-xs mt-8">
          Presenta este código desde tu celular al llegar al evento. Intransferible.
        </p>

      </div>
    </div>
  )
}
