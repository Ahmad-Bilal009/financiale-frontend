'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Products', 'visitorCount', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: [] // Correct default value for JSON
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Products', 'visitorCount')
  }
}
