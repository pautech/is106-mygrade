// List columns for a given table using PostgREST (information_schema.columns)
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://opaeptnvvhjjkkowmdky.supabase.co';
const anon = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_FF5Ry-c6UZ7NjwdVnE96Aw_0MwcAeNW';
const table = process.env.SUPABASE_TABLE || 'studentgradeDB';

const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/information_schema.columns?table_name=eq.${encodeURIComponent(table)}`;

console.log('Querying columns:', endpoint);

try {
  const res = await fetch(endpoint, {
    headers: {
      apikey: anon,
      Authorization: `Bearer ${anon}`,
      Accept: 'application/json'
    }
  });

  console.log('HTTP', res.status, res.statusText);
  const data = await res.json();
  if (Array.isArray(data) && data.length === 0) {
    console.log('No columns returned. The table may not exist or access is restricted.');
  } else {
    console.log('Columns found:', data.map(c => ({ column_name: c.column_name, data_type: c.data_type })));
  }
} catch (err) {
  console.error('Error querying information_schema:', err);
}
