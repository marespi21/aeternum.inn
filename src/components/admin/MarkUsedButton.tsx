'use client'

import { CheckCircle2 } from 'lucide-react'

interface MarkUsedButtonProps {
  ticketId: string
  eventId: string
  markAction: (formData: FormData) => void
  status: string
}

export function MarkUsedButton({ ticketId, eventId, markAction, status }: MarkUsedButtonProps) {
  if (status !== 'APPROVED') return null;

  return (
    <form action={markAction} className="inline-block ml-2">
      <input type="hidden" name="ticketId" value={ticketId} />
      <input type="hidden" name="eventId" value={eventId} />
      <button 
        type="submit" 
        className="text-emerald-500 hover:text-emerald-400 p-1.5 rounded-full hover:bg-emerald-500/10 transition-colors flex-shrink-0" 
        title="Marcar Ingreso Manualmente"
      >
        <CheckCircle2 className="w-5 h-5" />
      </button>
    </form>
  )
}
