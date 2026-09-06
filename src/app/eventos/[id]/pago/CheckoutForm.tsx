'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { uploadReceiptAndReserve } from './actions'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'

export function CheckoutForm({ eventId, eventTitle, eventPrice }: { eventId: string, eventTitle: string, eventPrice: number }) {
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!receiptUrl) {
      setError('Por favor sube la imagen del comprobante')
      return
    }

    setLoading(true)
    setError(null)

    const result = await uploadReceiptAndReserve(eventId, receiptUrl)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Instrucciones Bancarias */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6"
      >
        <h2 className="text-xl font-semibold border-b border-zinc-800 pb-4">Datos de Transferencia</h2>
        
        <div className="space-y-4">
          <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-500/30">
            <p className="text-sm text-purple-300 mb-1">Total a Pagar</p>
            <p className="font-bold text-2xl text-purple-400">
              ${eventPrice.toLocaleString('es-CO')} COP
            </p>
          </div>

          <div className="bg-black/50 p-4 rounded-xl border border-zinc-800/50">
            <p className="text-sm text-zinc-500 mb-1">Banco / Aplicación</p>
            <p className="font-semibold text-lg">Nequi o Bancolombia</p>
          </div>
          
          <div className="bg-black/50 p-4 rounded-xl border border-zinc-800/50">
            <p className="text-sm text-zinc-500 mb-1">Número de Cuenta / Celular</p>
            <p className="font-mono font-semibold text-xl">300 123 4567</p>
          </div>
          
          <div className="bg-black/50 p-4 rounded-xl border border-zinc-800/50">
            <p className="text-sm text-zinc-500 mb-1">Titular</p>
            <p className="font-semibold">AETERNUM EVENTOS S.A.S</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm text-zinc-400 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" />
          <p>Tu código QR se generará una vez que validemos tu comprobante de pago.</p>
        </div>
      </motion.div>

      {/* Formulario de Subida */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
      >
        <h2 className="text-xl font-semibold border-b border-zinc-800 pb-4 mb-6">Subir Comprobante</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <CloudinaryUpload 
            onUploadSuccess={(url) => setReceiptUrl(url)} 
            label="Haz clic para subir comprobante" 
          />

          <button 
            type="submit"
            disabled={loading || !receiptUrl}
            className="w-full bg-white text-black font-semibold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Subiendo y Reservando...' : 'Confirmar Reserva'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
