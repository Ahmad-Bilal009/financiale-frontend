const express = require('express')
const router = express.Router()
const db = require('../db') // Import MySQL connection
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Secret key for JWT (You should store this in .env)
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'

//  Login API
router.post('/login', (req, res) => {
  const { email, password } = req.body

  //  Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' })
  }

  //  Check if user exists
  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: 'Database error', error: err.message })

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password!' })
      }

      const user = results[0]

      //  Ensure `isDisabled` is checked correctly (Fix for type inconsistency)
      const isUserDisabled =
        user.isDisabled === 1 ||
        user.isDisabled === true ||
        user.isDisabled === '1' ||
        user.isDisabled === 'true'

      if (isUserDisabled) {
        return res.status(403).json({
          message: 'Your account is disabled. Contact admin to regain access.'
        })
      }

      //  Compare password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password!' })
      }

      //  Generate JWT Token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          isDisabled: user.isDisabled
        },
        SECRET_KEY,
        { expiresIn: '2h' }
      )

      res.json({
        message: 'Login successful!',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      })
    }
  )
})

module.exports = router
