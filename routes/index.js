const passport = require('passport')
const router = require('express').Router()
const registerHandler = require('./register')
const logoutHandler = require('./logout')
const loginHandler = require('./login')
router.post('/auth/register', (req,res) => registerHandler(req,res))
router.post('/auth/logout', (req,res) => logoutHandler(req,res))
router.post('/auth/login', passport.authenticate('local'), (req,res) => loginHandler(req,res))

module.exports = router