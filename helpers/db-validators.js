const Role = require('../models/role')
const Usuario = require('../models/usuario')

const validateRol = async (role = '') => {
    const rolExist = await Role.findOne({ role })
    if (!rolExist) {
        throw new Error('Rol dosent exists')
    }
    return true
}

//verificar si correo existe
const validateEmailExists = async (correo) => {
    const emailExist = await Usuario.findOne({ correo })
    if (emailExist) {
        throw Error(`El correo ${correo} ya esta registrado`)
    }
}

const userById = async (id) => {
    const user = await Usuario.findById(id)
    if (!user) {
        throw Error(`El id ${id} no existe`)
    }
}

module.exports = {
    validateRol,
    validateEmailExists,
    userById,
}
