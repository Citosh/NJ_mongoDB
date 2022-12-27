const {Schema, model} = require('mongoose')


const ShoppingCart = new Schema({
    username : {type : String, unique: true, required : true },
    list : [{
        product : String,
        quantity : Number
    }]
}) 

module.exports = model('ShoppingCart', ShoppingCart)