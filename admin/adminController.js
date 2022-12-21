const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

class adminController {

    async addRole(req,res){
        try {
            const {username,roletoadd} = req.body 

            const currenUser = await User.findOne({username : username})
            if(!currenUser){
             return  res.status(400).json(`user ${username} doesn't exists`)
            }

            let counter = 0 
            const acceptableRoles = await Role.find()
            acceptableRoles.forEach(elem => {
                if(elem.value == roletoadd){
                    counter++
                }                
            })
            if(counter === 0){
                return res.status(400).json( `role ${roletoadd} unacceptable` + JSON.stringify(acceptableRoles))
            }

            counter = 0
            currenUser.roles.forEach(elem => {
                if(elem == roletoadd){
                    counter++
                }
            })
            if(counter){
                return res.status(400).json(`this user already have ${roletoadd} role`)
            }

            const isAdded = await User.findOneAndUpdate(
                { username: username }, 
                { $addToSet: { roles: roletoadd } }
            )
            if(isAdded){
                return res.status(200).json(`role ${roletoadd} add to user  ${username}`)
            }
            } catch (error) {
            console.log(error)
        }
    }

    
    async banUser(req,res) {
    
    }

}


module.exports = new adminController()