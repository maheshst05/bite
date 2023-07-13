const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json())
app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
const cors = require("cors")
app.use(cors())
const{connection} = require("./db")  
const{userRoutes}  =require("./Routes/userRoutes")
const{prodRouts} = require("./Routes/prodRouts")
const{cartroutes} =  require("./Routes/cartRoutes")
const{authentication} =  require("./Middleware/authentication")
app.use("/user",userRoutes)
app.use("/prod",prodRouts)
app.use("/cart",authentication,cartroutes)


app.get("/",async(req,res)=>{
    res.send("welcome")
})





//server
app.listen(9090,async()=>{
    await connection
console.log("connect to Db")
    console.log("server is runing..")
})