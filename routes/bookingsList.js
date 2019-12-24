const Booking = require('../models/booking')
const House = require('../models/house')
const User = require('../models/user')
const Op = require('sequelize').Op

const bookingsListHandler = async (req,res) => {
    try{
        console.log(req.session)
        if (!req.session.passport || !req.session.passport.user) {
            throw new Error('Unauthorized')
        }
        const user = await User.findOne({ where: {email: req.session.passport.user}})
        const response = await Booking.findAndCountAll({
            where: {
                userId: user.id,
                // paid: true
                endDate: {
                    [Op.gte]: new Date()
                }
            },
            order: [['startDate', 'ASC']]
        })
        const bookings = await Promise.all(
            response.rows.map(async booking => {
                const data = {}
                data.booking = booking.dataValues
                const houseData = await House.findByPk(data.booking.houseId)
                data.house = houseData.dataValues
                return data
            })
        )
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(bookings))
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err)
    }

}

module.exports = bookingsListHandler