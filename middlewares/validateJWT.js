const { response } = require('express')
const { request } = require('express')
const Usuario = require('../models/usuario')
const jwt = require('jsonwebtoken')

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token valido',
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATEKEYJWT)
        req.uid = uid
        const user = await Usuario.findById(uid)
        if (!user && user.estado != true) {
            return res.status(401).json({
                msg: 'Token no valido -usuario no existe',
            })
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: `No hay token valido: ${error}`,
        })
    }
}

module.exports = {
    validateJWT,
}
