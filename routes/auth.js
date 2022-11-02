const express = require("express")
const { User } = require("../model/users")
const router = express.Router()



router.post("/", async(req, res) => {
    try{
        let user = await User.findOne({ email: req.body.email })
        
        if(!user){  
            res.status(404).send("Mavjud bo'lmagan foydalanuchi")
        }

        const validPass = await req.body.password == user.password
        console.log(validPass)
        if(validPass === false){
            res.status(404).send("Parol no'tog'ri")
        }
        const token = user.generateAuthToken()
        res.header('x-auth-token', token).send(user)
    }catch(err){
        console.log(err)
    }
})

module.exports = router