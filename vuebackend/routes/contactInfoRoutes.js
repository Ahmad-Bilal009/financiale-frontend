const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Route to get contact info for a specific user
router.get('/:userId/contact-info', userController.getContactInfo)

// Route to update contact info for a specific user
router.put('/:userId/contact-info', userController.updateContactInfo)

module.exports = router
