
const session = require('express-session')

const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sequelize = require('../model.js').sequelize
const sessionStore = new SequelizeStore({
    db: sequelize
})
//sessionStore.sync() // on initial run will create the session table 

module.exports = server => {
    server.use(
        session({
            secret: 'airbnb',
            resave: false,
            saveUninitialized: true,
            name: 'nextbnb',
            cookie: {
                secure: false,
                maxAge: 30*24*60*60*1000 //30 days
            },
            store: sessionStore
        })
    )
} 