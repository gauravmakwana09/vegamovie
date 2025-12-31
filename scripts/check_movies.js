import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function checkMovies() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'movie_db',
        });

        console.log('Connected to database.');

        const [rows] = await connection.execute('SELECT id, title, category, type FROM movies ORDER BY created_at DESC');
        console.log('Movies found:', rows.length);
        console.table(rows);

        await connection.end();
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
}

checkMovies();
