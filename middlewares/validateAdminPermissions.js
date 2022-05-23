const { response } = require('express')
const { request } = require('express')

const validateAdminPermissions = async (
    req = request,
    res = response,
    next
) => {
    //const user = await Usuario.findById(uid)
    const user = req.user
    if (!user || user.role !== 'ADMIN_ROLE') {
        return res.status(401).json({ msg: 'Permisos insuficientes' })
    }
    next()
}

const hasRole = (...roles) => {
    return (req = request, res = response, next) => {
        const user = req.user
        if (!user || !roles.includes(user.role)) {
            return res
                .status(401)
                .json({ msg: `Permisos insuficientes ${roles}` })
        }
        next()
    }
}

module.exports = {
    validateAdminPermissions,
    hasRole,
}
