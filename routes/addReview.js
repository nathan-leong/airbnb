const Review = require('../models/review')

const addReviewHandler = async (req,res) => {
    try {
        const {houseId, userId, comment} =  req.body
        await Review.create({houseId, userId, comment})
        res.statusCode = 200
        res.end(JSON.stringify({status: 'success'}))
    } catch (err) {
        res.statusCode = 500
        res.end(JSON.stringify({message: err}))
    }
}

module.exports = addReviewHandler