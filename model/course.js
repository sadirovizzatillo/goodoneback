const mongoose = require("mongoose")
const { categorySchema } = require("./category")
const courseSchema = new mongoose.Schema({
    name:String,
    tags:[String],
    title:String,
    trainer:String,
    status:{
        type:String,
        enum: ["Active", "InActive"],
        required:true
    },
    category:{
        type:categorySchema,
        required:true
    },
    date: { type: Date, default: Date.now() }
})

const Course = mongoose.model("Course", courseSchema)



exports.Course = Course