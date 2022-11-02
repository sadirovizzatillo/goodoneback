const mongoose = require("mongoose");
const express = require("express");
const config = require('config');

const app = express()
const categoriesRoute = require("./routes/categories")
const customersRoute = require("./routes/customer")
const courseRoute = require("./routes/courses")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/products")
require("./prod")(app)
var cors = require('cors')

app.use(cors())
// console.log(!config.get('jwtPrivateKey'))
if (!config.get('jwtPrivateKey')) {
  console.error('JIDDIY XATO: virtualdars_jwtPrivateKey muhit o\'zgaruvchisi aniqlanmagan.');
  process.exit(1);
}
mongoose.connect("mongodb://localhost/test-mongodb", { useNewUrlParser: true }).then(() => {
console.log("mongo db ga ulandi")
}).catch((err) => {
    console.error("mongoDb ga ulanish xato", err)
})
// mongoose.set(, false);

app.use(express.json())



app.use("/category", categoriesRoute)
app.use("/product", productRoute)
app.use("/customer", customersRoute)
app.use("/course", courseRoute)
app.use("/user", userRoute)
app.use("/auth", authRoute)

// const bookSchema = mongoose.Schema({
//     name:String,
//     category:String,
//     date:{ type: Date, default: Date.now() },
//     isPublished:Boolean
// })
// const Book = new mongoose.model("Book", bookSchema)




// router.put("/category/:id", async (req, res) => {
//     try{
//         const category = await Category.find({ $where: { id: req.params.id }})
//         if(!category){
//             res.send("Bunday Id mavjud emas")
//         }

//         res.send(category)
//     }catch(err){
//         console.log(err)
//     }
// })




// async function AddData(){
//     const book = new Book({
//         name:"Raqamli Qala",
//         category:"comedy",
//         isPublished:true
//     })
//     const savedBook = await book.save();
//     console.log(savedBook)
// }

// async function FetchData(){
//     // const book = new Book({
//     //     name:"Raqamli Qala",
//     //     category:"comedy",   
//     //     isPublished:true
//     // })

//     const pageSize = 10;
//     const pageNumber = 1
//     const books = await Book.find({
//         // status:"A",
//         isPublished:true
//     })
//     // .or({ qty:{$lte: 50} , item: /.*I*./})
//     // .sort({ quantity: 1})
//     .skip((pageNumber - 1) * pageSize)
//     .limit(pageSize)
//     .select({ category:1, name:1, item:1, qty:1})
//     console.log(books)
// }

// FetchData()



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`${port} portga ulandi`)
})