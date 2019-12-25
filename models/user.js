const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')

const Model = Sequelize.Model
const DataTypes = Sequelize.DataTypes

const sequelize = require('../database.js')

class User extends Model {}

User.init({
    email: {
        type : DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    hooks: {
        beforeCreate: async user => {
          const saltRounds = 10
          const salt = await bcrypt.genSalt(saltRounds)
          user.password = await bcrypt.hash(user.password, salt)
        }
    },
    modelName: 'user',
    timestamps: false
})

User.prototype.isPasswordValid = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports= User