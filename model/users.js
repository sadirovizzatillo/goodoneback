const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const config = require("config")
const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:{
        type:Number,
        required:true
    },
    date: { type: Date, default: Date.now() },
    
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id}, config.get("jwtPrivateKey"))
    return token
}


const User = mongoose.model("User", userSchema)

exports.User = User