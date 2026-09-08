'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { uploadReceiptAndReserve } from './actions'
import { CloudinaryUpload } from '@/components/ui/CloudinaryUpload'

export function CheckoutForm({ eventId, eventTitle, earlyPrice, anytimePrice, userEmail, userMetadata }: { eventId: string, eventTitle: string, earlyPrice: number, anytimePrice: number, userEmail: string, userMetadata: any }) {
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null)
  
  // New State Fields
  const [ticketType, setTicketType] = useState<'EARLY' | 'ANYTIME'>('ANYTIME')
  const [docType, setDocType] = useState(userMetadata?.document_type || "CC")
  const [docNumber, setDocNumber] = useState(userMetadata?.document_number || "")
  const [firstName, setFirstName] = useState(userMetadata?.first_name || "")
  const [lastName, setLastName] = useState(userMetadata?.last_name || "")
  const [phoneCode, setPhoneCode] = useState(userMetadata?.phone_code || "+57")
  const [phoneNumber, setPhoneNumber] = useState(userMetadata?.phone_number || "")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!receiptUrl) {
      setError('Por favor sube la imagen del comprobante')
      return
    }

    if (!docNumber || !firstName || !lastName || !phoneNumber) {
      setError('Por favor completa todos tus datos personales')
      return
    }

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('eventId', eventId)
    formData.append('receiptUrl', receiptUrl)
    formData.append('ticketType', ticketType)
    formData.append('docType', docType)
    formData.append('docNumber', docNumber)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('phoneCode', phoneCode)
    formData.append('phoneNumber', phoneNumber)

    const result = await uploadReceiptAndReserve(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  const currentPrice = ticketType === 'EARLY' ? earlyPrice : anytimePrice;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Instrucciones Bancarias */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6"
      >
        <h2 className="text-xl font-semibold border-b border-zinc-800 pb-4">Selecciona tu Entrada</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setTicketType('EARLY')}
            className={`p-4 rounded-xl border text-left transition-all ${
              ticketType === 'EARLY' 
                ? 'bg-emerald-500/10 border-emerald-500 text-white' 
                : 'bg-black/50 border-white/10 text-zinc-400 hover:border-white/30'
            }`}
          >
            <div className="font-bold font-mono text-lg mb-1">EARLY</div>
            <div className="text-xs mb-2 text-zinc-400">Antes de la 1:00 AM</div>
            <div className="font-bold text-emerald-400">${(earlyPrice || 0).toLocaleString()}</div>
          </button>
          
          <button
            type="button"
            onClick={() => setTicketType('ANYTIME')}
            className={`p-4 rounded-xl border text-left transition-all ${
              ticketType === 'ANYTIME' 
                ? 'bg-emerald-500/10 border-emerald-500 text-white' 
                : 'bg-black/50 border-white/10 text-zinc-400 hover:border-white/30'
            }`}
          >
            <div className="font-bold font-mono text-lg mb-1">ANYTIME</div>
            <div className="text-xs mb-2 text-zinc-400">Cualquier Hora</div>
            <div className="font-bold text-emerald-400">${(anytimePrice || 0).toLocaleString()}</div>
          </button>
        </div>

        <h2 className="text-xl font-semibold border-b border-zinc-800 pb-4 mt-8">Datos de Transferencia</h2>
        
        <div className="space-y-4">
          <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-500/30">
            <p className="text-sm text-purple-300 mb-1">Total a Pagar</p>
            <p className="font-bold text-2xl text-purple-400">
              ${(currentPrice || 0).toLocaleString('es-CO')} COP
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

      {/* Formulario de Subida y Datos */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
      >
        <h2 className="text-xl font-semibold border-b border-zinc-800 pb-4 mb-6">Mis Datos y Comprobante</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 mb-6">
            
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Correo Electrónico *
              </label>
              <input
                type="email"
                disabled
                value={userEmail}
                className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800/50 rounded-xl text-sm text-zinc-500 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Documento *
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-white/40 transition-colors appearance-none"
                >
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="PASAPORTE">Pasaporte</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Número *
                </label>
                <input
                  type="text"
                  required
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  placeholder="Ej. 10203040"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Nombre(s) *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ej. Valentina"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  Apellidos *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Ej. Ríos"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Teléfono *
              </label>
              <div className="flex gap-2">
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  className="w-1/3 px-3 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-white/40 transition-colors appearance-none"
                >
                  <option value="+57">🇨🇴 +57</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+52">🇲🇽 +52</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+54">🇦🇷 +54</option>
                  <option value="+56">🇨🇱 +56</option>
                  <option value="+51">🇵🇪 +51</option>
                  <option value="+593">🇪🇨 +593</option>
                  <option value="+58">🇻🇪 +58</option>
                </select>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="300 123 4567"
                  className="w-2/3 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
            </div>

          </div>

          <CloudinaryUpload 
            onUploadSuccess={(url) => setReceiptUrl(url)} 
            label="Haz clic para subir comprobante *" 
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
