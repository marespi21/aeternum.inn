import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ShieldAlert, Check, X, QrCode, Ticket, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { approveTicket, rejectTicket, createManualTicket } from '@/app/admin/actions'
import { ExportExcelButton } from '@/components/admin/ExportExcelButton'

export default async function AdminEventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  const { id } = await params

  // 1. Verify session and role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'ADMIN') {
    redirect('/perfil')
  }

  // 2. Fetch Event Details
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()
    
  if (eventError || !event) {
    return (
      <div className="p-8 text-white text-center">
        <h1 className="text-2xl font-bold font-mono text-red-500">Evento no encontrado</h1>
        <Link href="/admin" className="text-zinc-400 hover:text-white font-mono mt-4 inline-block underline">Volver al panel</Link>
      </div>
    )
  }

  // 3. Fetch Tickets for THIS event
  const { data: tickets } = await supabase
    .from('tickets')
    .select('*, profiles(email, phone, full_name)')
    .eq('event_id', id)
    .order('created_at', { ascending: false })

  // 4. Fetch the active prices for the tickets based on event price
  const formattedDate = new Date(event.date).toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  // Separate tickets
  const pendingTickets = tickets?.filter(t => t.status === 'PENDING') || []
  const historicalTickets = tickets?.filter(t => t.status !== 'PENDING') || []

  return (
    <div className="p-4 sm:p-8 relative z-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,255,128,0.05)]">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-sm uppercase mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Volver a Panel
            </Link>
            <h1 className="text-3xl font-bold font-mono tracking-tighter text-emerald-400 uppercase">
              {event.title}
            </h1>
            <p className="text-zinc-400 mt-1 font-mono text-sm capitalize">{formattedDate} · Early: ${event.early_price?.toLocaleString()} / Anytime: ${event.anytime_price?.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/scanner" className="px-5 py-2.5 bg-purple-600 text-white font-mono font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-purple-500 transition-colors flex items-center gap-2">
              <QrCode className="w-4 h-4" /> Escáner
            </Link>
            <Link href={`/admin/event/${id}/finanzas`} className="px-5 py-2.5 bg-zinc-900 border border-white/10 text-white font-mono font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-zinc-800 transition-colors">
              Reporte Financiero
            </Link>
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-center">
              <p className="text-xs text-zinc-500 font-mono uppercase">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-400 font-mono">{pendingTickets.length}</p>
            </div>
          </div>
        </div>

        {/* Venta Manual */}
        <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-emerald-500/20 p-6 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.05)]">
          <h2 className="text-xl font-bold font-mono uppercase text-emerald-400 mb-4 flex items-center gap-2">
            Registrar Venta Manual
          </h2>
          <p className="text-sm text-zinc-400 mb-6 font-mono">
            Vende una boleta manualmente. El cliente no necesita cuenta; se le generará el código QR y se enviará directamente a su correo.
          </p>
          <form action={createManualTicket} className="grid sm:grid-cols-6 gap-4 items-end">
            <input type="hidden" name="eventId" value={id} />
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Correo del Comprador</label>
              <input type="email" name="guestEmail" required placeholder="correo@ejemplo.com" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Teléfono / WP</label>
              <input type="tel" name="guestPhone" required placeholder="+57 300..." className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Nombre (Opcional)</label>
              <input type="text" name="guestName" placeholder="Nombre completo" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Tipo</label>
              <select name="ticketType" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono appearance-none">
                <option value="EARLY" className="text-black">Early (${event.early_price?.toLocaleString()})</option>
                <option value="ANYTIME" className="text-black">Anytime (${event.anytime_price?.toLocaleString()})</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Pago</label>
              <select name="paymentMethod" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono appearance-none">
                <option value="efectivo" className="text-black">Efectivo</option>
                <option value="transferencia" className="text-black">Transferencia</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono uppercase py-3 rounded-xl transition-colors">
              Generar
            </button>
          </form>
        </div>

        {/* Pendientes de Aprobación */}
        <div>
          <h2 className="text-2xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-yellow-500" />
            Pagos Por Aprobar
          </h2>

          {pendingTickets.length === 0 ? (
            <div className="text-center p-12 border border-white/10 border-dashed rounded-2xl bg-white/[0.02]">
              <p className="text-zinc-500 font-mono">No hay pagos pendientes para este evento.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingTickets.map((ticket: any) => (
                <div key={ticket.id} className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                  
                  {/* Imagen del comprobante */}
                  <div className="relative h-64 bg-black w-full border-b border-white/10">
                    {ticket.receipt_url && !ticket.receipt_url.startsWith('manual_sale:') ? (
                      <Image 
                        src={ticket.receipt_url} 
                        alt="Comprobante de pago" 
                        fill 
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-sm">
                        {ticket.receipt_url?.startsWith('manual_sale:') ? 'Venta Manual' : 'Sin imagen'}
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-zinc-500 mb-1 font-mono uppercase">Usuario</p>
                      <p className="font-semibold mb-3 truncate font-mono text-white">
                        {ticket.receipt_url?.startsWith('manual_sale:') 
                          ? ticket.receipt_url.split(':')[1] 
                          : ticket.profiles?.full_name || ticket.profiles?.email}
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-white/10 rounded text-xs font-mono font-bold text-white">
                          {ticket.ticket_type || 'ANYTIME'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <form action={rejectTicket} className="flex-1">
                        <input type="hidden" name="ticketId" value={ticket.id} />
                        <input type="hidden" name="eventId" value={id} />
                        <button className="w-full bg-red-500/10 border border-red-500/20 text-red-500 font-mono uppercase text-sm py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors font-bold">
                          <X className="w-4 h-4" /> Rechazar
                        </button>
                      </form>
                      <form action={approveTicket} className="flex-1">
                        <input type="hidden" name="ticketId" value={ticket.id} />
                        <input type="hidden" name="eventId" value={id} />
                        <button className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono uppercase text-sm py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-colors font-bold">
                          <Check className="w-4 h-4" /> Aprobar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Historial de Pagos de este Evento */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold font-mono uppercase text-white flex items-center gap-2">
              Historial del Evento
            </h2>
            <ExportExcelButton 
              tickets={tickets || []} 
              eventTitle={event.title} 
              earlyPrice={event.early_price}
              anytimePrice={event.anytime_price}
            />
          </div>
          <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.02)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10 text-xs uppercase font-mono tracking-widest text-zinc-400">
                  <tr>
                    <th className="p-4 font-medium">Usuario / Cliente</th>
                    <th className="p-4 font-medium">Tipo / Valor</th>
                    <th className="p-4 font-medium">Fecha</th>
                    <th className="p-4 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm font-mono">
                  {historicalTickets.map((ticket: any) => {
                    const isManual = ticket.receipt_url?.startsWith('manual_sale:');
                    const email = isManual ? ticket.receipt_url.split(':')[1] : ticket.profiles?.email;
                    const name = isManual ? ticket.receipt_url.split(':')[2] : ticket.profiles?.full_name;
                    const paymentMethod = isManual ? (ticket.receipt_url.split(':')[3] || 'efectivo') : null;
                    const manualPhone = isManual ? ticket.receipt_url.split(':')[4] : null;
                    const phone = isManual ? manualPhone : ticket.profiles?.phone;
                    
                    const ticketPrice = ticket.ticket_type === 'EARLY' ? event.early_price : event.anytime_price;

                    return (
                      <tr key={ticket.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-white flex flex-col">
                            <span>{name ? `${name} (${email})` : email}</span>
                            {isManual ? (
                              <span className="text-xs text-emerald-500 mt-1 capitalize">
                                {paymentMethod} {phone ? `· ${phone}` : ''}
                              </span>
                            ) : (
                              <span className="text-xs text-zinc-500 mt-1">
                                {phone || 'Sin teléfono'}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-white">{ticket.ticket_type || 'ANYTIME'}</span>
                            <span className="text-xs text-zinc-400">${ticketPrice?.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="p-4 text-zinc-500">
                          {new Date(ticket.created_at).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                            ticket.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            ticket.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            ticket.status === 'USED' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                            'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                  {historicalTickets.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-zinc-500">
                        No hay historial para este evento todavía.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
