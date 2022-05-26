const { Router } = require('express')
const { check } = require('express-validator')
const {
    obtenerProductos,
    obtenerProductoId,
    actualizarProducto,
    crearProducto,
    borrarProducto,
} = require('../controllers/productos')

const {
    validarCamposUsuario,
    validateJWT,
    validateProductoById,
} = require('../middlewares')

const router = Router()

/**
 * /api/v1/productos
 */

//get all categories
router.get('/', obtenerProductos)

//get category by id
router.get(
    '/:id',
    [
        check('id', 'Id invalido check').isMongoId(),
        validateProductoById,
        validarCamposUsuario,
    ],
    obtenerProductoId
)

//update category
router.put(
    '/:id',
    [
        validateJWT,
        //check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('id', 'Id invalido check').isMongoId(),
        validateProductoById,
        validarCamposUsuario,
    ],
    actualizarProducto
)

//crear category
router.post(
    '/',
    [
        validateJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('usuario', 'El usuario es obligatorio').notEmpty().isMongoId(),
        check('usuario', 'El usuario es debe ser un mongoid').isMongoId(),
        check('categoria', 'El categoria es obligatorio').notEmpty(),
        check('categoria', 'El categoria debe ser mongo id').isMongoId(),
        validarCamposUsuario,
    ],
    crearProducto
)

//delete category by id
router.delete(
    '/:id',
    [check('id', 'Id invalido').isMongoId(), validateJWT, validarCamposUsuario],
    borrarProducto
)

module.exports = router
