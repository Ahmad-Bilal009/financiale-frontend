const User = require('../models/User')

// Get Contact Info for Logged-in User
exports.getContactInfo = async (req, res) => {
  try {
    const userId = req.params.userId // Get userId from params
    const user = await User.findByPk(userId, { attributes: ['contactInfo'] })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user.contactInfo || {}) // Return stored contact info (default empty object)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch contact info', error: error.message })
  }
}

// Update Contact Info for Logged-in User
exports.updateContactInfo = async (req, res) => {
  try {
    const userId = req.params.userId // Get userId from params
    const { whatsapp, website, contact, email } = req.body

    // Validate required fields
    if (!whatsapp || !website || !contact || !email) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    // Fetch User
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update contact info in JSON format
    await user.update({
      contactInfo: { whatsapp, website, contact, email }
    })

    res.json({
      message: 'Contact info updated successfully!',
      contactInfo: user.contactInfo
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update contact info', error: error.message })
  }
}
