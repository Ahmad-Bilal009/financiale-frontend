const bcrypt = require('bcrypt')
const sequelize = require('../config/database')
const User = require('../models/User')

async function seedUsers () {
  try {
    await sequelize.sync({ force: true }) // ⚠️ This will **reset** the database
    console.log(' Database synced!')

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        isDisabled: false
      },
      {
        name: 'Super Admin',
        email: 'superadmin@example.com',
        password: await bcrypt.hash('superadmin123', 10),
        role: 'superadmin',
        isDisabled: false
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: await bcrypt.hash('users123', 10),
        role: 'user',
        isDisabled: false
      }
    ]

    await User.bulkCreate(users)
    console.log(' Users seeded successfully!')

    process.exit() // Exit after seeding
  } catch (error) {
    console.error(' Error seeding users:', error)
    process.exit(1)
  }
}

seedUsers()
