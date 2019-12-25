const router = require('express').Router()
const stripeSessionHandler = require('./stripeSession')
const stripeWebhookHandler = require('./stripeWebhook')

router.post('/session', (req,res) => stripeSessionHandler(req,res))
router.post('/webhook', (req,res) => stripeWebhookHandler(req,res))

module.exports = router