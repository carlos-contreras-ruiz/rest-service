const express = require('express')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors())
        //JSON body
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use('/api/v1/users', require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () =>
            console.log(`Runnning on port ${this.port}`)
        )
    }
}

module.exports = Server
