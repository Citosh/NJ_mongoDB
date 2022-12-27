const Router = require('express')
const router = Router()
const {check} = require('express-validator') 
const controller = require('./managerController')

const roleMiddleware = require('../middleware/roleMiddleware')


router.post('/addproduct' ,[
    roleMiddleware(["MANAGER"]),
    check('name',"Product name cannt be ampty").notEmpty(),
],controller.addProduct)

router.post('/setquantity', roleMiddleware(["MANAGER"]), controller.setQuantity)
router.post('/setcost', roleMiddleware(["MANAGER"]), controller.setCost)
router.post('/setname', roleMiddleware(["MANAGER"]), controller.setName)
router.post('/deletproduct', roleMiddleware(["MANAGER"]), controller.deleteProduct)
router.get('/getshoppinghistory', roleMiddleware(["MANAGER"]), controller.getAllPurchaseHistory)
router.get('/getshoppinghistorybyname', roleMiddleware(["MANAGER"]), controller.getPurchaseHistorybyname)







module.exports = router