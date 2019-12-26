const dotenv = require('dotenv')
dotenv.config()
const stripeSessionHandler = async (req,res) => {
    try {
        const {NODE_ENV, STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY, DEV_BASE_URL, PROD_BASE_URL, PORT} = process.env
        const amount = req.body.amount
        const stripe = require('stripe')(STRIPE_SECRET_KEY)
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
            success_url: (NODE_ENV == 'production' ? PROD_BASE_URL : DEV_BASE_URL) + PORT + '/bookings',
            cancel_url: (NODE_ENV == 'production' ? PROD_BASE_URL : DEV_BASE_URL) + PORT + '/bookings'
        })
    
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(
            JSON.stringify({
            status: 'success',
            sessionId: session.id,
            stripePublicKey: STRIPE_PUBLIC_KEY
            })
        )
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err)
    }
    
}

module.exports = stripeSessionHandler