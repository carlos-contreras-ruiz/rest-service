const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    correo: {
        type: String,
        required: [true, 'El corrreo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
        unique: true,
    },
    img: { type: String },
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    estado: { type: Boolean, default: true },
    google: {
        type: Boolean,
        default: false,
    },
})

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject()
    usuario.uid = _id
    return usuario
}

module.exports = model('Usuario', UsuarioSchema)
