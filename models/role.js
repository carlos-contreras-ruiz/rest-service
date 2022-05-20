const { Schema, model } = require('mongoose')

const RolSchema = Schema({
    role: {
        type: String,
        require: [true, 'El rol es requerido'],
    },
})

module.exports = model('Role', RolSchema)
