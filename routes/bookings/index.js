const router = require('express').Router()
const bookingsCleanHandler = require('./bookingsClean')
const bookingsListHandler = require('./bookingsList')

router.get('/clean', (req,res) => bookingsCleanHandler(req,res))
router.get('/list', (req,res) => bookingsListHandler(req,res))

module.exports = router