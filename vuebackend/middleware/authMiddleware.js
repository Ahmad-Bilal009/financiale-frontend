const jwt = require('jsonwebtoken')
const db = require('../db')

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'

//  Middleware to Verify Token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access Denied! No token provided.' })
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY)

    //  Check if user is disabled before proceeding
    db.query(
      'SELECT isDisabled FROM users WHERE id = ?',
      [decoded.id],
      (err, results) => {
        if (err)
          return res.status(500).json({ message: 'Database error', error: err })

        if (results.length === 0) {
          return res.status(404).json({ message: 'User not found!' })
        }

        if (results[0].isDisabled) {
          return res.status(403).json({
            message: 'Account is disabled. Contact admin to enable access.'
          })
        }

        req.user = decoded
        next()
      }
    )
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token!' })
  }
}

//  Middleware for Role-Based Access Control
const checkRole = roles => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res
      .status(403)
      .json({ message: "Access Forbidden! You don't have permission." })
  }
  next()
}

module.exports = { verifyToken, checkRole }
