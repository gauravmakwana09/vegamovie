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

async function testUpload() {
    console.log('Testing upload to:', supabaseUrl);

    // Payload exactly matching what MediaManager.jsx sends
    const payload = {
        title: 'Test Movie ' + Date.now(),
        year: '2024',
        genre: 'Action',
        duration: '2h',
        thumbnail: 'https://example.com/thumb.jpg',
        description: 'Test description',
        download_link: 'https://example.com/dl',
        category: 'Latest Releases',
        type: 'movie'
    };

    console.log('Attempting to insert:', payload);

    const { data, error } = await supabase.from('movies').insert([payload]).select();

    if (error) {
        console.error('❌ Upload Failed');
        console.error('Error Details:', error.message);
        console.error('Hint code:', error.code);

        if (error.code === '42703') {
            console.log('\n>>> DIAGNOSIS: Schema Mismatch. The column (likely "year", "genre", or "duration") does not exist in the "movies" table.');
            console.log('>>> FIX: You need to run SQL to add these columns.');
        } else if (error.code === '42501') {
            console.log('\n>>> DIAGNOSIS: Permission Denied (Row Level Security).');
        }
    } else {
        console.log('✅ Upload Successful!');
        console.log('Inserted:', data[0]);
        // Cleanup
        await supabase.from('movies').delete().eq('id', data[0].id);
    }
}

testUpload();
