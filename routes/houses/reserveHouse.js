const User = require('../../models/user')
const Booking = require('../../models/booking')
const reserveHouseHandler = async (req,res) => {
    const userEmail = req.session.passport.user
    try {
        const {houseId, startDate,endDate,sessionId} = req.body
        const user = await User.findOne({ where: {email: userEmail }})
        await Booking.create({
            houseId,
            startDate,
            endDate,
            sessionId,
            userId: user.id
        })
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({status: 'success'}))
    } catch (err) {
        res.statusCode = 500
        res.send(err)
    }
}

module.exports = reserveHouseHandler