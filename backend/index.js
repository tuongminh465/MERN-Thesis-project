const express = require('express')
const app = express();
const mongoose = require("mongoose")
const dotenv  = require('dotenv').config()
const PORT = 3000;

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

app.use(express.json());

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)

mongoose.connect(process.env.DB_URL)
    .then(() => console.log("DB connection successful"))
    .catch((error) => {
        console.log(error);
    })


app.listen(PORT, () => {
    console.log(`Server is running`)
})