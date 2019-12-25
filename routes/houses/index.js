const router = require('express').Router()
const getHousesHandler = require('./getHouses')
const getHouseHandler = require('./getHouse')
const reserveHouseHandler = require('./reserveHouse')
const bookedDatesHandler = require('./bookedDates')

router.get('', (req,res) => getHousesHandler(req,res))
router.get('/:id', (req,res) => getHouseHandler(req,res))
router.post('/reserve', (req,res) => reserveHouseHandler(req,res))
router.post('/booked', (req,res) => bookedDatesHandler(req,res))

module.exports = router