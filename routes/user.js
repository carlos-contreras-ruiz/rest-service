const { Router } = require('express')
const router = Router()
const {
    getUser,
    createUser,
    deleteUser,
    updateUser,
} = require('../controllers/user')

router.get('/', getUser)

router.post('/', createUser)

router.delete('/', deleteUser)

router.put('/:id', updateUser)

module.exports = router
