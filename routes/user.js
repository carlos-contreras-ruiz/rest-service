const { Router } = require('express')
const { check } = require('express-validator')
const Role = require('../models/role')
const router = Router()
const {
    getUser,
    createUser,
    deleteUser,
    updateUser,
} = require('../controllers/user')
const { validarCamposUsuario } = require('../middlewares/userValidationFields')

router.get('/', getUser)

router.post(
    '/',
    [
        check('correo', 'El correo no es valido').isEmail(),
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check(
            'password',
            'El password es obligatorio y mayor de 6 letras'
        ).isLength({ min: 6 }),
        check('role', 'No es un role permitido').custom(async (role = '') => {
            const rolExist = await Role.findOne({ role })
            if (!rolExist) {
                throw new Error('Rol dosent exists')
            }
            return true
        }),
        validarCamposUsuario,
    ],
    createUser
)

router.delete('/', deleteUser)

router.put('/:id', updateUser)

module.exports = router
