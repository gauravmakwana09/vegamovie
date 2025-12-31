import express from 'express';
const router = express.Router();
import db from './db.js';

// --- MOVIES ---

// Get all movies (with optional type filter)
router.get('/movies', async (req, res) => {
    const { type } = req.query;
    try {
        let query = 'SELECT * FROM movies';
        const params = [];
        if (type) {
            query += ' WHERE type = ?';
            params.push(type);
        }
        query += ' ORDER BY created_at DESC';
        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Add a movie
router.post('/movies', async (req, res) => {
    const { title, thumbnail, video_url, download_link, description, category, type } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO movies (title, thumbnail, video_url, download_link, description, category, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, thumbnail, video_url, download_link, description, category, type || 'movie']
        );
        // Return the inserted object
        const [newMovie] = await db.query('SELECT * FROM movies WHERE id = ?', [result.insertId]);
        res.status(201).json(newMovie[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Update a movie
router.put('/movies/:id', async (req, res) => {
    const { id } = req.params;
    const fields = req.body;
    try {
        if (Object.keys(fields).length === 0) return res.status(400).json({ error: 'No fields to update' });

        const setClause = Object.keys(fields).map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(fields), id];

        await db.query(`UPDATE movies SET ${setClause} WHERE id = ?`, values);
        res.json({ message: 'Movie updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Delete a movie
router.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM movies WHERE id = ?', [id]);
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// --- FEATURED MOVIE ---

router.get('/featured-movie', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM featured_movie LIMIT 1');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

router.post('/featured-movie', async (req, res) => {
    const body = req.body;
    try {
        const [result] = await db.query('INSERT INTO featured_movie SET ?', body);
        res.status(201).json({ id: result.insertId, ...body });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

router.put('/featured-movie/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        await db.query('UPDATE featured_movie SET ? WHERE id = ?', [body, id]);
        res.json({ message: 'Featured movie updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});


export default router;
