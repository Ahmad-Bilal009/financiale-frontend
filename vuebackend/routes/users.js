const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')

// Allowed roles
const allowedRoles = ['user', 'admin', 'superadmin']


// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Validate role
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert user into database
    db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role],
      (err, result) => {
        if (err) return res.status(500).json({ message: err.message })
        res.json({ message: 'User added successfully!', id: result.insertId })
      }
    )
    res.json({ message: 'User added successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})



module.exports = router
