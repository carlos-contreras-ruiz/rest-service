const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080
        //connect DB
        this.connectDB()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors())
        //JSON body
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/',
                createParentPath: true,
            })
        )
    }

    routes() {
        this.app.use('/api/v1/users', require('../routes/user'))
        this.app.use('/api/v1/auth', require('../routes/auth'))
        this.app.use('/api/v1/categorias', require('../routes/category'))
        this.app.use('/api/v1/productos', require('../routes/productos'))
        this.app.use('/api/v1/buscar', require('../routes/buscar'))
        this.app.use('/api/v1/files', require('../routes/files'))
    }

    listen() {
        this.app.listen(this.port, () =>
            console.log(`Runnning on port ${this.port}`)
        )
    }

    async connectDB() {
        await dbConnection()
    }
}

module.exports = Server
