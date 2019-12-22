const router = require('express').Router()
const registerHandler = require('./register')

router.post('/auth/register', (req,res) => registerHandler(req,res))

module.exports = router