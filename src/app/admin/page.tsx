import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { ShieldAlert, Check, X, QrCode, Ticket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // 1. Verificar sesión y ROL
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

  // 2. Traer todos los tickets pendientes (junto con datos de usuario y evento)
  const { data: tickets } = await supabase
    .from('tickets')
    .select('*, profiles(email), events(title)')
    .order('created_at', { ascending: false })

  const pendingTickets = tickets?.filter(t => t.status === 'PENDING') || []
  const approvedTickets = tickets?.filter(t => t.status === 'APPROVED') || []
  const usedTickets = tickets?.filter(t => t.status === 'USED') || []
  const rejectedTickets = tickets?.filter(t => t.status === 'REJECTED') || []

  // 3. Server Actions para aprobar/rechazar
  async function approveTicket(formData: FormData) {
    'use server'
    const ticketId = formData.get('ticketId')
    const supabase = await createClient()
    await supabase.from('tickets').update({ status: 'APPROVED' }).eq('id', ticketId)
    revalidatePath('/admin')
  }

  async function rejectTicket(formData: FormData) {
    'use server'
    const ticketId = formData.get('ticketId')
    const supabase = await createClient()
    await supabase.from('tickets').update({ status: 'REJECTED' }).eq('id', ticketId)
    revalidatePath('/admin')
  }

  return (
    <div className="p-4 sm:p-8 relative z-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Admin */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,255,128,0.05)]">
          <div>
            <h1 className="text-3xl font-bold font-mono tracking-tighter flex items-center gap-3 text-white uppercase">
              Boletas
            </h1>
            <p className="text-zinc-400 mt-1 font-mono text-sm">Revisa y aprueba los pagos manuales</p>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Pagos', value: tickets?.length || 0, color: 'text-white' },
            { label: 'Pendientes', value: pendingTickets.length, color: 'text-yellow-400' },
            { label: 'Aprobados', value: approvedTickets.length, color: 'text-emerald-400' },
            { label: 'Han Ingresado', value: usedTickets.length, color: 'text-purple-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#0a0a0a]/90 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
              <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider">{stat.label}</p>
              <p className={`text-3xl font-bold font-mono mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Pendientes de Aprobación */}
        <div>
          <h2 className="text-2xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-yellow-500" />
            Por Aprobar
          </h2>

          {pendingTickets.length === 0 ? (
            <div className="text-center p-12 border border-white/10 border-dashed rounded-2xl bg-white/[0.02]">
              <p className="text-zinc-500 font-mono">No hay pagos pendientes por revisar.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingTickets.map((ticket: any) => (
                <div key={ticket.id} className="bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                  
                  {/* Imagen del comprobante */}
                  <div className="relative h-64 bg-black w-full border-b border-white/10">
                    {ticket.receipt_url ? (
                      <Image 
                        src={ticket.receipt_url} 
                        alt="Comprobante de pago" 
                        fill 
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-sm">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-zinc-500 mb-1 font-mono uppercase">Usuario</p>
                      <p className="font-semibold mb-3 truncate font-mono text-white">{ticket.profiles?.email}</p>
                      
                      <p className="text-xs text-zinc-500 mb-1 font-mono uppercase">Evento</p>
                      <p className="font-bold text-emerald-400 font-mono uppercase">{ticket.events?.title}</p>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <form action={rejectTicket} className="flex-1">
                        <input type="hidden" name="ticketId" value={ticket.id} />
                        <button className="w-full bg-red-500/10 border border-red-500/20 text-red-500 font-mono uppercase text-sm py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors font-bold">
                          <X className="w-4 h-4" /> Rechazar
                        </button>
                      </form>
                      <form action={approveTicket} className="flex-1">
                        <input type="hidden" name="ticketId" value={ticket.id} />
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

        {/* Lista de Pagos Historial */}
        <div>
          <h2 className="text-2xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
            Historial de Pagos
          </h2>
          <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.02)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10 text-xs uppercase font-mono tracking-widest text-zinc-400">
                  <tr>
                    <th className="p-4 font-medium">Usuario</th>
                    <th className="p-4 font-medium">Evento</th>
                    <th className="p-4 font-medium">Fecha</th>
                    <th className="p-4 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm font-mono">
                  {tickets?.filter(t => t.status !== 'PENDING').map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-white">{ticket.profiles.email}</div>
                      </td>
                      <td className="p-4 text-emerald-400 font-bold">{ticket.events.title}</td>
                      <td className="p-4 text-zinc-500">
                        {new Date(ticket.created_at).toLocaleDateString()}
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
                  ))}
                  {tickets?.filter(t => t.status !== 'PENDING').length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-zinc-500">
                        No hay historial de pagos.
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
