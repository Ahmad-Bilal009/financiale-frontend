const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')
const { verifyToken, checkRole } = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

//  Get all users (Admin & Superadmin)
router.get(
  '/users',
  verifyToken,
  checkRole(['admin', 'superadmin']),
  (req, res) => {
    db.query(
      'SELECT id, name, email, role, isDisabled FROM users',
      (err, results) => {
        if (err)
          return res.status(500).json({ message: 'Database error', error: err })
        res.json(results)
      }
    )
  }
)

//  Add a new user
router.post(
  '/users',
  verifyToken,
  checkRole(['admin', 'superadmin']),
  upload.single('image'), // Middleware for handling image uploads
  async (req, res) => {
    let { name, email, password, role, isDisabled = false } = req.body

    // Ensure role is not null (Default to "user" if not provided)
    if (!role) {
      role = 'user'
    }

    // Admin can only create "user", Superadmin can create any role
    if (req.user.role === 'admin' && role !== 'user') {
      return res.status(403).json({ message: 'Admins can only create users!' })
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      // Store image path if uploaded
      const imagePath = req.file ? `/upload/${req.file.filename}` : null

      db.query(
        'INSERT INTO users (name, email, password, role, isDisabled, image) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, hashedPassword, role, isDisabled, imagePath],
        (err, result) => {
          if (err) {
            console.error(' Database error:', err.message)
            return res
              .status(500)
              .json({ message: 'Database error', error: err.message })
          }
          res.json({
            message: 'User added successfully!',
            userId: result.insertId,
            imageUrl: imagePath ? `http://localhost:5000${imagePath}` : null // Return full image URL
          })
        }
      )
    } catch (error) {
      res.status(500).json({ message: 'Server error', error })
    }
  }
)

router.put(
  '/users/:id',
  verifyToken,
  checkRole(['admin', 'superadmin']),
  (req, res) => {
    const { id } = req.params
    const { name, email, role, isDisabled } = req.body

    //  Ensure ID is a number
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid user ID' })
    }

    //  Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' })
    }

    //  Admin cannot update roles except "user"
    let query, values
    if (req.user.role === 'admin') {
      query =
        'UPDATE users SET name = ?, email = ?, isDisabled = ? WHERE id = ?'
      values = [name, email, isDisabled ?? 0, id] // Default `isDisabled` to `0`
    } else {
      query =
        'UPDATE users SET name = ?, email = ?, role = ?, isDisabled = ? WHERE id = ?'
      values = [name, email, role ?? 'user', isDisabled ?? 0, id] // Default role to "user"
    }

    //  Execute SQL query
    db.query(query, values, (err, result) => {
      if (err) {
        console.error(' Database error:', err.message)
        return res
          .status(500)
          .json({ message: 'Database error', error: err.message })
      }

      //  Check if rows were updated
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json({ message: 'User updated successfully!' })
    })
  }
)

//  Delete a user
router.delete(
  '/users/:id',
  verifyToken,
  checkRole(['admin', 'superadmin']),
  (req, res) => {
    const { id } = req.params

    //  Admin can only delete "users" (not admins or superadmins)
    if (req.user.role === 'admin') {
      db.query('SELECT role FROM users WHERE id = ?', [id], (err, results) => {
        if (err)
          return res.status(500).json({ message: 'Database error', error: err })
        if (results.length === 0)
          return res.status(404).json({ message: 'User not found!' })
        if (results[0].role !== 'user') {
          return res
            .status(403)
            .json({ message: 'Admins can only delete users!' })
        }

        db.query('DELETE FROM users WHERE id = ?', [id], err => {
          if (err)
            return res
              .status(500)
              .json({ message: 'Database error', error: err })
          res.json({ message: 'User deleted successfully!' })
        })
      })
    } else {
      //  Superadmin can delete anyone
      db.query('DELETE FROM users WHERE id = ?', [id], err => {
        if (err)
          return res.status(500).json({ message: 'Database error', error: err })
        res.json({ message: 'User deleted successfully!' })
      })
    }
  }
)

//  Toggle user enable/disable status
router.put(
  '/users/:id/toggle-disable',
  verifyToken,
  checkRole(['admin', 'superadmin']),
  (req, res) => {
    const { id } = req.params

    db.query(
      'SELECT role, isDisabled FROM users WHERE id = ?',
      [id],
      (err, results) => {
        if (err)
          return res.status(500).json({ message: 'Database error', error: err })
        if (results.length === 0)
          return res.status(404).json({ message: 'User not found!' })

        const user = results[0]

        //  Admins can only enable/disable "user" accounts
        if (req.user.role === 'admin' && user.role !== 'user') {
          return res
            .status(403)
            .json({ message: 'Admins can only enable/disable users!' })
        }

        const newStatus = !user.isDisabled
        db.query(
          'UPDATE users SET isDisabled = ? WHERE id = ?',
          [newStatus, id],
          err => {
            if (err)
              return res
                .status(500)
                .json({ message: 'Database error', error: err })
            res.json({
              message: `User ${
                newStatus ? 'disabled' : 'enabled'
              } successfully!`
            })
          }
        )
      }
    )
  }
)

module.exports = router
