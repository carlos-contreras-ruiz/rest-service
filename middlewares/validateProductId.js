const { response } = require('express')
const { request } = require('express')
const Producto = require('../models/product')

const validateProductoById = async (req = request, res = response, next) => {
    const productId = req.params.id
    let producto
    try {
        producto = await Producto.findById(productId)
    } catch (error) {
        //console.log(error)
    }
    if (!producto) {
        return res.status(400).json({
            msg: 'ID invalido middle',
        })
    }
    req.producto = producto
    next()
}
module.exports = {
    validateProductoById,
}
