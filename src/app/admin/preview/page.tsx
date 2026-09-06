import { Eye } from 'lucide-react'

export default function AdminPreviewPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
      {/* Top Bar for Preview */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
          <Eye className="w-5 h-5" />
          <h2>VISTA PREVIA EN VIVO</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-zinc-500 font-mono hidden sm:block">
            localhost:3000/
          </div>
        </div>
      </div>

      {/* Embedded Browser */}
      <div className="flex-1 w-full bg-black relative">
        <iframe 
          src="/" 
          className="absolute inset-0 w-full h-full border-0"
          title="Live Preview"
        />
      </div>
    </div>
  )
}
