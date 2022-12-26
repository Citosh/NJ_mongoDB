const {Schema, model} = require('mongoose')


const Good = new Schema({
    name : {type : String, unique: true, required : true },
    cost : {type : String, required : true },
    quantity : {type : Number, default : 0 },
}) 

module.exports = model('Good', Good)