const passport = require('passport')

const loginHandler = async (req,res) => {
    console.log(req)
    return res.end(
        JSON.stringify({
            status: 'success',
            message: 'Logged in'
        })
    )
}

module.exports = loginHandler