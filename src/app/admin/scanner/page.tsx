'use client'

import { useEffect, useState, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { CheckCircle2, XCircle, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

type ScanStatus = 'IDLE' | 'SCANNING' | 'PROCESSING' | 'SUCCESS' | 'ERROR'

export default function ScannerPage() {
  const [status, setStatus] = useState<ScanStatus>('IDLE')
  const [message, setMessage] = useState('')
  const [ticketData, setTicketData] = useState<any>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const supabase = createClient()

  useEffect(() => {
    // Configurar escáner al montar
    scannerRef.current = new Html5Qrcode("reader")

    return () => {
      // Limpiar al desmontar
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(console.error)
      }
    }
  }, [])

  const startScanner = async () => {
    try {
      setStatus('SCANNING')
      setMessage('Apunta la cámara al código QR')
      setTicketData(null)

      await scannerRef.current?.start(
        { facingMode: "environment" }, // Usar cámara trasera
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        async (decodedText) => {
          // Cuando lee un QR exitosamente
          if (scannerRef.current?.isScanning) {
            await scannerRef.current.stop()
          }
          await processQR(decodedText)
        },
        (errorMessage) => {
          // Errores de lectura (normales, los ignoramos)
        }
      )
    } catch (err) {
      console.error(err)
      setStatus('ERROR')
      setMessage('Error al acceder a la cámara. Asegúrate de dar permisos.')
    }
  }

  const processQR = async (qrId: string) => {
    setStatus('PROCESSING')
    setMessage('Validando boleta...')
    
    // 1. Buscar el ticket en la BD
    const { data: ticket, error } = await supabase
      .from('tickets')
      .select('*, profiles(email), events(title)')
      .eq('id', qrId)
      .single()

    if (error || !ticket) {
      setStatus('ERROR')
      setMessage('Código QR no encontrado o inválido.')
      return
    }

    // 2. Verificar estado
    if (ticket.status === 'USED') {
      setStatus('ERROR')
      setMessage('¡Esta boleta ya fue utilizada!')
      setTicketData(ticket)
      return
    }

    if (ticket.status !== 'APPROVED') {
      setStatus('ERROR')
      setMessage(`Boleta en estado inválido: ${ticket.status}`)
      setTicketData(ticket)
      return
    }

    // 3. Marcar como USADA
    const { error: updateError } = await supabase
      .from('tickets')
      .update({ status: 'USED' })
      .eq('id', ticket.id)

    if (updateError) {
      setStatus('ERROR')
      setMessage('Error al actualizar el estado de la boleta.')
      return
    }

    setStatus('SUCCESS')
    setMessage('¡ACCESO CONCEDIDO!')
    setTicketData(ticket)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-md mx-auto space-y-6 pt-4">
        
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Escáner de Acceso</h1>
        </div>

        {/* Contenedor del Lector de QR */}
        <div 
          id="reader" 
          className={`w-full bg-black rounded-2xl mx-auto overflow-hidden ${status === 'SCANNING' ? 'border-2 border-zinc-800' : 'h-0 border-none'}`}
          style={{ minHeight: status === 'SCANNING' ? '300px' : '0' }}
        ></div>

        {/* Estados */}
        <div className="text-center space-y-6">
          {status === 'IDLE' && (
            <button 
              onClick={startScanner}
              className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-purple-500 transition-colors"
            >
              Iniciar Escáner
            </button>
          )}

          {status === 'SCANNING' && (
            <p className="text-zinc-400 font-mono animate-pulse">{message}</p>
          )}

          {status === 'PROCESSING' && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
              <p className="font-mono text-zinc-300">{message}</p>
            </div>
          )}

          {status === 'SUCCESS' && (
            <div className="bg-green-500/10 border border-green-500/50 p-6 rounded-2xl space-y-4">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-green-500">{message}</h2>
              {ticketData && (
                <div className="text-left bg-black/50 p-4 rounded-xl space-y-2 text-sm">
                  {ticketData.receipt_url?.startsWith('manual_sale:') ? (
                    <>
                      <p><span className="text-zinc-500">Cliente (Manual):</span> {ticketData.receipt_url.split(':')[1]}</p>
                      <p><span className="text-zinc-500">Nombre:</span> {ticketData.receipt_url.split(':')[2]}</p>
                      <p><span className="text-zinc-500">Método de Pago:</span> <span className="capitalize">{ticketData.receipt_url.split(':')[3] || 'Efectivo'}</span></p>
                    </>
                  ) : (
                    <p><span className="text-zinc-500">Usuario:</span> {ticketData.profiles?.email}</p>
                  )}
                  <p><span className="text-zinc-500">Evento:</span> {ticketData.events?.title}</p>
                </div>
              )}
              <button 
                onClick={startScanner}
                className="w-full bg-zinc-800 font-bold py-3 rounded-xl mt-4 hover:bg-zinc-700"
              >
                Escanear Siguiente
              </button>
            </div>
          )}

          {status === 'ERROR' && (
            <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-2xl space-y-4">
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h2 className="text-xl font-bold text-red-500">{message}</h2>
              {ticketData && (
                <div className="text-left bg-black/50 p-4 rounded-xl space-y-2 text-sm">
                  <p><span className="text-zinc-500">Estado actual:</span> {ticketData.status}</p>
                  {ticketData.receipt_url?.startsWith('manual_sale:') ? (
                    <>
                      <p><span className="text-zinc-500">Cliente (Manual):</span> {ticketData.receipt_url.split(':')[1]}</p>
                      <p><span className="text-zinc-500">Nombre:</span> {ticketData.receipt_url.split(':')[2]}</p>
                      <p><span className="text-zinc-500">Método de Pago:</span> <span className="capitalize">{ticketData.receipt_url.split(':')[3] || 'Efectivo'}</span></p>
                    </>
                  ) : (
                    <p><span className="text-zinc-500">Usuario:</span> {ticketData.profiles?.email}</p>
                  )}
                </div>
              )}
              <button 
                onClick={startScanner}
                className="w-full bg-zinc-800 font-bold py-3 rounded-xl mt-4 hover:bg-zinc-700"
              >
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
