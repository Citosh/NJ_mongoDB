const User = require('../models/User')
const Good = require('../models/Goods')
const ShoppingHistory = require('../models/ShoppingHistory')
const { validationResult } = require('express-validator')



class managerController {



    async addProduct(req,res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message : "Validation error", errors})
            }

            const {name,cost,quantity} = req.body
            const products = await Good.find()
            products.forEach(elem => {
                if(elem.name == name){
                    return res.status(400).json(`product ${name} already axist`)
                }
            })
            const isCreated = await Good.create({
                name : name,
                cost : cost,
                quantity : quantity
            })
            if(!isCreated){
                 return res.status(400).json(`cannot create ${name}` )
            }
            return res.status(400).json(`product ${name} added to thw db` )
        } catch (error) {
            console.log(error)
        }
        
    }

    async setQuantity(req,res){

        try {
            const {name,quantity} = req.body
            const isUpdated = await Good.findOneAndUpdate(
                {name : name},
                {quantity : quantity}
            )
            if(!isUpdated){
                return res.status(400).json(`product ${name} does not exists`)
            }
            return res.status(200).json(`quantity of ${name} set on  ${quantity}`)
        } catch (error) {
            console.log(error)
        }
       
    }

    async setCost(req,res){

        try {
            const {name,cost} = req.body
            const isUpdated = await Good.findOneAndUpdate(
                {name : name},
                {cost : cost}
            )
            if(!isUpdated){
                return res.status(400).json(`product ${name} does not exists`)
            }
            
            return res.status(200).json(`cost of ${name} set on  ${cost}`)
        } catch (error) {
            console.log(error)
        }

    }

    async setName(req,res){
        try {
            const {name,nametoset} = req.body
            const isUpdated = await Good.findOneAndUpdate(
                {name : name},
                {name : nametoset}
            )
            if(!isUpdated){
                return res.status(400).json(`product ${name} does not exists`)
            }
            
            return res.status(200).json(`name of ${name} set on  ${nametoset}`)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(req,res){
        try {
            const {name} = req.body 
            const product = await Good.findOne({name : name})
            if(!product){
                return res.status(400).json(`product ${name} does not exists`)
            }
            await Good.findOneAndDelete({name : name})
            return res.status(200).json(`product ${name} deleted successfull`)
        } catch (error) {
            console.log(error)
        }
    }

    async getAllPurchaseHistory(req,res){
        try {
            const history = await ShoppingHistory.find()
            res.json(history)
        } catch (error) {
            
        }
    }

    async getPurchaseHistorybyname(req,res){
        try {
            const {username} = req.body

            const currenUser = await User.findOne({username : username})
            if(!currenUser){
             return  res.status(400).json(`user ${username} doesn't exists`)
            }
            
            const history = await ShoppingHistory.findOne({username : username})
            res.json(history)
        } catch (error) {
            
        } 
    }
}





module.exports = new managerController()