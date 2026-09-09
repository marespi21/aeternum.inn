'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addFinanceRecord(formData: FormData) {
  const eventId = formData.get('eventId') as string
  const type = formData.get('type') as 'INCOME' | 'EXPENSE'
  const category = formData.get('category') as string
  const amountStr = formData.get('amount') as string
  const description = formData.get('description') as string
  
  const amount = parseFloat(amountStr)

  if (!eventId || !type || !category || isNaN(amount)) {
    return { error: 'Datos inválidos' }
  }

  const supabase = await createClient()

  // Verify auth & admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'ADMIN') return { error: 'No autorizado' }

  // Insert finance record
  const { error } = await supabase.from('event_finances').insert({
    event_id: eventId,
    type,
    category,
    amount,
    description
  })

  if (error) {
    console.error('Error insertando registro financiero:', error)
    return { error: 'Error al guardar el registro' }
  }

  revalidatePath(`/admin/event/${eventId}/finanzas`)
  return { success: true }
}

export async function deleteFinanceRecord(formData: FormData) {
  const id = formData.get('id') as string
  const eventId = formData.get('eventId') as string

  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'ADMIN') return { error: 'No autorizado' }

  const { error } = await supabase.from('event_finances').delete().eq('id', id)

  if (error) {
    console.error('Error eliminando registro financiero:', error)
    return { error: 'Error al eliminar' }
  }

  revalidatePath(`/admin/event/${eventId}/finanzas`)
  return { success: true }
}
