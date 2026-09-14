'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { CheckCircle2, XCircle, ArrowLeft, Loader2, CloudDownload, RefreshCw, Wifi, WifiOff } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

type ScanStatus = 'IDLE' | 'SCANNING' | 'PROCESSING' | 'SUCCESS' | 'ERROR'

export default function ScannerPage() {
  const [status, setStatus] = useState<ScanStatus>('IDLE')
  const [message, setMessage] = useState('')
  const [ticketData, setTicketData] = useState<any>(null)
  
  const [events, setEvents] = useState<any[]>([])
  const [selectedEventId, setSelectedEventId] = useState<string>('')
  
  const [localTickets, setLocalTickets] = useState<Record<string, any>>({})
  const [syncQueue, setSyncQueue] = useState<string[]>([])
  const [isOnline, setIsOnline] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)

  const scannerRef = useRef<Html5Qrcode | null>(null)
  const supabase = createClient()

  // 1. Inicialización y Eventos
  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    const fetchEvents = async () => {
      const { data } = await supabase.from('events').select('id, title').order('created_at', { ascending: false })
      if (data) {
        setEvents(data)
        if (data.length > 0) setSelectedEventId(data[0].id)
      }
    }
    fetchEvents()

    // Cargar cola de sincronización desde localStorage
    const savedQueue = localStorage.getItem('scanner_sync_queue')
    if (savedQueue) setSyncQueue(JSON.parse(savedQueue))

    try {
      scannerRef.current = new Html5Qrcode("reader")
    } catch (error) {
      console.error("No se pudo inicializar el escáner:", error)
      setStatus('ERROR')
      setMessage('Tu navegador no soporta el escáner o requiere conexión segura (HTTPS).')
    }

    return () => {
      if (scannerRef.current?.isScanning) scannerRef.current.stop().catch(console.error)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Cargar tickets locales cuando cambie el evento
  useEffect(() => {
    if (selectedEventId) {
      const saved = localStorage.getItem(`scanner_tickets_${selectedEventId}`)
      if (saved) setLocalTickets(JSON.parse(saved))
      else setLocalTickets({})
    }
  }, [selectedEventId])

  // 2. Descargar Base de Datos Local
  const downloadDatabase = async () => {
    if (!selectedEventId) return
    setIsSyncing(true)
    
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('*, profiles(email, full_name), events(title)')
      .eq('event_id', selectedEventId)
      
    if (error || !tickets) {
      alert('Error descargando la base de datos')
      setIsSyncing(false)
      return
    }

    const ticketMap: Record<string, any> = {}
    tickets.forEach(t => {
      ticketMap[t.id] = t
    })

    localStorage.setItem(`scanner_tickets_${selectedEventId}`, JSON.stringify(ticketMap))
    setLocalTickets(ticketMap)
    setIsSyncing(false)
    alert(`¡Base de datos sincronizada! ${tickets.length} tickets listos para escaneo offline.`)
  }

  // 3. Cola de Sincronización en Segundo Plano
  const syncPendingQueue = useCallback(async () => {
    if (syncQueue.length === 0 || !isOnline || isSyncing) return
    setIsSyncing(true)

    const newQueue = [...syncQueue]
    const successfullySynced: string[] = []

    for (const ticketId of newQueue) {
      const { error } = await supabase
        .from('tickets')
        .update({ status: 'USED' })
        .eq('id', ticketId)
        
      if (!error) {
        successfullySynced.push(ticketId)
      }
    }

    const remainingQueue = newQueue.filter(id => !successfullySynced.includes(id))
    setSyncQueue(remainingQueue)
    localStorage.setItem('scanner_sync_queue', JSON.stringify(remainingQueue))
    setIsSyncing(false)
  }, [syncQueue, isOnline, isSyncing])

  useEffect(() => {
    // Sincronizar cada 10 segundos si hay internet y elementos pendientes
    const interval = setInterval(syncPendingQueue, 10000)
    return () => clearInterval(interval)
  }, [syncPendingQueue])

  const startScanner = async () => {
    try {
      setStatus('SCANNING')
      setMessage('Apunta la cámara al código QR')
      setTicketData(null)

      await scannerRef.current?.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          if (scannerRef.current?.isScanning) {
            await scannerRef.current.stop()
          }
          await processQR(decodedText)
        },
        (errorMessage) => {}
      )
    } catch (err) {
      console.error(err)
      setStatus('ERROR')
      setMessage('Error al acceder a la cámara. Asegúrate de dar permisos.')
    }
  }

  const processQR = async (qrId: string) => {
    setStatus('PROCESSING')
    setMessage('Validando boleta (Offline)...')
    
    // Buscar en memoria local
    const ticket = localTickets[qrId]

    if (!ticket) {
      setStatus('ERROR')
      setMessage('Código QR no encontrado en este evento. Por favor sincroniza la base de datos si la compra fue reciente.')
      return
    }

    // Verificar estado
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

    // Actualizar estado localmente
    const updatedTicket = { ...ticket, status: 'USED' }
    const newLocalTickets = { ...localTickets, [qrId]: updatedTicket }
    
    setLocalTickets(newLocalTickets)
    localStorage.setItem(`scanner_tickets_${selectedEventId}`, JSON.stringify(newLocalTickets))

    // Añadir a cola de sincronización
    const newQueue = [...syncQueue, qrId]
    setSyncQueue(newQueue)
    localStorage.setItem('scanner_sync_queue', JSON.stringify(newQueue))

    setStatus('SUCCESS')
    setMessage('¡ACCESO CONCEDIDO!')
    setTicketData(updatedTicket)
    
    // Si hay internet, intentar sincronizar ahora mismo
    if (navigator.onLine) {
      setTimeout(syncPendingQueue, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 font-mono">
      <div className="max-w-md mx-auto space-y-6 pt-4">
        
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold uppercase tracking-widest text-emerald-400">Escáner</h1>
          </div>
          
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isOnline ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </div>
        </div>

        {/* Panel de Sincronización */}
        <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-2xl space-y-4">
          <div>
            <label className="text-xs uppercase text-zinc-500 mb-2 block tracking-widest">Evento a Escanear</label>
            <select 
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 appearance-none"
            >
              {events.map(ev => <option key={ev.id} value={ev.id} className="text-black">{ev.title}</option>)}
            </select>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={downloadDatabase}
              disabled={isSyncing || !isOnline}
              className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CloudDownload className="w-4 h-4" />}
              Bajar Datos
            </button>
            <div className="flex-1 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2">
              <span>Local:</span>
              <span className="text-emerald-400">{Object.keys(localTickets).length}</span>
            </div>
          </div>
          
          {syncQueue.length > 0 && (
            <div className="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl text-yellow-500 text-xs">
              <span className="flex items-center gap-2">
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                {syncQueue.length} por sincronizar
              </span>
              <button 
                onClick={syncPendingQueue}
                disabled={!isOnline || isSyncing}
                className="font-bold underline disabled:opacity-50 hover:text-yellow-400"
              >
                Forzar Sync
              </button>
            </div>
          )}
        </div>

        {/* Lector */}
        <div 
          id="reader" 
          className={`w-full bg-black rounded-2xl mx-auto overflow-hidden ${status === 'SCANNING' ? 'border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'h-0 border-none'}`}
          style={{ minHeight: status === 'SCANNING' ? '300px' : '0' }}
        ></div>

        {/* Estados */}
        <div className="text-center space-y-6">
          {status === 'IDLE' && (
            <button 
              onClick={startScanner}
              disabled={Object.keys(localTickets).length === 0}
              className="w-full bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold uppercase tracking-widest py-4 rounded-xl text-lg hover:bg-emerald-400 transition-colors"
            >
              Iniciar Escáner
            </button>
          )}

          {status === 'SCANNING' && (
            <button 
              onClick={() => {
                if (scannerRef.current?.isScanning) scannerRef.current.stop()
                setStatus('IDLE')
              }}
              className="w-full bg-red-500/10 text-red-500 border border-red-500/20 font-bold uppercase tracking-widest py-3 rounded-xl text-sm transition-colors"
            >
              Cancelar
            </button>
          )}

          {status === 'PROCESSING' && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
              <p className="text-zinc-300">{message}</p>
            </div>
          )}

          {status === 'SUCCESS' && (
            <div className="bg-emerald-500/10 border border-emerald-500/50 p-6 rounded-2xl space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-bold text-emerald-500">{message}</h2>
              {ticketData && (
                <div className="text-left bg-black/50 p-4 rounded-xl space-y-2 text-xs">
                  {ticketData.receipt_url?.startsWith('manual_sale:') ? (
                    <>
                      <p><span className="text-zinc-500">Manual:</span> {ticketData.receipt_url.split(':')[1]}</p>
                      <p><span className="text-zinc-500">Nombre:</span> {ticketData.receipt_url.split(':')[2]}</p>
                      <p><span className="text-zinc-500">Pago:</span> <span className="capitalize">{ticketData.receipt_url.split(':')[3] || 'Efectivo'}</span></p>
                    </>
                  ) : (
                    <>
                      <p><span className="text-zinc-500">Usuario:</span> {ticketData.profiles?.full_name || ticketData.profiles?.email || 'N/A'}</p>
                      <p><span className="text-zinc-500">Email:</span> {ticketData.profiles?.email || 'N/A'}</p>
                    </>
                  )}
                  <p><span className="text-zinc-500">Tipo:</span> {ticketData.ticket_type}</p>
                </div>
              )}
              <button 
                onClick={startScanner}
                className="w-full bg-zinc-800 font-bold py-3 rounded-xl mt-4 hover:bg-zinc-700 uppercase tracking-widest"
              >
                Siguiente
              </button>
            </div>
          )}

          {status === 'ERROR' && (
            <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-2xl space-y-4">
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h2 className="text-xl font-bold text-red-500 leading-tight">{message}</h2>
              {ticketData && (
                <div className="text-left bg-black/50 p-4 rounded-xl space-y-2 text-xs">
                  <p><span className="text-zinc-500">Estado actual:</span> <span className="text-red-400 font-bold">{ticketData.status}</span></p>
                  {ticketData.receipt_url?.startsWith('manual_sale:') ? (
                    <>
                      <p><span className="text-zinc-500">Manual:</span> {ticketData.receipt_url.split(':')[1]}</p>
                      <p><span className="text-zinc-500">Nombre:</span> {ticketData.receipt_url.split(':')[2]}</p>
                    </>
                  ) : (
                    <p><span className="text-zinc-500">Usuario:</span> {ticketData.profiles?.email}</p>
                  )}
                </div>
              )}
              <button 
                onClick={startScanner}
                className="w-full bg-zinc-800 font-bold py-3 rounded-xl mt-4 hover:bg-zinc-700 uppercase tracking-widest"
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
