'use client'

import { Trash2, AlertTriangle, Loader2 } from 'lucide-react'
import { useState, useEffect, useTransition } from 'react'
import { createPortal } from 'react-dom'

interface DeleteTicketButtonProps {
  ticketId: string
  eventId: string
  deleteAction: (formData: FormData) => void
}

export function DeleteTicketButton({ ticketId, eventId, deleteAction }: DeleteTicketButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleConfirm = () => {
    const formData = new FormData()
    formData.append('ticketId', ticketId)
    formData.append('eventId', eventId)

    startTransition(() => {
      deleteAction(formData)
      setIsOpen(false)
    })
  }

  return (
    <>
      <button 
        type="button" 
        onClick={() => setIsOpen(true)}
        className="text-red-500 hover:text-red-400 p-1.5 rounded-full hover:bg-red-500/10 transition-colors ml-2 flex-shrink-0" 
        title="Borrar Boleta"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0a0a0a] border border-red-500/20 rounded-2xl p-6 w-full max-w-sm shadow-[0_0_50px_rgba(239,68,68,0.15)] animate-in zoom-in-95 duration-200 relative">
            
            <div className="mx-auto w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            
            <h3 className="text-xl font-bold font-mono uppercase text-white text-center mb-2">
              Eliminar Boleta
            </h3>
            
            <p className="text-zinc-400 text-sm text-center mb-6 font-mono">
              ¿Estás seguro que deseas borrar esta boleta permanentemente? Esta acción <strong className="text-red-400">no se puede deshacer</strong>.
            </p>
            
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-mono uppercase text-sm font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button 
                type="button"
                onClick={handleConfirm}
                disabled={isPending}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-400 text-black font-mono uppercase text-sm font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sí, Borrar'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
