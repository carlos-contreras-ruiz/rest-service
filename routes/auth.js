const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth')
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

module.exports = router
