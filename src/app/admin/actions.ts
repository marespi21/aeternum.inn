'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { sendTicketApprovalEmail } from '@/utils/email'

export async function approveTicket(formData: FormData) {
  const ticketId = formData.get('ticketId') as string
  const eventId = formData.get('eventId') as string
  const supabase = await createClient()
  
  // 1. Fetch info necessary for email
  const { data: ticket } = await supabase
    .from('tickets')
    .select('*, profiles(email), events(title, date)')
    .eq('id', ticketId)
    .single()

  if (ticket && ticket.profiles?.email) {
    // 2. Update to APPROVED
    await supabase.from('tickets').update({ status: 'APPROVED' }).eq('id', ticketId)
    
    // 3. Send email with QR
    await sendTicketApprovalEmail({
      to: ticket.profiles.email,
      ticketId: ticketId,
      eventTitle: ticket.events.title,
      eventDate: ticket.events.date
    })
  }
  
  revalidatePath('/admin')
  if (eventId) {
    revalidatePath(`/admin/event/${eventId}`)
  }
}

export async function rejectTicket(formData: FormData) {
  const ticketId = formData.get('ticketId') as string
  const eventId = formData.get('eventId') as string
  const supabase = await createClient()
  
  await supabase.from('tickets').update({ status: 'REJECTED' }).eq('id', ticketId)
  
  revalidatePath('/admin')
  if (eventId) {
    revalidatePath(`/admin/event/${eventId}`)
  }
}

export async function createManualTicket(formData: FormData) {
  const eventId = formData.get('eventId') as string
  const guestEmail = formData.get('guestEmail') as string
  const guestName = formData.get('guestName') as string
  const paymentMethod = formData.get('paymentMethod') as string
  const supabase = await createClient()

  // Verify auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  // Fetch event details for email
  const { data: event } = await supabase.from('events').select('title, date').eq('id', eventId).single()
  if (!event) return { error: 'Evento no encontrado' }

  // Create ticket using Admin's user_id, but tag as manual sale
  const { data: ticket, error } = await supabase.from('tickets').insert({
    user_id: user.id,
    event_id: eventId,
    status: 'APPROVED', // Pre-approved since it's a direct sale
    receipt_url: `manual_sale:${guestEmail}:${guestName || 'Sin Nombre'}:${paymentMethod}`
  }).select('id').single()

  if (error || !ticket) {
    console.error('Error creating manual ticket:', error)
    return { error: 'Error al crear el ticket manual' }
  }

  // Send the QR code email
  await sendTicketApprovalEmail({
    to: guestEmail,
    ticketId: ticket.id,
    eventTitle: event.title,
    eventDate: event.date
  })

  revalidatePath('/admin')
  revalidatePath(`/admin/event/${eventId}`)
}
