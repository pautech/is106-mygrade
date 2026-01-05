// src/setupTests.ts
import '@testing-library/jest-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://opaeptnvvhjjkkowmdky.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_FF5Ry-c6UZ7NjwdVnE96Aw_0MwcAeNW';

const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

(async () => {
  try {
    const res = await supabase.from('nonexistent_table').select('*').limit(1);
    console.log('result:', { status: res.status, error: res.error, data: res.data });
  } catch (err) {
    console.error('network/error:', err);
  }
})();