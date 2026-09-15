import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // Step 1: Update Supabase session
  // Note: We don't pass the intlResponse here anymore. We will merge them after.
  const supabaseResponse = await updateSession(request)

  // If Supabase wants to redirect (e.g. not logged in), return its response directly
  if (supabaseResponse.headers.get('location')) {
    return supabaseResponse;
  }

  // Step 2: Handle i18n routing
  const intlResponse = handleI18nRouting(request);

  // Step 3: Merge cookies from Supabase response into intlResponse
  supabaseResponse.cookies.getAll().forEach(cookie => {
    intlResponse.cookies.set(cookie.name, cookie.value);
  });

  return intlResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api|auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|ogg|mp3|wav|flac|aac|woff|woff2|ttf|otf|eot|csv|pdf|json|txt|xml|mov)$).*)',
  ],
}
