const House = require('../models/house')

const getHousesHandler = (req,res) => {
    House.findAndCountAll().then(result => {
        const houses = result.rows.map(house => house.dataValues)
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(houses))
    })

}

module.exports = getHousesHandler