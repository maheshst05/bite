const mongoose = require("mongoose")
const prodSchema = mongoose.Schema({
    avtar:{type:String},
    title:{type:String},
    decs:{type:String},
    category:{type:String},
    price:{type:Number},
    Qyt:{type:Number}
})

const prodModel = mongoose.model("product",prodSchema)

module.exports={
    prodModel
}