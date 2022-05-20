const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const getUser = (req, res = response) => {
    res.json({
        msg: 'API get CONTROLLER',
    })
}

const createUser = async (req = request, res) => {
    const { nombre, correo, password, role } = req.body
    //verificar si correo existe
    const emailExist = await Usuario.findOne({ correo })
    if (emailExist) {
        return res.status(400).json({ msg: 'correo registrado' })
    }

    //Encriptra contraseña
    const salt = bcryptjs.genSaltSync()
    let passHas = ''
    if (password) {
        passHas = bcryptjs.hashSync(password, salt)
    } else {
        return res.status(400).json({ msg: 'El password es requerido' })
    }

    const usuario = new Usuario({
        nombre,
        correo,
        password: passHas,
        role,
    })

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
