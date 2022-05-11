require('dotenv').config()
const Server = require('./models/server')

const server = new Server()
server.listen()

/* 
*Common functional way
const express = require('express')
const app = express()
app.get('/', (req, res) => {
    res.send('Hello World')
}) */
