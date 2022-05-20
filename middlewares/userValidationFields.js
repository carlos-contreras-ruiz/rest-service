const { validationResult } = require('express-validator')

const validarCamposUsuario = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: 'Errores', errors: errors.errors })
    }
    next()
}

module.exports = {
    validarCamposUsuario,
}
