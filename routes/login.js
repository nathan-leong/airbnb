const passport = require('passport')

const loginHandler = async (req,res) => {
    console.log(req)
    // passport.authenticate('local', (err, user,info) => {
    //     console.log(user)
    //     if (err) {
    //         res.statusCode = 500
    //         res.end(JSON.stringify({status:'error',message: err}))
    //         return
    //     }
    //     if (!user) {
    //         res.statusCode = 500
    //         res.end(
    //           JSON.stringify({
    //             status: 'error',
    //             message: 'No user matching credentials'
    //           })
    //         )
    //         return
    //     }
    //     req.login(user, err => {
    //         if (err) {
    //             res.statusCode = 500
    //             res.end(
    //               JSON.stringify({
    //                 status: 'error',
    //                 message: err
    //               })
    //             )
    //             return
    //         }
        
    //         return res.end(
    //             JSON.stringify({
    //                 status: 'success',
    //                 message: 'Logged in'
    //             })
    //         )
    //     })
    // })
    return res.end(
        JSON.stringify({
            status: 'success',
            message: 'Logged in'
        })
    )
}

module.exports = loginHandler