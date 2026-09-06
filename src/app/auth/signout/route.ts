import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  
  // Cerramos la sesión en supabase
  await supabase.auth.signOut()

  // Redirigimos siempre a la página de inicio
  return NextResponse.redirect(new URL('/', request.url))
}
