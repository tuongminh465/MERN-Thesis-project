const express = require('express');
const app = express();;
const mongoose = require("mongoose");
const cors = require("cors")

require('dotenv').config();


const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute =  require('./routes/stripe')

app.use(express.json());
app.use(cors())

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.get('/', (req, res) => {
    res.send("Hello guest!")
})

mongoose.connect(process.env.DB_URL)
    .then(() => console.log("DB connection successful"))
    .catch((error) => {
        console.log(error);
    })


app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running`);
})