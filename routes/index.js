const router = require('express').Router()

const addReviewHandler = require('./addReview')
const authRoutes = require('./auth')
const housesRoutes = require('./houses')
const stripeRoutes = require('./stripe')
const bookingsRoutes = require('./bookings')
const hostRoutes = require('./host')

router.use('/auth', authRoutes)
router.use('/houses', housesRoutes)
router.use('/stripe', stripeRoutes)
router.use('/bookings', bookingsRoutes)
router.use('/host', hostRoutes)

router.post('/review', (req,res) => addReviewHandler(req,res))

module.exports = router