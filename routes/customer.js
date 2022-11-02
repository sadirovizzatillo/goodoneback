const express = require("express")

const router = express.Router()
const { Customer } = require("../model/customer")

router.post("/", async (req, res) => {
    try{
        let customer = await new Customer({
            name: req.body.name,
            isVip: req.body.isVip,
            phone:req.body.phone
        });
        customer = await customer.save()
        
        res.send(customer)
        
    }catch(err){
        console.log(err)
    }
})

router.get("/", async (req, res) => {
    try{
        const categories = await Customer.find().sort("name");
        res.send(categories)
    }catch(err){
        console.log(err)
    }
})

router.get("/:id", async (req, res ) => {
    try{
        const customer = await Customer.find({ $where: { id: req.params.id } });
        if(!customer){
            res.send("Xato id mavjud emas")
        }
        res.send(customer)
    }catch(err){
        console.log(err)
    }
})

router.put("/:id", async (req, res) => {
    try{
        const customer = await Customer.find({ $where: { id: req.params.id }})
        if(!customer){
            res.send("Bunday Id mavjud emas")
        }
        customer.name = req.body.name
        
        res.send(customer)
    }catch(err){
        console.log(err)
    }
})


module.exports = router