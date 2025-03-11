const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db') // Import MySQL connection
const nodemailer = require('nodemailer')
const { Op } = require('sequelize')
const User = require('../models/User') // Import updated User model
require('dotenv').config()

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

/**
 * Generate a 4-digit OTP
 */
const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString() // 4-digit OTP
}

router.post('/login', (req, res) => {
  const { email, password } = req.body

  //  Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' })
  }

  //  Check if user exists
  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: 'Database error', error: err.message })

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password!' })
      }

      const user = results[0]

      //  Ensure `isDisabled` is checked correctly (Fix for type inconsistency)
      const isUserDisabled =
        user.isDisabled === 1 ||
        user.isDisabled === true ||
        user.isDisabled === '1' ||
        user.isDisabled === 'true'

      if (isUserDisabled) {
        return res.status(403).json({
          message: 'Your account is disabled. Contact admin to regain access.'
        })
      }

      //  Compare password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password!' })
      }

      //  Generate JWT Token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          isDisabled: user.isDisabled
        },
        SECRET_KEY,
        { expiresIn: '2h' }
      )

      res.json({
        message: 'Login successful!',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      })
    }
  )
})

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required!' })
  }

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: 'User not found!' })
    }

    const otp = generateOtp()
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000) // OTP valid for 15 minutes

    // Store OTP in database
    await user.update({ resetOtp: otp, otpExpiresAt })

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      html: `<p>Your OTP for password reset is: <b>${otp}</b>. It will expire in 15 minutes.</p>`
    }

    await transporter.sendMail(mailOptions)

    res.json({ message: 'OTP sent to your email.' })
  } catch (error) {
    console.error('Error sending OTP:', error)
    res.status(500).json({ message: 'Error sending OTP', error: error.message })
  }
})

/**
 * Verify OTP
 */
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required!' })
  }

  try {
    const user = await User.findOne({
      where: { email, resetOtp: otp, otpExpiresAt: { [Op.gt]: new Date() } }
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP!' })
    }

    // OTP verified, clear it from the database
    await user.update({ resetOtp: null, otpExpiresAt: null })

    res.json({ message: 'OTP verified successfully!' })
  } catch (error) {
    console.error('OTP Verification Error:', error)
    res
      .status(500)
      .json({ message: 'Error verifying OTP', error: error.message })
  }
})

/**
 * Reset Password
 */
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body

  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ message: 'Email, OTP, and new password are required!' })
  }

  try {
    // ✅ Debug: Log incoming request data
    console.log('Reset Password Request:', { email, otp, newPassword })

    // ✅ Fetch user and validate OTP & expiration
    const user = await User.findOne({
      where: {
        email
      }
    })

    console.log(user, 'user')

    if (!user) {
      console.log('Invalid OTP or OTP expired for email:', email)
      return res.status(400).json({ message: 'Invalid or expired OTP!' })
    }

    // ✅ Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // ✅ Update the password and clear OTP fields
    await user.update({
      password: hashedPassword,
      resetOtp: null,
      otpExpiresAt: null
    })

    console.log('Password reset successful for:', email)
    res.json({ message: 'Password reset successfully!' })
  } catch (error) {
    console.error('Password Reset Error:', error)
    res
      .status(500)
      .json({ message: 'Error resetting password', error: error.message })
  }
})

module.exports = router
