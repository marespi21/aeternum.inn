import { ShieldAlert, Ticket, Calendar, Video, Radio, QrCode, Camera, Users } from 'lucide-react'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f4f4f5] flex flex-col md:flex-row pt-16 md:pt-20 selection:bg-white selection:text-black">
      {/* Sidebar Desktop & Topbar Mobile */}
      <aside className="w-full md:w-64 bg-[#0a0a0a]/90 backdrop-blur-xl border-b md:border-b-0 md:border-r border-white/10 p-4 shrink-0 relative z-10">
        <div className="flex items-center gap-3 mb-8 px-2 hidden md:flex">
          <ShieldAlert className="w-6 h-6 text-emerald-500" />
          <span className="font-bold font-mono tracking-widest uppercase text-sm text-emerald-400">AETERNUM INN</span>
        </div>

        <nav className="flex md:flex-col gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-zinc-400 hover:text-white font-mono text-sm whitespace-nowrap"
          >
            <Ticket className="w-4 h-4 shrink-0" />
            <span>Boletas</span>
          </Link>
          <Link 
            href="/admin/eventos" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-zinc-400 hover:text-white font-mono text-sm whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Eventos</span>
          </Link>
          <Link 
            href="/admin/videos" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-zinc-400 hover:text-white font-mono text-sm whitespace-nowrap"
          >
            <Video className="w-4 h-4 shrink-0" />
            <span>Videos</span>
          </Link>
          <Link 
            href="/admin/radio" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-zinc-400 hover:text-white font-mono text-sm whitespace-nowrap"
          >
            <Radio className="w-4 h-4 shrink-0" />
            <span>Radio</span>
          </Link>
          <Link 
            href="/admin/galeria" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-zinc-400 hover:text-white font-mono text-sm whitespace-nowrap"
          >
            <Camera className="w-4 h-4 shrink-0" />
            <span>Galería</span>
          </Link>
          <Link 
            href="/admin/artistas" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-zinc-400 hover:text-white font-mono text-sm whitespace-nowrap"
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Artistas</span>
          </Link>
          
          <div className="w-full h-px bg-white/10 my-2 hidden md:block"></div>

          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors text-emerald-400 hover:text-emerald-300 font-mono text-sm whitespace-nowrap mt-auto"
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Vista Previa del Sitio</span>
          </Link>
          
          <div className="md:mt-4 hidden md:block">
            <Link 
              href="/admin/scanner" 
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white hover:bg-zinc-200 transition-colors text-black font-bold font-mono text-sm mb-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Escáner QR</span>
            </Link>
            
            <form action="/auth/signout" method="post">
              <button 
                type="submit"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors text-red-500 font-bold font-mono text-sm"
              >
                Cerrar Sesión
              </button>
            </form>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10">
        {children}
      </main>
    </div>
  )
}
