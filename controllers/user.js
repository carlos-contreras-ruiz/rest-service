const { response, request } = require('express')
const Usuario = require('../models/usuario')

const getUser = (req, res = response) => {
    res.json({
        msg: 'API get CONTROLLER',
    })
}

const createUser = async (req = request, res) => {
    const { nombre, correo, password } = req.body
    const usuario = new Usuario(req.body)
    await usuario.save()
    res.status(201).json({
        msg: 'Created',
        body: usuario,
    })
}

const updateUser = (req = request, res) => {
    const { name } = req.body
    const idUser = req.params.id
    const { apikey } = req.query
    res.status(201).json({
        msg: 'API post CONTROLLER ',
        apikey,
        body: {
            name,
            idUser,
        },
    })
}

const deleteUser = (req, res) => {
    res.json({
        msg: 'API delet CONTROLLER',
    })
}

module.exports = {
    getUser,
    createUser,
    deleteUser,
    updateUser,
}
