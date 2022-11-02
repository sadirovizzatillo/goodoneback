const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name:String,
    date: { type: Date, default: Date.now() }
})

const Category = mongoose.model("Category", categorySchema)



exports.Category = Category
exports.categorySchema = categorySchema;
