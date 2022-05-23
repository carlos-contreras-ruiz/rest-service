const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()
const {
    getUsers,
    createUser,
    getUser,
    deleteUser,
    updateUser,
} = require('../controllers/user')

const {
    validateRol,
    validateEmailExists,
    userById,
} = require('../helpers/db-validators')

const {
    validarCamposUsuario,
    validateAdminPermissions,
    hasRole,
    validateJWT,
} = require('../middlewares')

/*const { validarCamposUsuario } = require('../middlewares/userValidationFields')
const {
    validateAdminPermissions,
    hasRole,
} = require('../middlewares/validateAdminPermissions')
const { validateJWT } = require('../middlewares/validateJWT')*/

//Routers definition
router.get('/usuarios', getUsers)
router.get('/usuario/:id', getUser)

router.post(
    '/',
    [
        check('correo', 'El correo no es valido').isEmail(),
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check(
            'password',
            'El password es obligatorio y mayor de 6 letras'
        ).isLength({ min: 6 }),
        check('role').custom(validateRol),
        check('correo').custom((correo) => validateEmailExists(correo)),
        validarCamposUsuario,
    ],
    createUser
)

router.delete(
    '/:id',
    [
        validateJWT,
        //validateAdminPermissions,
        hasRole('ADMIN_ROLE', 'VENTAS__ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(userById),
        validarCamposUsuario,
    ],
    deleteUser
)

router.put(
    '/:id',
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(userById),
        //check('role').custom(validateRol),
        validarCamposUsuario,
    ],
    updateUser
)

module.exports = router
