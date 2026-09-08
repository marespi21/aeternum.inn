'use client'

import { motion } from 'framer-motion'
import { Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { updatePassword } from './actions'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'

function ActualizarPasswordContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tighter mb-2">Nueva Contraseña</h1>
          <p className="text-zinc-400 text-sm">
            Ingresa tu nueva contraseña para acceder a tu cuenta.
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          
          {error === 'true' && message && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{message}</p>
            </div>
          )}

          {error === 'false' && message && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg flex flex-col items-center gap-3 text-emerald-400 text-sm text-center">
              <CheckCircle2 className="w-12 h-12 shrink-0 mt-0.5" />
              <p className="font-bold text-lg">{message}</p>
              <Link href="/login" className="mt-4 px-6 py-2 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400">
                Ir a Iniciar Sesión
              </Link>
            </div>
          )}

          {error !== 'false' && (
            <form action={updatePassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Nueva Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input 
                    type="password" 
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  Debe tener al menos 8 caracteres, una mayúscula y un número.
                </p>
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-500 text-black font-bold rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors active:scale-[0.98]"
              >
                Actualizar Contraseña
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function ActualizarPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Cargando...</div>}>
      <ActualizarPasswordContent />
    </Suspense>
  )
}
