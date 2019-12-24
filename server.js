const express = require('express')
const next = require('next')

const initSession = require('./middleware/session')
const initPassport = require('./middleware/passport')
const initModels = require('./middleware/initialiseModels')
const routes = require('./routes')

const port = parseInt(process.env.port, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
    const server = express()
    server.use(
        express.json()
    )
    initSession(server)
    initPassport(server)
    initModels()
    server.use('/api', routes)
    server.all('*', (req,res) => {
        return handle(req,res)
    })

    server.listen(port, err => {
        if (err) throw err
        console.log(`>ready on port ${port}`)
    })
})