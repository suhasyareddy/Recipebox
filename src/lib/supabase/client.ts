import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export const getCleanSupabaseUrl = (): string => {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return raw.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
};

export const isSupabaseConfigured = (): boolean => {
  const url = getCleanSupabaseUrl();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    key &&
    url.startsWith('https://') &&
    !url.includes('your-project') &&
    key !== 'your-supabase-anon-key-here' &&
    key.length > 15
  );
};

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!client) {
    client = createBrowserClient(
      getCleanSupabaseUrl(),
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  return client;
};
