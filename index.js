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
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Izzatillo:<password>@cluster0.csxvtdd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
require("./prod")(app)
var cors = require('cors')

app.use(cors())
// console.log(!config.get('jwtPrivateKey'))
if (!config.get('jwtPrivateKey')) {
  console.error('JIDDIY XATO: virtualdars_jwtPrivateKey muhit o\'zgaruvchisi aniqlanmagan.');
  process.exit(1);
}
// mongoose.connect("mongodb://localhost/test-mongodb", { useNewUrlParser: true }).then(() => {
// console.log("mongo db ga ulandi")
// }).catch((err) => {
//     console.error("mongoDb ga ulanish xato", err)
// })
// mongoose.set(, false);

app.use(express.json())



app.use("/category", categoriesRoute)
app.use("/product", productRoute)
app.use("/customer", customersRoute)
app.use("/course", courseRoute)
app.use("/user", userRoute)
app.use("/auth", authRoute)
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`${port} portga ulandi`)
})




