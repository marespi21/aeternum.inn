'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string
  const supabase = await createClient()

  // To build the reset URL dynamically based on environment
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  
  // URL to handle the auth token exchange and then redirect to the update password page
  const resetUrl = `${protocol}://${host}/auth/callback?next=/actualizar-password`

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: resetUrl,
  })

  if (error) {
    redirect('/recuperar?error=true&message=' + encodeURIComponent('No pudimos enviar el correo de recuperación. Verifica que esté bien escrito.'))
  }

  // Always show success message to prevent email enumeration attacks
  redirect('/recuperar?error=false&message=' + encodeURIComponent('Si el correo está registrado, recibirás un enlace de recuperación pronto. Revisa tu bandeja de spam.'))
}
