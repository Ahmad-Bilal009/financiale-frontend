const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin', 'superadmin'),
      allowNull: false
    },
    isDisabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image: {
      type: DataTypes.STRING, // Store image path
      allowNull: true
    },
    contactInfo: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {}
    },
    resetOtp: {
      type: DataTypes.STRING, // Store OTP as string
      allowNull: true
    },
    otpExpiresAt: {
      type: DataTypes.DATE, // Store OTP expiration timestamp
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false
  }
)

module.exports = User
