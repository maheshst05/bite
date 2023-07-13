const express = require("express")
const userRoutes = express.Router()
const{userModel}= require("../Models/userModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const{backlistModel}= require("../Models/backlistingtoken")

const{authentication} = require("../Middleware/authentication") 
require("dotenv").config()

//registration
userRoutes.post("/signup",async(req,res)=>{
const {name,mobile,email,password,role} = req.body;
try {
//check user is already present or not
    const user = await userModel.find({email})

    if(user.length>0){
            
        res.send({"msg":"user is already exist plz login.."})
   }
   else{
   bcrypt.hash(password, 5,async function(err, hash) {
        // Store hash in your password DB.
        const newuser = new userModel({name,email,mobile,password:hash,role}) 
        await newuser.save()
       res.send({"msg":"reg sucessfully done."})
    }); 
   }
} catch (error) {
    res.send({"error":error.message})
}
})



//login

userRoutes.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
const user = await userModel.find({email})

if(user.length>0){
    //console.log(user[0]._id)
    bcrypt.compare(password, user[0].password, function(err, result) {
        if(result){
        //normal token
        const accessToken = jwt.sign({ userID: user[0]._id}, process.env.accessKey,{
            expiresIn:100000 * 60
        });
        

        //refresh token
        const refreshToken = jwt.sign({ userID: user[0]._id}, process.env.refreshtokenkey,{
            expiresIn:100000 * 60 
        });

    // store these tokens
    // // cookies set a cookie
    res.cookie("AccessToken", accessToken, { maxAge: 100000 * 60,
        httpOnly: true                          
});
     res.cookie("RefreshToken", refreshToken, { maxAge: 500000 * 60 });
    
    res.send({"msg":"login suceesfully","token":accessToken,"user":user});
//console.log(res.cookie)
// console.log(req.cookies.AccessToken);
    
        } 
        else {res.send({"msg":"Wrong creadiancial"})}
        });
}
else{
    res.send({"msg":"user not found"})
}
        
    } catch (error) {
        res.send(error.message)
    }
})


//get user
userRoutes.get("/",async(req,res)=>{

try {
  const users = await userModel.find()
  res.send(users)

} catch (error) {
  res.send(error.message)
}

})

//detele user
userRoutes.delete("/delete/:id",async(req,res)=>{
    try {
let id = req.params.id

const usera = await userModel.findOneAndDelete({_id:id})
    res.send({"msg":"user has been successfully Delete"})
    
    } catch (error) {
        res.send(error.message)
    }
    
    })
//search by name
userRoutes.get("/search",async(req,res)=>{
    const search = req.query.name
    try {
        const usersearch = await userModel.find({
            name: { $regex: `${search}`, $options: "i" },
        });
        res.send(usersearch)
} catch (error) {
  res.send(error.message)
}

})


//logout
userRoutes.get("/logout",authentication,async(req,res)=>{
    try {
      const { AccessToken } = req.cookies;
    
       // console.log({token})
    const backlitedtoken = new backlistModel({token:AccessToken})
    await backlitedtoken.save()
    res.send({"msg":"logout successfully"})
    
    } catch (error) {
        res.send(error.message)
    }
    
    })
module.exports={
    userRoutes
}