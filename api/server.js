const express = require('express');
const cors = require('cors');
const db = require('./event_db');
const app = express();

app.use(cors());
app.use(express.json());

// ============================
// 1. Home: Get active/upcoming activities
// GET /api/events
// ============================
app.get('/api/events', (req, res) => {
    const sql = `
        SELECT e.*, c.category_name, o.org_name
        FROM events e
        JOIN categories c ON e.category_id = c.category_id
        JOIN organisations o ON e.org_id = o.org_id
        WHERE e.status IN ('active', 'upcoming')
        ORDER BY e.event_date ASC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// ============================
// 2. Search: Get active/upcoming activities by date, location, category
// GET /api/events/search?date=&location=&category=
// ============================
app.get('/api/events/search', (req, res) => {
    const { date, location, category } = req.query;
    let sql = `
        SELECT e.*, c.category_name, o.org_name
        FROM events e
        JOIN categories c ON e.category_id = c.category_id
        JOIN organisations o ON e.org_id = o.org_id
        WHERE e.status IN ('active', 'upcoming')
    `;
    const params = [];

    if (date) {
        sql += ' AND DATE(e.event_date) = ?';
        params.push(date);
    }
    if (location) {
        sql += ' AND e.location LIKE ?';
        params.push(`%${location}%`);
    }
    if (category) {
        sql += ' AND e.category_id = ?';
        params.push(category);
    }
    sql += ' ORDER BY e.event_date ASC';

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// ============================
// 3. Event Details
// GET /api/events/:id
// ============================
app.get('/api/events/:id', (req, res) => {
    const sql = `
        SELECT e.*, c.category_name, o.org_name, o.description AS org_description,
               o.contact_email AS org_email, o.website AS org_website
        FROM events e
        JOIN categories c ON e.category_id = c.category_id
        JOIN organisations o ON e.org_id = o.org_id
        WHERE e.event_id = ?
    `;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(results[0]);
    });
});

// ============================
// 4. All Categories (for search filtering)
// GET /api/categories
// ============================
app.get('/api/categories', (req, res) => {
    db.query('SELECT * FROM categories ORDER BY category_name', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// ============================
// 5. All Organisations 
// GET /api/organisations
// ============================
app.get('/api/organisations', (req, res) => {
    db.query('SELECT * FROM organisations', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
});