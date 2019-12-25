const dotenv = require('dotenv')
dotenv.config()
const stripeSessionHandler = async (req,res) => {
    try {
        const amount = req.body.amount
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
            {
                name: 'Booking house on Airbnb clone',
                amount: amount*100,
                currency: 'aud',
                quantity: 1
            }
            ],
            success_url: process.env.BASE_URL + '/bookings',
            cancel_url: process.env.BASE_URL + '/bookings'
        })
    
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(
            JSON.stringify({
            status: 'success',
            sessionId: session.id,
            stripePublicKey: process.env.STRIPE_PUBLIC_KEY
            })
        )
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err)
    }
    
}

module.exports = stripeSessionHandler