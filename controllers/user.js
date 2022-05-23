const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const getUsers = async (req = request, res = response) => {
    const { limit = 3, offset = 0 } = req.query
    const userP = () => {
        return Usuario.find({
            estado: true,
        })
            .skip(Number(offset))
            .limit(Number(limit))
    }

    const totalP = () => Usuario.countDocuments({ estado: true })

    const [usuarios, total] = await Promise.all([userP(), totalP()])
    res.json({
        msg: 'API get CONTROLLER',
        total,
        body: usuarios,
    })
}

const getUser = async (req = request, res = response) => {
    const user = await Usuario.findById(req.params.id)
    if (!user) {
        res.status(404).json({ msg: 'Usuario no encontrado' })
    }
    res.status(200).json({ msg: 'user found', body: user })
}

const createUser = async (req = request, res) => {
    const { nombre, correo, password, role } = req.body

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

const updateUser = async (req = request, res) => {
    const { _id, password, google, ...user } = req.body
    if (password) {
        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, user)
    res.status(201).json({
        msg: 'API post CONTROLLER ',
        body: {
            usuario,
        },
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    //borrar registro fisico
    //const usuario = await Usuario.findByIdAndDelete(id)
    //Cambiar el estado a false
    const usuario = await Usuario.findByIdAndUpdate(id, {
        estado: false,
    })
    res.json({
        msg: 'API delet CONTROLLER',
        body: usuario,
    })
}

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    getUser,
}
