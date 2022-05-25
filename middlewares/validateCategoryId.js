const { response } = require('express')
const { request } = require('express')
const Categoria = require('../models/categoria')

const validateCategoriaById = async (req = request, res = response, next) => {
    const categoriaId = req.params.id
    let categoria
    try {
        categoria = await Categoria.findById(categoriaId)
    } catch (error) {
        //console.log(error)
    }
    if (!categoria) {
        return res.status(400).json({
            msg: 'ID invalido middle',
        })
    }
    req.categoria = categoria
    next()
}
module.exports = {
    validateCategoriaById,
}
