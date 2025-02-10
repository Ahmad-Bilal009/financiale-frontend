require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./db') // Import db.js instead of redefining db

const app = express()
const PORT = process.env.PORT || 5001

const cors = require("cors");
app.use(cors());


app.use(cors())
app.use(express.json())

const adminRoutes = require('./routes/admin')
app.use('/api/admin', adminRoutes)

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

const userRoutes = require('./routes/users')
app.use('/api', userRoutes)

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`)
})
