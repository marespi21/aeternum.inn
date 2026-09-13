import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Plus, Trash2 } from 'lucide-react'
import { addFinanceRecord, deleteFinanceRecord } from './actions'

export default async function AdminEventFinancesPage({ params }: { params: Promise<{ id: string }> }) {
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

  if (profile?.role !== 'ADMIN') redirect('/perfil')

  // 2. Fetch Event Details
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()
    
  if (eventError || !event) redirect('/admin')

  // 3. Fetch Tickets to calculate Base Income
  const { data: tickets } = await supabase
    .from('tickets')
    .select('ticket_type, status')
    .eq('event_id', id)

  // Calculate Base Income (Approved + Used)
  const approvedTickets = tickets?.filter(t => t.status === 'APPROVED' || t.status === 'USED') || []
  const ticketIncome = approvedTickets.reduce((acc, t) => {
    return acc + (t.ticket_type === 'EARLY' ? event.early_price : event.anytime_price)
  }, 0)

  // 4. Fetch Custom Finances
  const { data: finances } = await supabase
    .from('event_finances')
    .select('*')
    .eq('event_id', id)
    .order('created_at', { ascending: false })

  const customFinances = finances || []

  // 5. Calculate Totals
  const extraIncome = customFinances
    .filter(f => f.type === 'INCOME')
    .reduce((acc, f) => acc + Number(f.amount), 0)
    
  const totalExpenses = customFinances
    .filter(f => f.type === 'EXPENSE')
    .reduce((acc, f) => acc + Number(f.amount), 0)

  const totalIncome = ticketIncome + extraIncome
  const netProfit = totalIncome - totalExpenses
  const isProfitable = netProfit >= 0

  const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0

  return (
    <div className="p-4 sm:p-8 relative z-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,255,128,0.05)]">
          <div>
            <Link href={`/admin/event/${id}`} className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-sm uppercase mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Volver a Pagos
            </Link>
            <h1 className="text-3xl font-bold font-mono tracking-tighter text-emerald-400 uppercase">
              Reporte Financiero: {event.title}
            </h1>
            <p className="text-zinc-400 mt-1 font-mono text-sm">Resumen de Pérdidas y Ganancias del Evento</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-center">
              <p className="text-xs text-zinc-500 font-mono uppercase">Tickets Vendidos</p>
              <p className="text-2xl font-bold text-white font-mono">{approvedTickets.length}</p>
             </div>
          </div>
        </div>

        {/* Totals Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign className="w-24 h-24" />
            </div>
            <p className="text-sm text-zinc-500 font-mono uppercase">Ingreso (Boletas)</p>
            <p className="text-3xl font-bold font-mono text-white mt-2">${ticketIncome.toLocaleString()}</p>
          </div>
          
          <div className="bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.05)] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="w-24 h-24" />
            </div>
            <p className="text-sm text-zinc-500 font-mono uppercase">Ingreso (Extra)</p>
            <p className="text-3xl font-bold font-mono text-blue-400 mt-2">${extraIncome.toLocaleString()}</p>
          </div>

          <div className="bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingDown className="w-24 h-24" />
            </div>
            <p className="text-sm text-zinc-500 font-mono uppercase">Gastos Totales</p>
            <p className="text-3xl font-bold font-mono text-red-400 mt-2">${totalExpenses.toLocaleString()}</p>
          </div>

          <div className={`bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border ${isProfitable ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]'} relative overflow-hidden`}>
            <p className="text-sm text-zinc-400 font-mono uppercase">Beneficio Neto</p>
            <p className={`text-4xl font-black font-mono mt-2 ${isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
              ${netProfit.toLocaleString()}
            </p>
            <p className={`text-xs font-mono mt-2 ${isProfitable ? 'text-emerald-500' : 'text-red-500'}`}>
              Margen: {profitMargin.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Formulario para registrar */}
          <div className="lg:col-span-1 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-500" />
              Nuevo Registro
            </h2>
            <form action={addFinanceRecord} className="space-y-4">
              <input type="hidden" name="eventId" value={id} />
              
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Tipo</label>
                <select name="type" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono appearance-none">
                  <option value="EXPENSE" className="text-black">Gasto / Costo</option>
                  <option value="INCOME" className="text-black">Ingreso Extra</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Categoría</label>
                <input type="text" name="category" required placeholder="Ej: DJ, Bar, Seguridad..." className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono" />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Valor ($)</label>
                <input type="number" name="amount" required min="0" step="100" placeholder="50000" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono" />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Descripción (Opcional)</label>
                <textarea name="description" rows={3} placeholder="Detalles adicionales..." className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono uppercase py-3 rounded-xl transition-colors mt-4">
                Guardar Registro
              </button>
            </form>
          </div>

          {/* Historial Financiero */}
          <div className="lg:col-span-2 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.02)]">
            <h2 className="text-xl font-bold font-mono uppercase text-white p-6 border-b border-white/10 flex items-center gap-2">
              Movimientos Registrados
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10 text-xs uppercase font-mono tracking-widest text-zinc-400">
                  <tr>
                    <th className="p-4 font-medium">Categoría / Fecha</th>
                    <th className="p-4 font-medium">Tipo</th>
                    <th className="p-4 font-medium text-right">Valor</th>
                    <th className="p-4 font-medium w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm font-mono">
                  {customFinances.map((finance: any) => (
                    <tr key={finance.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-white flex flex-col">
                          <span className="uppercase">{finance.category}</span>
                          <span className="text-xs text-zinc-500 mt-1">
                            {finance.description || 'Sin descripción'} · {new Date(finance.created_at).toLocaleDateString('es-CO')}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                          finance.type === 'INCOME' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                          {finance.type === 'INCOME' ? 'INGRESO' : 'GASTO'}
                        </span>
                      </td>
                      <td className={`p-4 text-right font-bold ${finance.type === 'INCOME' ? 'text-blue-400' : 'text-red-400'}`}>
                        {finance.type === 'INCOME' ? '+' : '-'}${Number(finance.amount).toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <form action={deleteFinanceRecord}>
                          <input type="hidden" name="id" value={finance.id} />
                          <input type="hidden" name="eventId" value={id} />
                          <button type="submit" className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Eliminar registro">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                  {customFinances.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-zinc-500">
                        No hay movimientos extra registrados.
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
