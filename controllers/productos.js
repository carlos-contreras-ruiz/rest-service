const { response } = require('express')
const { request } = require('express')
const Producto = require('../models/product')

const crearProducto = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase()

    let productoDb = await Producto.findOne({ nombre })
    if (productoDb) {
        return res.status(400).json({
            msg: `La Producto ${ProductoDb.nombre} ya existe`,
        })
    }

    const { estado, ...rest } = req.body
    const data = {
        ...rest,
        nombre,
        estado: true,
    }
    ProductoDb = new Producto(data)
    await productoDb.save()

    res.status(201).json({
        msg: 'success',
        body: productoDb,
    })
}

const obtenerProductos = async (req = request, res = response) => {
    const { limit = 3, offset = 0 } = req.query
    const ProductosP = () => {
        return Producto.find({
            estado: true,
        })
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(offset))
            .limit(Number(limit))
    }

    const totalP = () => Producto.countDocuments({ estado: true })

    const [productos, total] = await Promise.all([ProductosP(), totalP()])
    res.json({
        msg: 'API get CONTROLLER',
        total,
        body: productos,
    })
}

const actualizarProducto = async (req = request, res = response) => {
    const { categoria, usuario, ...data } = req.body
    data.nombre = data.nombre?.toUpperCase()
    const producto = await Producto.findByIdAndUpdate(req.params.id, data, {
        new: true,
    })
    res.status(200).json({
        msg: 'Actualizado',
        body: producto,
    })
}

const borrarProducto = async (req = request, res = response) => {
    const producto = await Producto.findByIdAndUpdate(
        req.params.id,
        {
            estado: false,
        },
        { new: true }
    )
    res.status(200).json({
        msg: 'eliminado',
        body: producto,
    })
}

const obtenerProductoId = (req = request, res = response) => {
    const producto = req.producto
    res.status(200).json({
        msg: 'Success',
        body: producto,
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto,
    obtenerProductoId,
}
