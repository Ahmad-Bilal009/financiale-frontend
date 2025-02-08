const express = require('express');
const router = express.Router();
const db = require('../db'); // Import database connection

// Get all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Create a new user
router.post('/add', (req, res) => {
    const { name, email, password } = req.body;
    db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'User added successfully', userId: result.insertId });
        }
    );
});

module.exports = router;
