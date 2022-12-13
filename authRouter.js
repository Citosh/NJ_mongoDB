const Router = require('express')
const router = Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('./middleware/authMiddleware')


router.post('/registration',[
    check('username',"Имя дользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть не меньше 4 и не больше 10ти символов").isLength({min: 4,max: 10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', authMiddleware, controller.getUsers)

module.exports = router