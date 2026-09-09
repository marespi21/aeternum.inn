import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Plus, Trash2, PieChart } from 'lucide-react'
import { addGlobalFinanceRecord, deleteGlobalFinanceRecord } from './actions'

export default async function GlobalFinancesPage() {
  const supabase = await createClient()

  // 1. Verify session and role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'ADMIN') redirect('/perfil')

  // 2. Fetch Events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })

  // 3. Fetch Tickets
  const { data: tickets } = await supabase
    .from('tickets')
    .select('event_id, ticket_type, status')

  const approvedTickets = tickets?.filter(t => t.status === 'APPROVED' || t.status === 'USED') || []
  
  // Calculate Ticket Income per event and globally
  let totalTicketIncome = 0
  const eventIncomeMap: Record<string, number> = {}
  
  if (events) {
    events.forEach(event => {
      const eventTix = approvedTickets.filter(t => t.event_id === event.id)
      const income = eventTix.reduce((acc, t) => {
        return acc + (t.ticket_type === 'EARLY' ? event.early_price : event.anytime_price)
      }, 0)
      eventIncomeMap[event.id] = income
      totalTicketIncome += income
    })
  }

  // 4. Fetch All Finances (Event specific + Global)
  const { data: finances } = await supabase
    .from('event_finances')
    .select('*')
    .order('created_at', { ascending: false })

  const allFinances = finances || []
  
  // Global Totals
  const totalExtraIncome = allFinances
    .filter(f => f.type === 'INCOME')
    .reduce((acc, f) => acc + Number(f.amount), 0)
    
  const totalExpenses = allFinances
    .filter(f => f.type === 'EXPENSE')
    .reduce((acc, f) => acc + Number(f.amount), 0)

  const totalIncome = totalTicketIncome + totalExtraIncome
  const netProfit = totalIncome - totalExpenses
  const isProfitable = netProfit >= 0
  const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0

  // Filter out global records specifically for the table
  const globalFinances = allFinances.filter(f => !f.event_id)

  return (
    <div className="p-4 sm:p-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,255,128,0.05)]">
          <div>
            <Link href="/admin" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-sm uppercase mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Volver a Panel
            </Link>
            <h1 className="text-3xl font-bold font-mono tracking-tighter text-emerald-400 uppercase">
              Finanzas Globales
            </h1>
            <p className="text-zinc-400 mt-1 font-mono text-sm">Resumen macro-económico de AETERNUM</p>
          </div>
        </div>

        {/* Totals Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign className="w-24 h-24" />
            </div>
            <p className="text-sm text-zinc-500 font-mono uppercase">Ingresos Históricos (Boletas)</p>
            <p className="text-3xl font-bold font-mono text-white mt-2">${totalTicketIncome.toLocaleString()}</p>
          </div>
          
          <div className="bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.05)] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingUp className="w-24 h-24" />
            </div>
            <p className="text-sm text-zinc-500 font-mono uppercase">Ingresos Históricos (Extras)</p>
            <p className="text-3xl font-bold font-mono text-blue-400 mt-2">${totalExtraIncome.toLocaleString()}</p>
          </div>

          <div className="bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
              <TrendingDown className="w-24 h-24" />
            </div>
            <p className="text-sm text-zinc-500 font-mono uppercase">Gastos Históricos (Totales)</p>
            <p className="text-3xl font-bold font-mono text-red-400 mt-2">${totalExpenses.toLocaleString()}</p>
          </div>

          <div className={`bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border ${isProfitable ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]'} relative overflow-hidden`}>
            <p className="text-sm text-zinc-400 font-mono uppercase">Beneficio Neto Histórico</p>
            <p className={`text-4xl font-black font-mono mt-2 ${isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
              ${netProfit.toLocaleString()}
            </p>
            <p className={`text-xs font-mono mt-2 ${isProfitable ? 'text-emerald-500' : 'text-red-500'}`}>
              Margen Global: {profitMargin.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Formulario para registrar Gastos Globales de Empresa */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-500" />
                Registro Global de Empresa
              </h2>
              <p className="text-xs text-zinc-400 font-mono mb-6">
                Usa este formulario para registrar movimientos de dinero que NO pertenecen a ningún evento específico (ej. Pago de servidores, Dominio web, Sueldos administrativos).
              </p>
              <form action={addGlobalFinanceRecord} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Tipo</label>
                  <select name="type" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono appearance-none">
                    <option value="EXPENSE" className="text-black">Gasto Operativo</option>
                    <option value="INCOME" className="text-black">Ingreso Corporativo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Categoría</label>
                  <input type="text" name="category" required placeholder="Ej: Dominio Web, Marketing..." className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono" />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Valor ($)</label>
                  <input type="number" name="amount" required min="0" step="100" placeholder="100000" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono" />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-500 mb-2">Descripción (Opcional)</label>
                  <textarea name="description" rows={3} placeholder="Detalles adicionales..." className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono resize-none"></textarea>
                </div>

                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono uppercase py-3 rounded-xl transition-colors mt-4">
                  Guardar Movimiento Global
                </button>
              </form>
            </div>
            
            {/* Comparativa Rápida de Eventos */}
            <div className="bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-500" />
                Ingresos por Taquilla
              </h2>
              <div className="space-y-4">
                {events?.map(event => (
                  <div key={event.id} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="font-mono text-sm text-zinc-300 uppercase truncate pr-4">{event.title}</span>
                    <span className="font-mono font-bold text-emerald-400 whitespace-nowrap">
                      ${eventIncomeMap[event.id]?.toLocaleString() || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Historial Financiero Global */}
          <div className="lg:col-span-2 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.02)]">
            <h2 className="text-xl font-bold font-mono uppercase text-white p-6 border-b border-white/10 flex items-center gap-2">
              Movimientos Globales de Empresa
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
                  {globalFinances.map((finance: any) => (
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
                        <form action={deleteGlobalFinanceRecord}>
                          <input type="hidden" name="id" value={finance.id} />
                          <button type="submit" className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Eliminar registro">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                  {globalFinances.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-zinc-500">
                        No hay movimientos globales corporativos registrados.
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
