const express = require("express")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT
const connection = require("./config/db")
const userRouter = require("./routes/user.route")
const productRouter = require("./routes/product.route")
const cartRouter = require('./routes/cart.route')
const cors = require("cors")
const shareRouter = require("./routes/share.route")

const server = express()
server.use(express.json())
server.use(cors())
server.use('/users',userRouter)
server.use('/products',productRouter)
server.use('/carts',cartRouter)
server.use('/share',shareRouter) 

server.get('/', (req,res)=>{
    try {
        res.status(200).send({message: "Health Checkup is fine!"})
    } catch (error) {
        console.log(error)  
        res.status(400).send({error})
    }
})

server.listen(PORT, async(req,res)=>{
    try {
        await connection
        console.log(`server is running at port ${PORT} , db also connected...`)
    } catch (error) {
        console.log(error)
    }
})