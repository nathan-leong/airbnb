const Sequelize = require('sequelize')

const user = 'postgres'
const password = 'postgres'
const host = 'airbnb.crs2fmapc00e.ap-southeast-2.rds.amazonaws.com'
const database = 'postgres'

const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: 'postgres',
    logging: false
  })

module.exports = sequelize