const Booking = require('../../models/booking')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const bookedDatesHandler = async (req,res) => {
    try {
        const getDatesBetweenDates = (startDate, endDate) => {
            let dates = []
            while (startDate < endDate) {
              dates = [...dates, new Date(startDate)]
              startDate.setDate(startDate.getDate() + 1)
            }
            // dates = [...dates, endDate]
            return dates
        }
        
        const houseId = req.body.houseId
        const results = await Booking.findAll({
            where: {
                houseId: houseId,
                endDate: {
                    [Op.gte]: new Date()
                }
            }
        })
        let bookedDates = []
        for (const result of results) {
            const dates = getDatesBetweenDates(
              new Date(result.startDate),
              new Date(result.endDate)
            )
        
            bookedDates = [...bookedDates, ...dates]
        }
    
        //remove duplicates
        bookedDates = [...new Set(bookedDates.map(date => date))]
        res.json({
            status: 'success',
            message: 'ok',
            dates: bookedDates
        })
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(JSON.stringify({error: err}))
    }
}

module.exports = bookedDatesHandler