require('dotenv').config()
const express = require('express')
const db = require('./db') // Import db.js instead of redefining db

const sequelize = require("./config/database");

sequelize.sync({ alter: true }) // Change to { force: true } only if you want to reset tables
  .then(() => console.log("Database synced successfully!"))
  .catch((err) => console.error("Database sync failed:", err));


const app = express()
const PORT = process.env.PORT || 5001

const cors = require('cors')
app.use(cors())

const productRoutes = require('./routes/productRoutes')
app.use('/api/products', productRoutes)

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
  console.log(` Server is running on port ${PORT}`)
})
