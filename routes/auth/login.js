const loginHandler = async (req,res) => {
    return res.end(
        JSON.stringify({
            status: 'success',
            message: 'Logged in'
        })
    )
}

module.exports = loginHandler