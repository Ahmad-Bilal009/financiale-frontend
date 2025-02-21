const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  productInformation: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, 
  productType: {
    type: DataTypes.ENUM("Type1", "Type2", "Type3"),
    allowNull: false,
  },
  creditGuarantees: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  stageOfEntrepreneurship: {
    type: DataTypes.ENUM("Startup", "Growth", "Mature"),
    allowNull: false,
  },
  objectiveOfCredit: {
    type: DataTypes.ENUM("Expansion", "Inventory", "Working Capital"),
    allowNull: false,
  },
  benefitsOfEntrepreneurship: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  geographicCoverage: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  requirement: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contactDetail: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending", // Default status is pending
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Product.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Product;
