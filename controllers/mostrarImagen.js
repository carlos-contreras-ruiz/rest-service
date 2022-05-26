const { response } = require('express')
const { request } = require('express')
const fs = require('fs')
const path = require('path')
const Usuario = require('../models/usuario')

const mostrarImagen = async (req = request, res = response) => {
    const { id, collection } = req.params

    if (collection !== 'usuarios') {
        return res.status(400).json({ msg: 'Valor no configurado' })
    }

    const usuario = await Usuario.findById(id)
    const pathImg = path.join(__dirname, '../uploads', collection, usuario.img)
    if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg)
    }

    res.status(404).json({
        msg: 'Imagen no encontrada',
    })
}

module.exports = {
    mostrarImagen,
}
