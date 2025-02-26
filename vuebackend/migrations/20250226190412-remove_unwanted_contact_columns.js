'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "contactDetail");
    await queryInterface.removeColumn("Users", "contact");
    await queryInterface.removeColumn("Users", "contactInfo");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "contactDetail", {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.addColumn("Users", "contact", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};

