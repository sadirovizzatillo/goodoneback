const express = require("express")

const router = express.Router()
const { Category } = require("../model/category")


router.post("/", async (req, res) => {
    try{
        const category = await new Category({
            name: req.body.name
        });
        category = await category.save()
        
        res.status(201).send(category)
    }catch(err){
        console.log(err)
    }
})

router.get("/", async (req, res) => {
    try{
        const categories = await Category.find();
        res.send(categories)
    }catch(err){
        console.log(err)
    }
})

router.get("/:id", async (req, res ) => {
    try{
        const category = await Category.find({ $where: { id: req.params.id } });
        if(!category){
            res.send("Xato id mavjud emas")
        }
        res.send(category)
    }catch(err){
        console.log(err)
    }
})

router.put("/:id", async (req, res) => {
    try{
        const category = await Category.find({ $where: { id: req.params.id }})
        if(!category){
            res.send("Bunday Id mavjud emas")
        }
        category.name = req.body.name
        
        res.send(category)
    }catch(err){
        console.log(err)
    }
})


module.exports = router