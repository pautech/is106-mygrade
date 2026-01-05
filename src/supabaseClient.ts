import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://opaeptnvvhjjkkowmdky.supabase.co'
const supabaseAnonKey = 'sb_publishable_FF5Ry-c6UZ7NjwdVnE96Aw_0MwcAeNW'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)