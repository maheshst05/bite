const mongoose = require("mongoose")

const backlistSchema=  mongoose.Schema({
           token: {
          type: String,
          required: true
        }
      
})

const backlistModel = mongoose.model("baclistedtoken",backlistSchema)

module.exports={
    backlistModel
}