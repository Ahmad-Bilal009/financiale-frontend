require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const db = require('./db')
const sequelize = require('./config/database')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

app.use('/upload', express.static(path.join(__dirname, 'upload')))

sequelize
  .sync({ alter: true })
  .then(() => console.log('Database synced successfully!'))
  .catch(err => console.error('Database sync failed:', err))

// Import Routes
const productRoutes = require('./routes/productRoutes')
const adminRoutes = require('./routes/admin')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const dashboardRoutes = require('./routes/dashboardRoutes')
const visitorRoutes = require('./routes/visitorRoute')
const visitorStatsRoutes = require('./routes/visitorstats')
const contactInfoRoutes = require('./routes/contactInfoRoutes')

// Use Routes
app.use('/api/products', productRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', userRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/visitors', visitorRoutes)
app.use('/api/users', contactInfoRoutes)
app.use('/api/visitorstats', visitorStatsRoutes)

// Default Route
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// Start Server
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
