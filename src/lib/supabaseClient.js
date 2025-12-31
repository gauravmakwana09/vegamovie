import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            select: () => Promise.resolve({ data: null, error: null }),
            insert: () => Promise.resolve({ data: null, error: 'Missing Supabase URL/Key' }),
            update: () => Promise.resolve({ data: null, error: 'Missing Supabase URL/Key' }),
            delete: () => Promise.resolve({ data: null, error: 'Missing Supabase URL/Key' }),
        })
    };
