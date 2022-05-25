const { response } = require('express')
const { request } = require('express')
const Categoria = require('../models/categoria')

const crearCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase()
    let categoriaDb = await Categoria.findOne({ nombre })
    if (categoriaDb) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDb.nombre} ya existe`,
        })
    }

    const data = {
        nombre,
        usuario: req.uid,
    }
    categoriaDb = new Categoria(data)
    await categoriaDb.save()

    res.status(201).json({
        msg: 'success',
        body: categoriaDb,
    })
}

const obtenerCategorias = async (req = request, res = response) => {
    const { limit = 3, offset = 0 } = req.query
    const categoriasP = () => {
        return Categoria.find({
            estado: true,
        })
            .populate('usuario', 'nombre')
            .skip(Number(offset))
            .limit(Number(limit))
    }

    const totalP = () => Categoria.countDocuments({ estado: true })

    const [categorias, total] = await Promise.all([categoriasP(), totalP()])
    res.json({
        msg: 'API get CONTROLLER',
        total,
        body: categorias,
    })
}

const actualizarCategorias = async (req = request, res = response) => {
    const { estado, usuario, ...data } = req.body
    data.nombre = data.nombre.toUpperCase()
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, data)
    res.status(200).json({
        msg: 'Actualizado',
        body: categoria,
    })
}

const borrarCategorias = async (req = request, res = response) => {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, {
        estado: false,
    })
    res.status(200).json({
        msg: 'eliminado',
        body: categoria,
    })
}

const obtenerCategoriaId = (req = request, res = response) => {
    const categoria = req.categoria
    res.status(200).json({
        msg: 'Success',
        body: categoria,
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    actualizarCategorias,
    borrarCategorias,
    obtenerCategoriaId,
}
