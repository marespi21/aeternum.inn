'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getLocale } from 'next-intl/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  const locale = await getLocale()

  if (error) {
    redirect(`/${locale}/login?error=true&message=Credenciales incorrectas`)
  }

  const { data: { user } } = await supabase.auth.getUser();
  let nextUrl = formData.get('nextUrl') as string || '/perfil';

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
        
      const userRole = profile?.role?.trim().toUpperCase();

      if ((userRole === 'ADMIN' || userRole === 'STAFF') && !nextUrl.startsWith('/admin') && !nextUrl.startsWith(`/${locale}/admin`)) {
        nextUrl = `/${locale}/admin`;
      }
    }

  // Ensure nextUrl has locale
  if (!nextUrl.startsWith(`/${locale}`)) {
    nextUrl = `/${locale}${nextUrl.startsWith('/') ? nextUrl : `/${nextUrl}`}`
  }

  revalidatePath('/', 'layout')
  redirect(nextUrl)
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const phone = formData.get('phone') as string
  const fullName = formData.get('fullName') as string
  const docType = formData.get('docType') as string
  const docNumber = formData.get('docNumber') as string

  const locale = await getLocale()

  // Secure Password Validation
  if (password.length < 8) {
    redirect(`/${locale}/login?error=true&message=La contraseña debe tener al menos 8 caracteres`)
  }
  if (!/[A-Z]/.test(password)) {
    redirect(`/${locale}/login?error=true&message=La contraseña debe tener al menos una letra mayúscula`)
  }
  if (!/[0-9]/.test(password)) {
    redirect(`/${locale}/login?error=true&message=La contraseña debe tener al menos un número`)
  }

  const data = { email, password }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    let errorMessage = 'Error al crear la cuenta'
    if (error.message.includes('already registered') || error.code === 'user_already_exists') {
      errorMessage = 'Este correo electrónico ya está registrado.'
    } else if (error.message.includes('Password should be')) {
      errorMessage = 'La contraseña no es lo suficientemente segura.'
    }
    
    redirect(`/${locale}/login?error=true&message=${encodeURIComponent(errorMessage)}`)
  }

  // Update profile with all data if user was created
  if (authData?.user) {
    await supabase.from('profiles').upsert({
      id: authData.user.id,
      email: email,
      phone: phone || null,
      full_name: fullName || null,
      document_type: docType || null,
      document_number: docNumber || null,
      role: 'USER'
    }, { onConflict: 'id' })
  }

  let nextUrl = formData.get('nextUrl') as string || `/${locale}/perfil`
  if (!nextUrl.startsWith(`/${locale}`)) {
    nextUrl = `/${locale}${nextUrl.startsWith('/') ? nextUrl : `/${nextUrl}`}`
  }
  revalidatePath('/', 'layout')
  redirect(nextUrl)
}
