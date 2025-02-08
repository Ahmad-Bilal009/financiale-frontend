const express = require('express');
const router = express.Router();
const db = require('../db'); // Import MySQL database connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret Key for JWT
const SECRET_KEY = 'your_secret_key';

// User Login API
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare password with hashed password in database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    });
});

module.exports = router;
