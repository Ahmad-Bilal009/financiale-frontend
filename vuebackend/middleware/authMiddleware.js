const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'

// ✅ Middleware to Verify Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  // ✅ Ensure Authorization Header Exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Access Denied! No token provided.' })
  }

  // ✅ Extract Token
  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ message: 'Session expired! Please log in again.' })
    }
    if (error.name === 'JsonWebTokenError') {
      return res
        .status(401)
        .json({ message: 'Invalid token! Authentication failed.' })
    }
    return res.status(401).json({ message: 'Unauthorized access.' })
  }
}

// ✅ Middleware for Role-Based Access Control
const checkRole = roles => (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(403).json({ message: 'Access Forbidden! No role found.' })
  }

  if (!roles.includes(req.user.role)) {
    return res
      .status(403)
      .json({ message: "Access Forbidden! You don't have permission." })
  }

  next()
}

module.exports = { verifyToken, checkRole }
