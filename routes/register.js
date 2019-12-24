//import { User } from '../../../model'
const User = require('../models/user')

registerHandler = async (req, res) => {
    try{
        console.log(req.body)
        const {email, password, passwordconfirmation} = req.body
        if (password !== passwordconfirmation) {
            res.statusCode=403
            res.end(
              JSON.stringify({ status: 'error', message: 'Passwords do not match' })
            )
            return
        }
        const user = await User.create({ email, password})
        //console.log('User created:', user)
        console.log('req: ',req)
        //using passport log straight in if user created
        req.login(user, err => {
			if (err) {
                console.log('res.login error:', err)
				res.statusCode = 500
				res.end(JSON.stringify({ status: 'error', message: err }))
				return
            }
            return res.end(JSON.stringify({status:'success', messages: 'User added'}))
        })
    } catch (error) {
        //console.log(error)
        res.statusCode= 500
        let message = 'An error occurred'
        if (error.name === 'SequelizeUniqueConstraintError') {
        message = 'User already exists'
        }
        res.end(JSON.stringify({ status: 'error', error }))
    }
}

module.exports = registerHandler