const { request } = require('express')
const { response } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generarJWT')

const login = async (req = request, res = response) => {
    const { correo, password } = req.body

    try {
        //email exists and active
        const usuario = await Usuario.findOne({ correo, estado: true })
        if (!usuario) {
            return res
                .status(400)
                .json({ msg: 'Usuario o password incorrectos (email)' })
        }
        //Password
        if (!bcryptjs.compareSync(password, usuario.password)) {
            return res
                .status(400)
                .json({ msg: 'Usuario o password incorrectos (password)' })
        }
        //Generate JWT

        const token = await generarJWT(usuario.id)
        return res
            .status(200)
            .json({ msg: 'Login exito', token, body: usuario })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Hable con el admin+' })
    }
}

module.exports = {
    login,
}
