import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Calendar, DollarSign, Ticket, Users, ArrowUpRight, QrCode } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

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

  // 2. Fetch All Events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })

  // 3. Fetch All Tickets to calculate stats per event
  const { data: allTickets } = await supabase
    .from('tickets')
    .select('id, event_id, status, ticket_type')
    
  const tickets = allTickets || []

  // Global Stats
  const globalPending = tickets.filter(t => t.status === 'PENDING').length
  const globalApproved = tickets.filter(t => t.status === 'APPROVED').length
  const globalUsed = tickets.filter(t => t.status === 'USED').length
  
  return (
    <div className="p-4 sm:p-8 relative z-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Admin */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,255,128,0.05)]">
          <div>
            <h1 className="text-3xl font-bold font-mono tracking-tighter flex items-center gap-3 text-white uppercase">
              Panel Administrativo
            </h1>
            <p className="text-zinc-400 mt-1 font-mono text-sm">Resumen financiero y gestión por evento</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/scanner" className="px-5 py-2.5 bg-purple-600 text-white font-mono font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-purple-500 transition-colors flex items-center gap-2">
              <QrCode className="w-4 h-4" /> Escáner QR
            </Link>
            <Link href="/admin/finanzas" className="px-5 py-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-emerald-500/20 transition-colors">
              Finanzas Globales
            </Link>
            <Link href="/admin/eventos" className="px-5 py-2.5 bg-white text-black font-mono font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-colors">
              Crear Evento Nuevo
            </Link>
          </div>
        </div>

        {/* Global Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Pagos', value: tickets.length, color: 'text-white' },
            { label: 'Pendientes (Global)', value: globalPending, color: 'text-yellow-400' },
            { label: 'Aprobados (Global)', value: globalApproved, color: 'text-emerald-400' },
            { label: 'Han Ingresado (Global)', value: globalUsed, color: 'text-purple-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0a0a0a]/90 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
              <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider">{stat.label}</p>
              <p className={`text-3xl font-bold font-mono mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Eventos y Finanzas */}
        <div>
          <h2 className="text-2xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-500" />
            Gestion por Eventos
          </h2>

          {!events || events.length === 0 ? (
            <div className="text-center p-12 border border-white/10 border-dashed rounded-2xl bg-white/[0.02]">
              <p className="text-zinc-500 font-mono">No hay eventos creados todavía.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {events.map((event) => {
                const eventTickets = tickets.filter(t => t.event_id === event.id)
                const pendingCount = eventTickets.filter(t => t.status === 'PENDING').length
                
                // Calculate income properly based on ticket type
                const approvedTickets = eventTickets.filter(t => t.status === 'APPROVED' || t.status === 'USED')
                const approvedCount = approvedTickets.length
                const income = approvedTickets.reduce((acc, t) => {
                  return acc + (t.ticket_type === 'EARLY' ? event.early_price : event.anytime_price);
                }, 0)
                
                const dateFormatted = new Date(event.date).toLocaleDateString('es-CO', { month: 'short', day: 'numeric', year: 'numeric' })
                
                return (
                  <div key={event.id} className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.02)] flex flex-col relative group">
                    <div className="p-6 border-b border-white/10 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold font-mono uppercase text-emerald-400 mb-1">{event.title}</h3>
                          <p className="text-zinc-400 font-mono text-sm capitalize">{dateFormatted}</p>
                        </div>
                        {pendingCount > 0 && (
                          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-bold font-mono uppercase rounded-full animate-pulse">
                            {pendingCount} Pendientes
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                          <div className="flex items-center gap-2 text-zinc-500 mb-2">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-xs font-mono uppercase">Ingresos</span>
                          </div>
                          <p className="text-2xl font-bold font-mono text-white">${income.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                          <div className="flex items-center gap-2 text-zinc-500 mb-2">
                            <Ticket className="w-4 h-4" />
                            <span className="text-xs font-mono uppercase">Vendidas</span>
                          </div>
                          <p className="text-2xl font-bold font-mono text-white">
                            {approvedCount} <span className="text-zinc-600 text-sm">/ {event.total_tickets}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/[0.02] flex justify-end">
                      <Link 
                        href={`/admin/event/${event.id}`}
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-mono text-sm font-bold uppercase transition-colors"
                      >
                        Gestionar Pagos <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
