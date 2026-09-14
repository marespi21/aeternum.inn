import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // URL to redirect to after sign in process completes
  // "next" is usually a path like "/actualizar-password"
  let next = searchParams.get('next') ?? '/es'
  
  // Asegurar que tenga el prefijo de idioma para evitar doble redirección que puede perder la sesión
  if (!next.startsWith('/es/') && !next.startsWith('/en/') && next !== '/es' && next !== '/en') {
    next = `/es${next.startsWith('/') ? next : `/${next}`}`
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') 
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // Return the user to an error page with some instructions
  return NextResponse.redirect(`${origin}/login?error=true&message=${encodeURIComponent('El enlace de recuperación es inválido o ha expirado')}`)
}
