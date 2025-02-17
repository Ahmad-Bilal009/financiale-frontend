const mysql = require('mysql2')
require('dotenv').config()

// Create MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST, // MySQL Host
  user: process.env.DB_USER, // MySQL Username
  password: process.env.DB_PASS, // MySQL Password
  database: process.env.DB_NAME // MySQL Database Name
})

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error(' Database connection failed: ' + err.message)
    return
  }
  console.log(' Connected to MySQL Database!')
})

module.exports = db
