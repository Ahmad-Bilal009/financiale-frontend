const db = require('../db')

exports.updateContactInfo = (req, res) => {
  const { userId } = req.params
  const { phone, email, website, whatsapp } = req.body

  // Ensure contactInfo is always a valid JSON string
  const contactInfo = JSON.stringify({
    phone: phone || '',
    email: email || '',
    website: website || '',
    whatsapp: whatsapp || ''
  })

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

exports.getContactInfo = (req, res) => {
  const { userId } = req.params

  db.query(
    'SELECT IFNULL(contactInfo, "{}") AS contactInfo FROM users WHERE id = ?',
    [userId],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: 'Database error', error: err.message })

      if (result.length === 0) {
        return res.status(404).json({ message: 'No contact info found.' })
      }

      res.status(200).json({ contactInfo: JSON.parse(result[0].contactInfo) })
    }
  )
}
