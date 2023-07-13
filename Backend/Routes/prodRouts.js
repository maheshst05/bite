const express = require("express")
const prodRouts = express.Router()
const {prodModel} = require("../Models/prodModels")


//get all products
prodRouts.get("/prod",async(req,res)=>{
    const prods = await prodModel.find()
    res.send(prods)
})

//addd prod
prodRouts.post("/add",async(req,res)=>{
    let payload = req.body
    try {
        let newpost =  new prodModel(payload)
        await newpost.save()
res.send({"msg":"Added"})
    } catch (error) {
        res.send(error.massage)
    }
})


//update prod
prodRouts.patch("/update/:id",async(req,res)=>{
let id = req.params.id
let payload = req.body
try {
    
let update =await prodModel.findByIdAndUpdate({_id:id},payload)
res.send({"msg":"Product updated"})

} catch (error) {
 
}
})

//delete prod

prodRouts.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id
try {
    let post = await prodModel.findOneAndDelete({_id:id}) 
    res.send({"msg":"Delete"})
} catch (error) {
    res.send(error.massage)      
}
    
})
prodRouts.get("/cat",async(req,res)=>{
    const search = req.query.title
try {
    const search = req.query.title
    const projsearch = await prodModel.find({
        category: { $regex: `${search}`, $options: "i" },
    });
    res.send(projsearch);

} catch (error) {
    res.send(error.massage)      
}
    
})
//search by its category

module.exports={
    prodRouts
}