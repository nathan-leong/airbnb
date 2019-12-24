const Booking = require('../models/booking')

const bookingsCleanHandler = async (req,res) => {
    try {
        Booking.destroy({
            where: {
              paid: false
            }
          })
        
          res.writeHead(200, {
            'Content-Type': 'application/json'
          })
        
          res.end(
            JSON.stringify({
              status: 'Destroy success'
            })
          )
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.end(
            JSON.stringify({
              status: 'Destroy failed'
            })
          )
    }
}

module.exports = bookingsCleanHandler