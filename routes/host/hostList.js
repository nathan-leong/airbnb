const User = require('../../models/user')
const House = require('../../models/house')
const Booking = require('../../models/booking')
const Op = require('sequelize').Op
const hostListHandler = async (req,res) => {
    try {
        if (!req.session.passport || !req.session.passport.user) {
            res.writeHead(403, {
            'Content-Type': 'application/json'
            })
            res.end(
            JSON.stringify({
                status: 'error',
                message: 'Unauthorized'
            })
            )
        
            return
        }


        const userEmail = req.session.passport.user
        const user = await User.findOne({ where: {email: userEmail}})
        const houses = await House.findAll({where: {hostId:user.id}})
        const houseIds = houses.map(house => house.dataValues.id)
        const bookingsData = await Booking.findAll({
            where: {
                // paid: true,
                houseId: {
                    [Op.in]: houseIds
                },
                endDate: {
                    [Op.gte]: new Date()
                }
            },
            order: [['startDate','ASC']]
        })
        const bookings = await Promise.all(
            bookingsData.map(async booking => {
                return {
                    booking: booking.dataValues,
                    house: houses.filter(
                        house => house.dataValues.id === booking.dataValues.houseId
                    )[0].dataValues
                }
            })
        )
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({bookings, houses}))
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err)
    }

}

module.exports = hostListHandler