const {Schema, model} = require('mongoose')


const Banned = new Schema({
    username : {type : String, required : true },
    banat : {type : Date },
    unbanat : [{type : Date,default : false}]
}) 

module.exports = model('Banned', Banned)