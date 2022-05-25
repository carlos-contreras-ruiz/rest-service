const { Router } = require('express')
const { check } = require('express-validator')
const { login, googleLogin } = require('../controllers/auth')
const { validarCamposUsuario } = require('../middlewares/userValidationFields')

const router = Router()

router.post(
    '/login',
    [
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatorias').notEmpty(),
        validarCamposUsuario,
    ],
    login
)

router.post(
    '/google',
    [
        check('id_token', 'El id token es necesario').notEmpty(),
        validarCamposUsuario,
    ],
    googleLogin
)

module.exports = router
