const { Router } = require('express')
const { mostrarImagen } = require('../controllers/mostrarImagen')

const { subirArchivo } = require('../helpers/subirArchivo')

const router = Router()

router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.')
    }

    if (!req.files.archivo) {
        return res.status(400).send('No files were uploaded.')
    }

    subirArchivo(req.files, 'usuarios')
        .then((path) => {
            console.log(path)
            res.json({
                path,
            })
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                error: error,
            })
        })
})

router.get('/:collection/:id', mostrarImagen)

module.exports = router
