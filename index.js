const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./auth/authRouter')
const adminRouter = require('./admin/adminRouter')
const managerRouter = require("./manager/managerRouter")

const adminController = require('./admin/adminController')
const authController = require('./auth/authController')
const managerController = require('./manager/managerController')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use("/auth",authRouter)
app.use("/admin",adminRouter)
app.use("/manager",managerRouter)


function start(){

    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
        mongoose.connect('mongodb+srv://admin:admin@cluster0.qxuj7fp.mongodb.net/?retryWrites=true&w=majority')
    } catch (error) {
        console.log(error)
    }
}

start()

