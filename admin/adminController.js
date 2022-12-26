const User = require('../models/User')
const Role = require('../models/Role')
const Banned = require('../models/Banned')


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
    async banUser(req,res){
        try {
            const username = req.body.username
            
            const currenUser = await User.findOne({username : username})
            if(!currenUser){
             return  res.status(400).json(`user ${username} doesn't exists`)
            }

            if(currenUser.banned){
               
               return res.status(200).json(`user ${username} already banned`)
            }
            await User.findOneAndUpdate(
                {username : username},
                {banned : true}
            )
            await Banned.create({
                username : username,
                banat : Date.now(),
            })
            return res.status(200).json(`user ${username} banned`)

        } catch (error) {
            console.log(error)
        }
        
    }
    async unBanUser(req,res){
        try {
            const username = req.body.username
            
            const currenUser = await User.findOne({username : username})
            if(!currenUser){
             return  res.status(400).json(`user ${username} doesn't exists`)
            }

            if(!currenUser.banned){
               
               return res.status(200).json(`user ${username} already unbanned`)
            }
            await User.findOneAndUpdate(
                {username : username},
                {banned : false}
            )
            await Banned.create({
                username : username,
                unbanat : Date.now()
            }
            )
            return res.status(200).json(`user ${username} unbanned`)

          
        } catch (error) {
            console.log(error)
        }
    }
    async getUsers(req,res){
        try {
            const users = await User.find()
           return res.status(200).json(users)
        } catch (error) {
            console.log(error)
        }
    }    
    async getUserByName(req,res){
        try {

            const name = req.params.username
            const currenUser = await User.findOne({username : name})
            if(!currenUser){
             return  res.status(400).json(`user ${name} doesn't exists`)
            }
            return res.status(200).json(currenUser)

        } catch (error) {
            console.log(error)
        }
        
    }
    
}



module.exports = new adminController()