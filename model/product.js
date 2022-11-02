const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    cost:{
        required:true,
        type:Number
    },
    weight:{
        required:true,
        type:Number
    },
    sort:{
        required:true,
        type:String
    },
    category:{
        required:true,
        type:String
    },
    progress:{
        required:true,
        type:Number
    },
})

const Product = mongoose.model("Product", productSchema)

exports.Product = Product