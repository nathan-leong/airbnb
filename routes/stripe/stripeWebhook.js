const dotenv = require('dotenv')
const Booking = require('../../models/booking')
const stripeWebhookHandler = async (req,res) => {
    console.log('Entered stripe webhook ')
    const sig = req.headers['stripe-signature']

    try {
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
        const event = await stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret)
        if (event.type === 'checkout.session.completed') {
            const sessionId = event.data.object.id
            await Booking.update(
                {paid: true},
                { where: {sessionId}}
            )
        }
    } catch (err) {
        console.log(err)
        res.writeHead(400, {
            'Content-Type': 'application/json'
          })
        res.end(JSON.stringify({ status: 'success', message: `Webhook Error: ${err.message}` }))
    }
    res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify({ received: true }))
}

module.exports = stripeWebhookHandler