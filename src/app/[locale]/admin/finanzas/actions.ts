'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addGlobalFinanceRecord(formData: FormData) {
  const type = formData.get('type') as 'INCOME' | 'EXPENSE'
  const category = formData.get('category') as string
  const amountStr = formData.get('amount') as string
  const description = formData.get('description') as string
  
  const amount = parseFloat(amountStr)

  if (!type || !category || isNaN(amount)) {
    throw new Error('Datos inválidos')
  }

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'ADMIN') throw new Error('No autorizado')

  // Insert global finance record (event_id is NULL)
  const { error } = await supabase.from('event_finances').insert({
    type,
    category,
    amount,
    description
  })

  if (error) {
    console.error('Error insertando registro financiero global:', error)
    throw new Error('Error al guardar el registro')
  }

  revalidatePath('/admin/finanzas')
}

export async function deleteGlobalFinanceRecord(formData: FormData) {
  const id = formData.get('id') as string

  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')
  if (!id) throw new Error('ID requerido')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'ADMIN') throw new Error('No autorizado')

  const { error } = await supabase.from('event_finances').delete().eq('id', id)

  if (error) {
    console.error('Error eliminando registro financiero:', error)
    throw new Error('Error al eliminar')
  }

  revalidatePath('/admin/finanzas')
}
