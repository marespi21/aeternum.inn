'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string
  const supabase = await createClient()

  // Secure Password Validation
  if (password.length < 8) {
    redirect('/actualizar-password?error=true&message=La contraseña debe tener al menos 8 caracteres')
  }
  if (!/[A-Z]/.test(password)) {
    redirect('/actualizar-password?error=true&message=La contraseña debe tener al menos una letra mayúscula')
  }
  if (!/[0-9]/.test(password)) {
    redirect('/actualizar-password?error=true&message=La contraseña debe tener al menos un número')
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    let errorMessage = 'Error al actualizar la contraseña'
    if (error.message.includes('should be different')) {
      errorMessage = 'La nueva contraseña debe ser diferente a la anterior.'
    } else if (error.message.includes('Password should be')) {
      errorMessage = 'La contraseña no es lo suficientemente segura.'
    }
    
    redirect(`/actualizar-password?error=true&message=${encodeURIComponent(errorMessage)}`)
  }

  // Success
  redirect('/actualizar-password?error=false&message=' + encodeURIComponent('¡Contraseña actualizada con éxito!'))
}
