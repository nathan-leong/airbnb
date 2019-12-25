const router = require('express').Router()
const hostListHandler = require('./hostList')
const hostNewHandler = require('./hostNew')
const hostEditHandler = require('./hostEdit')
router.get('/list', (req,res) => hostListHandler(req,res))
router.post('/new', (req,res) => hostNewHandler(req,res))
router.post('/edit', (req,res) => hostEditHandler(req,res))
module.exports = router