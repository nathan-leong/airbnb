const sanitizeHtml = require('sanitize-html')
const House = require('../../models/house')
const User = require('../../models/user')
const hostEdit = async (req,res) => {
    try {
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
        const houseData = req.body.house
        houseData.description = sanitizeHtml(houseData.description, {
            allowedTags: [ 'b', 'i', 'em', 'strong', 'p', 'br' ]
        })
        const user = await User.findOne({where: {email: req.session.passport.user}})
        const house = await House.findByPk(houseData.id)
        if (house) {
            if (house.hostId !== user.id){
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
            await House.update(houseData, {
                where: {id: houseData.id}
            })
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({ status: 'success', message: 'ok' }))
        } else {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            })
            res.end(
                JSON.stringify({
                    message: `Not found`
                })
            )
            return
        }
    } catch (err) {
        console.log(err)
        res.statusCode = 500
        res.send(err)
    }
}

module.exports = hostEdit