const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name:String,
    isVip:Boolean,
    phone:Number,
    date: { type: Date, default: Date.now() }
})

const Customer = mongoose.model("Customer", customerSchema)

exports.Customer = Customer