const User = require('../models/User')

module.exports = async function (req, res, next) {
    if(req.method === "OPTIONS") {
        next()
    } 

    try {
        const name = req.body.username

        const user = await User.findOne({username : name})
        if(user.banned){
            return res.status(403).json({message : `user ${name} was banned`})
        }
        next()

    } catch (error) {
        console.log(error)
    }
}