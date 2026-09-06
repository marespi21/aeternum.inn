'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function uploadReceiptAndReserve(eventId: string, receipt_url: string) {
  const supabase = await createClient()

  // 1. Verificar usuario
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  if (!receipt_url) {
    return { error: 'Debes subir un comprobante válido' }
  }

  // 4. Crear el Ticket en estado PENDING
  const { error: dbError } = await supabase
    .from('tickets')
    .insert({
      user_id: user.id,
      event_id: eventId,
      receipt_url,
      status: 'PENDING'
    })

  if (dbError) {
    console.error(dbError)
    return { error: 'Error al registrar la reserva en la base de datos' }
  }

  // 5. Redirigir al perfil
  redirect('/perfil?success=true')
}
