const db = require('../db')

// ✅ Update Contact Info in Users Table (PUT)
exports.updateContactInfo = (req, res) => {
  const { userId } = req.params
  const { phone, email, website, whatsapp } = req.body

  // Convert to JSON format
  const contactInfo = JSON.stringify({ phone, email, website, whatsapp })

  db.query(
    'UPDATE users SET contactInfo = ? WHERE id = ?',
    [contactInfo, userId],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: 'Database error', error: err.message })

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found.' })
      }

      res.status(200).json({ message: 'Contact info updated successfully!' })
    }
  )
}

// ✅ Get Contact Info (GET)
exports.getContactInfo = (req, res) => {
  const { userId } = req.params

  db.query(
    'SELECT contactInfo FROM users WHERE id = ?',
    [userId],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: 'Database error', error: err.message })

      if (result.length === 0 || !result[0].contactInfo) {
        return res.status(404).json({ message: 'No contact info found.' })
      }

      res.status(200).json({ contactInfo: JSON.parse(result[0].contactInfo) })
    }
  )
}
