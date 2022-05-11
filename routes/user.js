const { Router } = require('express')
const {
    getUser,
    createUser,
    deleteUser,
    updateUser,
} = require('../controllers/user')
const router = Router()

router.get('/', getUser)

router.post('/', createUser)

router.delete('/', deleteUser)

router.put('/:id', updateUser)

module.exports = router
