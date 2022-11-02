const express = require("express")
const _ = require("lodash")
// const bcrypt = require("bcrypt")
const router = express.Router()
const { User } = require("../model/users")

router.post("/", async (req, res) => {
    try{
        let user = await new User(_.pick(req.body, ['name', 'email', 'password']));
        
        // let hashedPassword = await bcrypt.genSalt()
        // user.password = await bcrypt.hash(user.password, hashedPassword)
        await user.save()
        res.send(_.pick(user, ['_id','name', 'email']))
    }catch(err){
        res.status(404).send(err)
    }
})

router.get("/", async (req, res) => {
    try{
        const user = await User.find().sort("name");
        res.send(user)
    }catch(err){
        console.log(err)
    }
})

router.get("/:id", async (req, res ) => {
    try{
        const user = await User.find({ $where: { id: req.params.id } });
        if(!user){
            res.send("Xato id mavjud emas")
        }
        res.send(user)
    }catch(err){
        console.log(err)
    }
})

router.put("/:id", async (req, res) => {
    try{
        let user = await User.find({ $where: { id: req.params.id }})
        if(!user){
            res.send("Bunday Id mavjud emas")
        }
        user.name = req.body.name
        
        res.send(user)
    }catch(err){
        console.log(err)
    }
})


module.exports = router