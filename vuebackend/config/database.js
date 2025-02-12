const { Sequelize } = require('sequelize')
require('dotenv').config()

//  Create a Sequelize instance for MySQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false // Disable SQL query logging
  }
)

module.exports = sequelize
