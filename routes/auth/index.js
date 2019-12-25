const passport = require('passport')
const router = require('express').Router()
const registerHandler = require('./register')
const logoutHandler = require('./logout')
const loginHandler = require('./login')

router.post('/register', (req,res) => registerHandler(req,res))
router.post('/logout', (req,res) => logoutHandler(req,res))
router.post('/login', passport.authenticate('local'), (req,res) => loginHandler(req,res))

module.exports = router