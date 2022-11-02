const express = require("express")

const router = express.Router()
const { Product } = require("../model/product")

router.post("/", async (req, res) => {
    try{
        let product = await new Product({
            title: req.body.title,
            cost: req.body.cost,
            weight:req.body.weight,
            sort:req.body.sort,
            category:req.body.category,
            progress: req.body.progress
        });
        product = await product.save()
        
        res.send(product)
        
    }catch(err){
        res.status(404).send(err.message)
    }
})

router.get("/", async (req, res) => {
    try{
        const product = await Product.find().sort("title");
        res.send(product)
    }catch(err){
        res.status(404).send(err.message)
    }
})

router.get("/:id", async (req, res ) => {
    try{
        const product = await Product.find({ $where: { id: req.params.id } });
        if(!product){
            res.send("Xato id mavjud emas")
        }
        res.send(product)
    }catch(err){
        res.status(404).send(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try{
        const product = await Product.find({ $where: { id: req.params.id }})
        if(!product){
            res.send("Bunday Id mavjud emas")
        }
        product.title = req.body.title
        product.cost = req.body.cost
        product.weight = req.body.weight
        product.sort = req.body.sort
        product.category = req.body.category
        product.progress = req.body.progress
        
        res.send(product)
    }catch(err){
        res.status(404).send(err.message)
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const product = await Product.deleteOne({_id: req.params.id})
        if(!product){
            res.send("Bunday Id mavjud emas")
        }
        
        res.send(product)
    }catch(err){
        res.status(404).send(err.message)
    }
})


module.exports = router