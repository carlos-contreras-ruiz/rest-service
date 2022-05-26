const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        require: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true,
    },
    descripcion: {
        type: String,
    },
    disponible: {
        type: Boolean,
        default: true,
    },
})

ProductoSchema.methods.toJSON = function () {
    const { __v, _id, ...producto } = this.toObject()
    producto.uid = _id
    return producto
}

module.exports = model('Producto', ProductoSchema)
