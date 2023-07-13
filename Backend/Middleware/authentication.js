const jwt = require("jsonwebtoken")
const{backlistModel}= require("../Models/backlistingtoken")
// const{userModel}= require("../model/userModel")
require('dotenv').config()

const authentication =async(req,res,next)=>{
try {
     const  AccessToken = req.headers.as
//console.log(AccessToken)
    const baclistedtoken = await backlistModel.findOne({token:AccessToken})
if(baclistedtoken){
       return res.send({"msg":"you are logged out please login again"})
   }

   if(AccessToken){
        jwt.verify(AccessToken,process.env.accessKey,async(err,decode)=>{
if(decode){

// const id = decode.userID
// const user = await userModel.findOne({_id:id})
// const role =user.role
// req.role = role
//console.log(r)
req.body.userID =decode.userID
let u =  decode.userID

next()
}else{
    res.send({"msg":"“It seems you're not logged in. Please login to continue using charts” while opening a Chart on bite?"})
}
     })
    }else{
        res.send({"msg":"plz login"})
    }


     } catch (error) {
        res.send(error.message)
     }


}

module.exports={
    authentication
}