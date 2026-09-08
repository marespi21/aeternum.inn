import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { LogOut, Ticket, User, QrCode, ShieldAlert } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export default async function PerfilPage() {
  const supabase = await createClient()

  // Verificar sesión
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Obtener rol del perfil
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
    
  const isAdmin = profile?.role === 'ADMIN'
  const { data: ticketsData } = await supabase
    .from('tickets')
    .select('*, events(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const tickets = (ticketsData || []).filter(t => !t.receipt_url?.startsWith('manual_sale:'))

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f4f4f5] pt-24 px-4 sm:px-8 selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,255,128,0.05)]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-black rounded-full border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold font-mono tracking-tighter text-white uppercase">Tu Perfil</h1>
                {isAdmin && (
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded-md font-mono font-bold uppercase border border-emerald-500/20">ADMIN</span>
                )}
              </div>
              <p className="text-zinc-400 font-mono text-sm mt-1">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {isAdmin && (
              <a href="/admin" className="w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-200 text-black rounded-xl transition-colors font-mono font-bold text-sm uppercase">
                <ShieldAlert className="w-4 h-4" />
                Ir a Panel Admin
              </a>
            )}
            <form action="/auth/signout" method="post" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl transition-colors font-mono font-bold text-sm uppercase">
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </form>
          </div>
        </div>

        {/* Mis Tickets */}
        <div>
          <h2 className="text-2xl font-bold font-mono uppercase text-white mb-6 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-emerald-500" />
            Tus Entradas
          </h2>
          
          {tickets.length === 0 ? (
            <div className="text-center p-12 border border-white/10 border-dashed rounded-2xl bg-white/[0.02]">
              <p className="text-zinc-500 font-mono">No tienes entradas adquiridas.</p>
              <a href="/#eventos" className="inline-block mt-4 text-emerald-400 hover:text-emerald-300 font-bold font-mono uppercase">Ver Eventos →</a>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {tickets.map((ticket: any) => (
                <div key={ticket.id} className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold font-mono text-xl text-emerald-400 uppercase">{ticket.events?.title}</h3>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border font-mono uppercase ${
                        ticket.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        ticket.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        ticket.status === 'USED' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {ticket.status === 'PENDING' ? 'En Revisión' : 
                         ticket.status === 'APPROVED' ? 'Aprobado' : 
                         ticket.status === 'USED' ? 'Ya ingresó' : 'Rechazado'}
                      </span>
                    </div>
                  
                    <div className="space-y-3 text-sm text-zinc-400 font-mono">
                      <p>• {new Date(ticket.events?.date).toLocaleDateString()}</p>
                      <p>• Medellín (Secret Location)</p>
                      <p>
                        • Tipo: <span className="text-emerald-400 font-bold">{ticket.ticket_type === 'EARLY' ? 'EARLY (Antes de la 1AM)' : 'ANYTIME'}</span>
                      </p>
                      <p>
                        • Valor: ${ticket.ticket_type === 'EARLY' 
                          ? ticket.events?.early_price?.toLocaleString('es-CO') 
                          : ticket.events?.anytime_price?.toLocaleString('es-CO')} COP
                      </p>
                    </div>

                    {/* Si está aprobado, mostrar botón para ver QR */}
                    {ticket.status === 'APPROVED' && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <a 
                          href={`/perfil/ticket/${ticket.id}`} 
                          className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold font-mono py-3 rounded-xl hover:bg-zinc-200 transition-colors uppercase text-sm"
                        >
                          <QrCode className="w-5 h-5" />
                          Ver Código QR
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
