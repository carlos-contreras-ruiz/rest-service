/*const { validarCamposUsuario } = require('../middlewares/userValidationFields')
const {
    validateAdminPermissions,
    hasRole,
} = require('../middlewares/validateAdminPermissions')
const { validateJWT } = require('../middlewares/validateJWT')*/

const userValidationFields = require('../middlewares/userValidationFields')
const validateAdminPermissions = require('../middlewares/validateAdminPermissions')
const validateJWT = require('../middlewares/validateJWT')
const validateProductoById = require('../middlewares/validateProductId')

module.exports = {
    ...userValidationFields,
    ...validateAdminPermissions,
    ...validateJWT,
    ...validateProductoById,
}
