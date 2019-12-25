const sanitizeHtml = require('sanitize-html')
const User = require('../../models/user')
const House = require('../../models/house')

const hostNewHandler = async (req,res) => {
    try{
        const houseData = req.body.house
        if (!req.session.passport && !req.session.passport.user) {
            res.writeHead(403, {
              'Content-Type': 'application/json'
            })
            res.end(
              JSON.stringify({
                status: 'error',
                message: 'Unauthorized'
              })
            )
        
            return
        }
        const userEmail = req.session.passport.user
        const user = await User.findOne({where: {email: userEmail}})
        houseData.hostId = user.id
        houseData.description = sanitizeHtml(houseData.description, {
          allowedTags: [ 'b', 'i', 'em', 'strong', 'p', 'br' ]
        })
        await House.create(houseData)
        res.writeHead(200, {
            'Content-Type': 'application/json'
          })
        res.end(JSON.stringify({ status: 'success', message: 'ok' }))
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err)
    }

}

module.exports = hostNewHandler