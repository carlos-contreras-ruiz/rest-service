const { Router } = require('express')
const { check } = require('express-validator')
const {
    crearCategoria,
    obtenerCategoriaId,
    obtenerCategorias,
    borrarCategorias,
    actualizarCategorias,
} = require('../controllers/category')
const { validarCamposUsuario, validateJWT } = require('../middlewares')
const { validateCategoriaById } = require('../middlewares/validateCategoryId')

const router = Router()

/**
 * /api/v1/categorias
 */

//get all categories
router.get('/', obtenerCategorias)

//get category by id
router.get(
    '/:id',
    [
        validateJWT,
        check('id', 'Id invalido check').isMongoId(),
        validateCategoriaById,
        validarCamposUsuario,
    ],
    obtenerCategoriaId
)

//update category
router.put(
    '/:id',
    [
        validateJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('id', 'Id invalido check').isMongoId(),
        validateCategoriaById,
        validarCamposUsuario,
    ],
    actualizarCategorias
)

//crear category
router.post(
    '/',
    [
        validateJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        validarCamposUsuario,
    ],
    crearCategoria
)

//delete category by id
router.delete(
    '/:id',
    [check('id', 'Id invalido').isMongoId(), validateJWT, validarCamposUsuario],
    borrarCategorias
)

module.exports = router
