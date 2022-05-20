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
        required: [true, 'El corrreo es obligatorio'],
        unique: true,
    },
    img: { type: String },
    rol: {
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

module.exports = model('Usuario', UsuarioSchema)
