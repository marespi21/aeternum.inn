'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function uploadReceiptAndReserve(formData: FormData) {
  const supabase = await createClient()

  // 1. Verificar usuario
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const eventId = formData.get('eventId') as string
  const receiptUrl = formData.get('receiptUrl') as string
  const ticketType = formData.get('ticketType') as string || 'ANYTIME'
  const docType = formData.get('docType') as string
  const docNumber = formData.get('docNumber') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const phoneCode = formData.get('phoneCode') as string
  const phoneNumber = formData.get('phoneNumber') as string

  if (!receiptUrl) {
    return { error: 'Debes subir un comprobante válido' }
  }
  
  if (!docNumber || !firstName || !lastName || !phoneNumber) {
    return { error: 'Datos personales incompletos' }
  }

  // 2. Actualizar metadata del usuario con todos sus datos personales
  await supabase.auth.updateUser({
    data: { 
      document_type: docType,
      document_number: docNumber,
      first_name: firstName,
      last_name: lastName,
      phone_code: phoneCode,
      phone_number: phoneNumber,
      // Keep old fields for backward compatibility if needed elsewhere
      full_name: `${firstName} ${lastName}`.trim(),
      whatsapp: `${phoneCode} ${phoneNumber}`.trim()
    }
  })

  // 4. Crear el Ticket en estado PENDING
  const { error: dbError } = await supabase
    .from('tickets')
    .insert({
      user_id: user.id,
      event_id: eventId,
      receipt_url: receiptUrl,
      ticket_type: ticketType,
      status: 'PENDING'
    })

  if (dbError) {
    console.error(dbError)
    return { error: 'Error al registrar la reserva en la base de datos' }
  }

  // 5. Redirigir al perfil
  redirect('/perfil?success=true')
}
