const { request, response } = require('express')
const { isValidObjectId } = require('mongoose')
const Usuario = require('../models/usuario')
const Producto = require('../models/product')

const collecionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles']

const buscarUsuarios = async (termino = '', res = response) => {
    if (isValidObjectId(termino)) {
        const usuario = await Usuario.findById(termino)
        return res.status(200).json({
            results: usuario ? [usuario] : [],
        })
    }

    const regex = new RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }],
    })
    res.status(200).json({
        results: usuarios ? [usuarios] : [],
    })
}

const buscarProductos = async (termino = '', res = response) => {
    if (isValidObjectId(termino)) {
        const producto = await Producto.findById(termino)
        return res.status(200).json({
            results: producto ? [producto] : [],
        })
    }

    const regex = new RegExp(termino, 'i')
    const productos = await Producto.find({
        $or: [{ nombre: regex }, { descripcion: regex }],
        $and: [{ estado: true }],
    })
    res.status(200).json({
        results: productos ? [productos] : [],
    })
}

const buscar = (req = request, res = response) => {
    const { coleccion, termino } = req.params

    if (!collecionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${collecionesPermitidas}`,
        })
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break
        case 'categorias':
            break
        case 'productos':
            buscarProductos(termino, res)
            break
        case 'roles':
            break
        default:
            return res.status(500).json({
                msg: `Contacte al administrador`,
            })
    }
}

module.exports = {
    buscar,
}
