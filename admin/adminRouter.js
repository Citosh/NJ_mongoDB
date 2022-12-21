const Router = require('express')
const router = Router()
const controller = require('./adminController')
const roleMiddleware = require('../middleware/roleMiddleware')


router.post('/addrole',roleMiddleware(["SUPERADMIN"]),controller.addRole)

module.exports = router