'use strict'

const { toDefaultValue } = require('sequelize/lib/utils')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'status', {
      type: Sequelize.ENUM('pending', 'approval', 'rejected'),
      defaultValue: 'pending'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'status')
  }
}
