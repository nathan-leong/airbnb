const House = require('../models/house')
const Review = require('../models/review')
const User = require('../models/user')
const Booking = require('../models/booking')

const initModels = () => {
    House.sync({ alter: true })
    Review.sync({ alter: true })
    User.sync({ alter: true })
    Booking.sync({ alter: true })
}

module.exports = initModels