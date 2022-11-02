const express = require("express")
const { Category } = require("../model/category")
const router = express.Router()
const { Course } = require("../model/course")

router.post("/", async (req, res) => {
    try{
        const category = await Category.findById(req.body.categoryId);
        if(category){
            return res.status(400).send('Berilgan IDga teng bo\'lgan toifa topilmadi.');
        }
        const course = await new Course({
            name: req.body.name,
            tags: [req.body.tags],
            title:req.body.title,
            trainer:req.body.trainer,
            status:req.body.status
            
        });
        course = await course.save()
        
        res.status(201).send(course)
    }catch(err){
        console.log(err)
    }
})

router.get("/", async (req, res) => {
    try{
        const categories = await Course.find().sort("name");
        res.send(categories)
    }catch(err){
        console.log(err)
    }
})

router.get("/:id", async (req, res ) => {
    try{
        const course = await Course.find({ $where: { id: req.params.id } });
        if(!course){
            res.send("Xato id mavjud emas")
        }
        res.send(course)
    }catch(err){
        console.log(err)
    }
})

router.put("/:id", async (req, res) => {
    try{
        const category = await Category.findById(req.body.categoryId)
        
        if(!category){
            res.send("Bunday Id mavjud emas")
        }
        const course = await Course.findByIdAndUpdate(req.params.id,
            { 
                title: req.body.title,
                category: {
                    _id: category._id,
                    name: category.name
                },
                trainer: req.body.trainer,
                tags: req.body.tags,
                status: req.body.status,
            }, { new: true });
            
            res.send(course)
        }catch(err){
            console.log(err)
        }
    })
    router.delete('/:id', async (req, res) => {
        const course = await Course.findByIdAndRemove(req.params.id);
        if (!course) 
        return res.status(404).send('Berilgan IDga teng bo\'lgan kurs topilmadi.');
        
        res.send(course);
    });
    
    
    module.exports = router