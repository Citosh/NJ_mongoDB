const User = require('../models/User')
const Role = require('../models/Role')
const Banned = require('../models/Banned')
const Good = require('../models/Goods')
const ShoppingCart = require('../models/ShoppingCart')
const ShoppingHistory = require('../models/ShoppingHistory')
const bcrypt = require('bcrypt')

class userController {

        async addToShoppingList(req,res){

            try {
                const username = req.params.username
                const {name, quantity} = req.body
                const product = await Good.findOne({name : name})
    
                if(!product){
                    return res.status(400).json(`product ${name} does not exists`)
                }
                if (product.quantity < quantity){
                    return res.status(400).json(`we have anly ${product.quantity} of ${name}`)
                }
                const ifCartExists = await ShoppingCart.findOne({username : username})
                
                if(!ifCartExists){
                   await ShoppingCart.create({
                        username : username,
                        list : {
                            product : name,
                            quantity : quantity
                        }
                    })
                }else{
                    await ShoppingCart.findOneAndUpdate(
                        {username : username},
                        {  $addToSet : {
                            list : {
                                product : name,
                                quantity : quantity
                            }
                        }}
                    )
                    res.status(200).json(`product ${name} added to cart in quantity of ${quantity}`)
                }
            } catch (error) {
                console.log(error)
            }


        }

        async getProductByName(req,res){
            try {
                const {name} = req.body
                const product = await Good.findOne({name : name})
                if(!product){
                    res.status(400).json(`product ${name} does not exists`)
                }
                res.status(200).json(product)
            } catch (error) {
                console.log(error)
            }
        }

        async getProducts(req,res){
            try {
                const products = await Good.find()
               return res.status(200).json(products)
            } catch (error) {
                console.log(error);
            }
        }

        async makePurchase(req,res){
            
           try {
            const username = req.params.username
            const Cart = await ShoppingCart.findOne({username : username})
            await ShoppingHistory.create({
                username : username,
                date : Date.now(),
                list : Cart.list
            })
            await ShoppingCart.findOneAndDelete({username : username})

            return res.status(200).json('Purchase done')
           } catch (error) {
            console.log(error)
           }
        
        }

        async changePassword(req,res){
            
            try {
                const username = req.params.username
                const {oldpassword,newpassword} = req.body
                const userFromBd = await User.findOne({username : username})
                const passMatch = bcrypt.compareSync(oldpassword,userFromBd.password)
                if(!passMatch){
                    return res.status(403).json('Wrong password')
                }
                const hashPassword = bcrypt.hashSync(newpassword, 7)
                await User.findOneAndUpdate(
                    {username : username},
                    {password : hashPassword}
                )
                res.status(200).json('password changed')
            } catch (error) {
                console.error();
            }

        }
}


module.exports = new userController()