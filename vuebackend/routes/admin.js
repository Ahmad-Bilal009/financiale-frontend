const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')
const { verifyToken, checkRole } = require('../middleware/authMiddleware')

// ✅ Get all users (Admin & Superadmin)
router.get(
  '/users',
  verifyToken,
  checkRole(['admin', 'superadmin']),
  (req, res) => {
    db.query('SELECT id, name, email, role FROM users', (err, results) => {
      if (err) return res.status(500).send(err)
      res.json(results)
    })
  }
)

// ✅ Add a new user
router.post(
  '/users',
  verifyToken,
  checkRole(['admin', 'superadmin']),
  async (req, res) => {
    const { name, email, password, role } = req.body

    // ✅ Admin can only create "user", Superadmin can create any role
    if (req.user.role === 'admin' && role !== 'user') {
      return res.status(403).json({ message: 'Admins can only create users!' })
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role],
        (err, result) => {
          if (err) return res.status(500).send(err)
          res.json({
            message: 'User added successfully!',
            userId: result.insertId
          })
        }
      )
    } catch (error) {
      res.status(500).json({ message: 'Server error', error })
    }
  }
)

// ✅ Update a user
router.put(
  '/users/:id',
  verifyToken,
  checkRole(['admin', 'superadmin']),
  (req, res) => {
    const { id } = req.params
    const { name, email, role } = req.body

    // ✅ Admin cannot update roles except "user"
    if (req.user.role === 'admin' && role !== 'user') {
      return res.status(403).json({ message: 'Admins can only update users!' })
    }

    db.query(
      'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
      [name, email, role, id],
      (err, result) => {
        if (err) return res.status(500).send(err)
        res.json({ message: 'User updated successfully!' })
      }
    )
  }
)

// ✅ Delete a user
router.delete(
  '/users/:id',
  verifyToken,
  checkRole(['admin', 'superadmin']),
  (req, res) => {
    const { id } = req.params

    // ✅ Check if admin is trying to delete an admin or superadmin
    if (req.user.role === 'admin') {
      db.query('SELECT role FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err)
        if (results.length === 0)
          return res.status(404).json({ message: 'User not found!' })
        if (results[0].role !== 'user') {
          return res
            .status(403)
            .json({ message: 'Admins can only delete users!' })
        }

        db.query('DELETE FROM users WHERE id = ?', [id], err => {
          if (err) return res.status(500).send(err)
          res.json({ message: 'User deleted successfully!' })
        })
      })
    } else {
      // ✅ Superadmin can delete anyone
      db.query('DELETE FROM users WHERE id = ?', [id], err => {
        if (err) return res.status(500).send(err)
        res.json({ message: 'User deleted successfully!' })
      })
    }
  }
)

module.exports = router
