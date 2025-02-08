require('dotenv').config()
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '12345678',
  database: process.env.DB_NAME || 'vue_db'
})

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('❌ MySQL Connection Failed:', err)
    return
  }
  console.log('✅ Connected to MySQL Database')
})

module.exports = db
