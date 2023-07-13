const mongoose = require("mongoose")
const cartScheam  = mongoose.Schema({
    prodID:{type:String},
    avtar:{type:String},
    title:{type:String},
    desc:{type:String},
    price:{type:Number},
    Quantity:{type:Number,default:1},
    userID:{type:String,require:true}
})


const cartModel = mongoose.model("cart",cartScheam)

module.exports={
    cartModel
}