const express = require("express")
const { cartModel } = require("../Models/cartModel")
const cartroutes = express.Router()
//get cart by id
cartroutes.get("/get",async(req,res)=>{
    const userID = req.body.userID
    
    try {
       const cart = await cartModel.find({userID})
 if(cart.length>0){
   return res.send(cart)  
 }
 res.send({"msg":"No cart found"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})
//add to cart by id
cartroutes.post("/add",async(req,res)=>{
    const payload = req.body
    try {
        const cart = new cartModel(payload)
        await cart.save()
        res.send({"msg":"Added to Card"})
    } catch (error) {
        req.send({"msg":error.message})
    }
})



//update cart
cartroutes.patch("/update/:id",async(req,res)=>{
    let id = req.params.id
    let payload = req.body
    try {
        
    let update =await cartModel.findByIdAndUpdate({_id:id},payload)
    res.send({"msg":"Update"})
    
    } catch (error) {
     
    }
    })
    
    //delete cart
    
    cartroutes.delete("/delete/:id",async(req,res)=>{
        let id=req.params.id
    try {
        let post = await cartModel.findOneAndDelete({_id:id}) 
        res.send({"msg":"Removed item from cart"})
    } catch (error) {
        res.send(error.massage)      
    }
        
    })

    
module.exports={
    cartroutes
}