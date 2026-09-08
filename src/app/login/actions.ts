'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=true&message=Credenciales incorrectas')
  }

  const { data: { user } } = await supabase.auth.getUser();
  let nextUrl = formData.get('nextUrl') as string || '/perfil';

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role === 'ADMIN' && !nextUrl.startsWith('/admin')) {
      nextUrl = '/admin';
    }
  }

  revalidatePath('/', 'layout')
  redirect(nextUrl)
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Secure Password Validation
  if (password.length < 8) {
    redirect('/login?error=true&message=La contraseña debe tener al menos 8 caracteres')
  }
  if (!/[A-Z]/.test(password)) {
    redirect('/login?error=true&message=La contraseña debe tener al menos una letra mayúscula')
  }
  if (!/[0-9]/.test(password)) {
    redirect('/login?error=true&message=La contraseña debe tener al menos un número')
  }

  const data = { email, password }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    let errorMessage = 'Error al crear la cuenta'
    if (error.message.includes('already registered') || error.code === 'user_already_exists') {
      errorMessage = 'Este correo electrónico ya está registrado.'
    } else if (error.message.includes('Password should be')) {
      errorMessage = 'La contraseña no es lo suficientemente segura.'
    }
    
    redirect(`/login?error=true&message=${encodeURIComponent(errorMessage)}`)
  }

  const nextUrl = formData.get('nextUrl') as string || '/perfil'
  revalidatePath('/', 'layout')
  redirect(nextUrl)
}
