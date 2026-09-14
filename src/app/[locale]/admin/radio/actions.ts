'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createTrack(formData: FormData) {
  const supabase = await createClient()

  // Verificar la sesión primero para estar seguros de que el JWT pasa
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Error de autenticación: No hay sesión activa en el servidor.')
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'ADMIN') {
    throw new Error('No tienes permisos de Administrador.')
  }

  const title = formData.get('title') as string
  const dj = formData.get('dj') as string
  const location = formData.get('location') as string
  const audio_url = formData.get('audio_url') as string

  const { error } = await supabase.from('audio_tracks').insert({
    title,
    dj,
    location,
    audio_url
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/radio')
  revalidatePath('/')
}
