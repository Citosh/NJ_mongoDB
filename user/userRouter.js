const Router = require('express')
const router = Router()
const controller = require('./userController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/addtolist/:username', authMiddleware, controller.addToShoppingList)
router.get('/getproductbyname', authMiddleware, controller.getProductByName)
router.get('/getproducts', authMiddleware, controller.getProducts)
router.post('/changepassword/:username', authMiddleware, controller.changePassword)
router.post('/makepurchase/:username', authMiddleware, controller.makePurchase)







module.exports = router