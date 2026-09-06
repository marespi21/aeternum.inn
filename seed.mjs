import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://lxrnmlckgmuoquwcheuw.supabase.co',
  'sb_publishable_FxxUhs74nkkCQQZSgPGHYA_4CKzv_zG'
)

async function seed() {
  console.log('Creando cuenta de admin...')
  
  // 1. Crear usuario
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: 'admin@aeternum.com',
    password: 'password123'
  })

  if (authError) {
    console.error('Error creando usuario (puede que ya exista):', authError.message)
    // Si ya existe, intentamos hacer login para obtener la sesión
    await supabase.auth.signInWithPassword({
      email: 'admin@aeternum.com',
      password: 'password123'
    })
  } else {
    console.log('Usuario creado:', authData.user?.email)
  }

  // Esperar un segundo para que el trigger de SQL cree el perfil
  await new Promise(r => setTimeout(r, 1000))

  // 2. Hacerlo ADMIN
  const { data: userData } = await supabase.auth.getUser()
  if (userData.user) {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'ADMIN' })
      .eq('id', userData.user.id)
    
    if (updateError) {
      console.error('Error haciendo admin al usuario:', updateError)
    } else {
      console.log('¡Usuario promovido a ADMIN exitosamente!')
    }
  }

  // 3. Crear un evento de prueba
  console.log('Creando evento de prueba...')
  const { data: eventData, error: eventError } = await supabase
    .from('events')
    .insert({
      title: 'AETERNUM SECRET PARTY',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // En 7 días
      price: 50000,
      total_tickets: 100
    })
    .select()

  if (eventError) {
    console.error('Error creando evento:', eventError)
  } else {
    console.log('Evento creado exitosamente con ID:', eventData[0].id)
  }

  console.log('Seed completado.')
}

seed()
