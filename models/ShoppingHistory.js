const {Schema, model} = require('mongoose')


const ShoppingHistory = new Schema({
    username : {type : String, required : true },
    date : {type : Date},
    list : [{
        product : String,
        quantity : Number
    }]
}) 

module.exports = model('ShoppingHistory', ShoppingHistory)