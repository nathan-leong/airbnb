const Sequelize = require('sequelize')
const sequelize = require('../database.js')

class House extends Sequelize.Model {}

House.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    host: { type: Sequelize.DataTypes.STRING, allowNull: false },
    picture: { type: Sequelize.DataTypes.STRING, allowNull: false },
    type: { type: Sequelize.DataTypes.STRING },
    town: { type: Sequelize.DataTypes.STRING, allowNull: false },
    title: { type: Sequelize.DataTypes.STRING, allowNull: false },
    price: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    superhost: { type: Sequelize.DataTypes.BOOLEAN},
    description: { type: Sequelize.DataTypes.TEXT },
    guests: { type: Sequelize.DataTypes.INTEGER },
    bedrooms: { type: Sequelize.DataTypes.INTEGER },
    beds: { type: Sequelize.DataTypes.INTEGER },
    baths: { type: Sequelize.DataTypes.INTEGER },
    wifi: { type: Sequelize.DataTypes.BOOLEAN },
    kitchen: { type: Sequelize.DataTypes.BOOLEAN },
    heating: { type: Sequelize.DataTypes.BOOLEAN },
    freeParking: { type: Sequelize.DataTypes.BOOLEAN },
    entirePlace: { type: Sequelize.DataTypes.BOOLEAN }
  },
  {
    sequelize,
    modelName: 'house',
    timestamps: false
  }
)

module.exports = House