import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase URL or Key in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testing connection to:', supabaseUrl);

    // 1. Try to fetch one movie
    const { data, error } = await supabase.from('movies').select('*').limit(1);

    if (error) {
        console.error('❌ Connection Failed or Table Missing');
        console.error('Error Details:', error.message);
        console.error('Hint code:', error.code);

        if (error.code === '42P01') {
            console.log('\n>>> DIAGNOSIS: The "movies" table does not exist.');
            console.log('>>> FIX: You need to run the SQL query in your Supabase SQL Editor.');
        } else if (error.code === '42501') {
            console.log('\n>>> DIAGNOSIS: Permission Denied (Row Level Security).');
            console.log('>>> FIX: You need to disable RLS or add a policy to allow public access.');
        }
    } else {
        console.log('✅ Connection Successful!');
        console.log('Movies found:', data.length);
        if (data.length > 0) {
            console.log('Sample movie:', data[0].title);
        } else {
            console.log('Table is empty. Try adding a movie via the app.');
        }
    }
}

testConnection();
