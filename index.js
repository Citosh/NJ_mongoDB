const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use("/auth",authRouter)


function start(){

    try {
        app.listen(PORT, () => console.log(`server started in port ${PORT}`))
        mongoose.connect('mongodb+srv://admin:admin@cluster0.qxuj7fp.mongodb.net/?retryWrites=true&w=majority')
    } catch (error) {
        console.log(error)
    }
}

start()

