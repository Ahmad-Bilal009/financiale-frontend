const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db') // Import database connection

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running...')
})

const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes);



// Fetch all users from MySQL
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})

const PORT = process.env.PORT || 5001 // Use 5001 instead of 5000
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
