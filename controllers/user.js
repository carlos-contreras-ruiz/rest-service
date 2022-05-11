const { response, request } = require('express')

const getUser = (req, res = response) => {
    res.json({
        msg: 'API get CONTROLLER',
    })
}

const createUser = (req = request, res) => {
    const { name } = req.body
    res.status(201).json({
        msg: 'API post CONTROLLER ' + name,
        body: req.body,
    })
}

const updateUser = (req = request, res) => {
    const { name } = req.body
    const idUser = req.params.id
    const { apikey } = req.query
    res.status(201).json({
        msg: 'API post CONTROLLER ',
        apikey,
        body: {
            name,
            idUser,
        },
    })
}

const deleteUser = (req, res) => {
    res.json({
        msg: 'API delet CONTROLLER',
    })
}

module.exports = {
    getUser,
    createUser,
    deleteUser,
    updateUser,
}
