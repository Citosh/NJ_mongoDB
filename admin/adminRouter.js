const Router = require('express')
const router = Router()
const controller = require('./adminController')
const roleMiddleware = require('../middleware/roleMiddleware')


router.post('/addrole' ,roleMiddleware(["SUPERADMIN"]),controller.addRole)
router.post('/banuser' ,roleMiddleware(["ADMIN"]) ,controller.banUser)
router.post('/unbanuser' ,roleMiddleware(["ADMIN"]) ,controller.unBanUser)
router.get('/users', controller.getUser)




module.exports = router