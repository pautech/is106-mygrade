// Simple connectivity check using Supabase REST endpoint (PostgREST)
// Usage:
//   VITE_SUPABASE_URL=... VITE_SUPABASE_ANON_KEY=... STUDENT_ID=221-00295 node scripts/test-supabase.mjs

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://opaeptnvvhjjkkowmdky.supabase.co';
const anon = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_FF5Ry-c6UZ7NjwdVnE96Aw_0MwcAeNW';
const id = process.env.STUDENT_ID || '221-00295';
const table = process.env.SUPABASE_TABLE || 'studentgradeDB';

const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${encodeURIComponent(table)}?ID=eq.${encodeURIComponent(id)}`;

console.log('Querying:', endpoint);

try {
  const res = await fetch(endpoint, {
    headers: {
      apikey: anon,
      Authorization: `Bearer ${anon}`,
      Accept: 'application/json'
    }
  });

  console.log('HTTP', res.status, res.statusText);

  const text = await res.text();
  try {
    const data = JSON.parse(text || 'null');
    console.log('Response JSON:', JSON.stringify(data, null, 2));
  } catch (e) {
    console.log('Response body:', text);
  }

  if (!res.ok) {
    console.error('Request failed. Check anon key and RLS policies.');
    process.exitCode = 2;
  }
} catch (err) {
  console.error('Network or fetch error:', err);
  process.exitCode = 3;
}
