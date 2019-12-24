const passport = require('passport')
const router = require('express').Router()
const registerHandler = require('./register')
const logoutHandler = require('./logout')
const loginHandler = require('./login')

const getHousesHandler = require('./getHouses')
const getHouseHandler = require('./getHouse')
const reserveHouseHandler = require('./reserveHouse')
const bookedDatesHandler = require('./bookedDates')
const addReviewHandler = require('./addReview')
const stripeSessionHandler = require('./stripeSession')
const stripeWebhookHandler = require('./stripeWebhook')

const bookingsCleanHandler = require('./bookingsClean')
const bookingsListHandler = require('./bookingsList')

router.post('/auth/register', (req,res) => registerHandler(req,res))
router.post('/auth/logout', (req,res) => logoutHandler(req,res))
router.post('/auth/login', passport.authenticate('local'), (req,res) => loginHandler(req,res))
router.get('/houses', (req,res) => getHousesHandler(req,res))
router.get('/houses/:id', (req,res) => getHouseHandler(req,res))
router.post('/houses/reserve', (req,res) => reserveHouseHandler(req,res))
router.post('/houses/booked', (req,res) => bookedDatesHandler(req,res))

router.post('/review', (req,res) => addReviewHandler(req,res))

router.post('/stripe/session', (req,res) => stripeSessionHandler(req,res))
router.post('/stripe/webhook', (req,res) => stripeWebhookHandler(req,res))

router.get('/bookings/clean', (req,res) => bookingsCleanHandler(req,res))
router.get('/bookings/list', (req,res) => bookingsListHandler(req,res))

module.exports = router