const { request } = require('express')
const { response } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generarJWT')
const { googleVerify } = require('../helpers/google_verify')

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

const googleLogin = async (req = request, res = response) => {
    const { id_token } = req.body

    try {
        const googleUser = await googleVerify(id_token)
        let usuario = await Usuario.findOne({ correo: googleUser.correo })
        if (!usuario) {
            const data = {
                nombre: googleUser.nombre,
                correo: googleUser.correo,
                password: 'google',
                img: googleUser.img,
                google: true,
                role: 'USER_ROLE',
            }
            usuario = new Usuario(data)
            await usuario.save()
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloqueado',
            })
        }
        const token = await generarJWT(usuario.id)
        res.json({
            msg: 'Todo bien',
            token,
            usuario,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Error al autenticar',
        })
    }
}

module.exports = {
    login,
    googleLogin,
}
