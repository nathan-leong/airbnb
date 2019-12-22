import { User } from '../../../model'

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }
    const {email, password, passwordconfirmation} = req.body
    if (password !== passwordconfirmation) {
        res.statusCode=403
        res.end(
          JSON.stringify({ status: 'error', message: 'Passwords do not match' })
        )
        return
    }
    try{
        const user = await User.create({ email, password})
        res.end(JSON.stringify({status:'success', messages: 'User added'}))
    } catch (error) {
        console.log(error)
        res.statusCode= 500
        res.end(JSON.stringify({ status: 'error', error }))
    }
}