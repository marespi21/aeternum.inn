'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { sendTicketApprovalEmail } from '@/utils/email'

export async function approveTicketGroup(formData: FormData) {
  const ticketIdsStr = formData.get('ticketIds') as string
  const eventId = formData.get('eventId') as string
  const supabase = await createClient()
  
  if (!ticketIdsStr) return;
  const ticketIds = ticketIdsStr.split(',')
  
  // 1. Fetch info necessary for email
  const { data: ticketsData } = await supabase
    .from('tickets')
    .select('id, ticket_type, profiles(email, full_name), events(title, date)')
    .in('id', ticketIds)

  if (ticketsData && ticketsData.length > 0 && (ticketsData[0].profiles as any)?.email) {
    // 2. Update to APPROVED
    await supabase.from('tickets').update({ status: 'APPROVED' }).in('id', ticketIds)
    
    // 3. Send email with QRs
    await sendTicketApprovalEmail({
      to: (ticketsData[0].profiles as any).email,
      tickets: ticketsData.map(t => ({ id: t.id, type: t.ticket_type })),
      eventTitle: (ticketsData[0].events as any).title,
      eventDate: (ticketsData[0].events as any).date,
      guestName: (ticketsData[0].profiles as any).full_name
    })
  }
  
  revalidatePath('/admin')
  if (eventId) {
    revalidatePath(`/admin/event/${eventId}`)
  }
}

export async function rejectTicketGroup(formData: FormData) {
  const ticketIdsStr = formData.get('ticketIds') as string
  const eventId = formData.get('eventId') as string
  const supabase = await createClient()
  
  if (!ticketIdsStr) return;
  const ticketIds = ticketIdsStr.split(',')
  
  await supabase.from('tickets').update({ status: 'REJECTED' }).in('id', ticketIds)
  
  revalidatePath('/admin')
  if (eventId) {
    revalidatePath(`/admin/event/${eventId}`)
  }
}

export async function createManualTicket(formData: FormData) {
  const eventId = formData.get('eventId') as string
  const guestEmail = formData.get('guestEmail') as string
  const guestName = formData.get('guestName') as string
  const guestPhone = formData.get('guestPhone') as string
  const paymentMethod = formData.get('paymentMethod') as string
  const ticketType = formData.get('ticketType') as string || 'ANYTIME'
  const supabase = await createClient()

  // Verify auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')

  // Fetch event details for email
  const { data: event } = await supabase.from('events').select('title, date').eq('id', eventId).single()
  if (!event) throw new Error('Evento no encontrado')

  // Create ticket using Admin's user_id, but tag as manual sale
  const { data: ticket, error } = await supabase.from('tickets').insert({
    user_id: user.id,
    event_id: eventId,
    ticket_type: ticketType,
    status: 'APPROVED', // Pre-approved since it's a direct sale
    receipt_url: `manual_sale:${guestEmail}:${guestName || 'Sin Nombre'}:${paymentMethod}:${guestPhone || 'Sin Teléfono'}`
  }).select('id').single()

  if (error || !ticket) {
    console.error('Error creating manual ticket:', error)
    throw new Error('Error al crear el ticket manual')
  }

  // Send the QR code email
  await sendTicketApprovalEmail({
    to: guestEmail,
    tickets: [{ id: ticket.id, type: ticketType }],
    eventTitle: event.title,
    eventDate: event.date,
    guestName: guestName
  })

  revalidatePath('/admin')
  revalidatePath(`/admin/event/${eventId}`)
}

export async function deleteTicket(formData: FormData) {
  const ticketId = formData.get('ticketId') as string
  const eventId = formData.get('eventId') as string
  const supabase = await createClient()

  if (!ticketId) return;

  // Verify auth and admin role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'ADMIN') throw new Error('Solo los administradores pueden borrar boletas')

  await supabase.from('tickets').delete().eq('id', ticketId)

  revalidatePath('/admin')
  if (eventId) {
    revalidatePath(`/admin/event/${eventId}`)
  }
}

export async function markTicketAsUsed(formData: FormData) {
  const ticketId = formData.get('ticketId') as string
  const eventId = formData.get('eventId') as string
  const supabase = await createClient()

  if (!ticketId) return;

  await supabase.from('tickets').update({ status: 'USED' }).eq('id', ticketId)

  revalidatePath('/admin')
  if (eventId) {
    revalidatePath(`/admin/event/${eventId}`)
  }
}
