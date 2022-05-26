const { v4: uuidv4 } = require('uuid')
const path = require('path')

const subirArchivo = (
    files,
    folder = 'default',
    extensionesPermitidas = ['png', 'jpg', 'jpeg']
) => {
    return new Promise((resolve, reject) => {
        const { archivo } = files
        const cortado = archivo.name.split('.')
        const extension = cortado[cortado.length - 1]

        if (!extensionesPermitidas.includes(extension)) {
            return reject('Extension no valida')
        }

        const nombreTemp = uuidv4() + '.' + extension
        let uploadPath = path.join(
            __dirname,
            '../uploads/',
            folder,
            '/',
            nombreTemp
        )

        archivo.mv(uploadPath, function (err) {
            if (err) return reject('Somethin goes wrong')

            resolve(uploadPath)
        })
    })
}

module.exports = {
    subirArchivo,
}
