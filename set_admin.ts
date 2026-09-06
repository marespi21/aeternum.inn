import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// We need the service role key to update the profiles without RLS restrictions
// Since we don't have it, wait, we can just do it from Supabase SQL Editor.
