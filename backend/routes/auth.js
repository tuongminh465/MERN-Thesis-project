const router = require('express').Router();
const User = require("../models/User")
const CryptoJS = require('crypto-js')

//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_KEY,
        )
        .toString(),
    })

    // res.status(200).json(newUser)
    
    try {
        const saveUser =  await newUser.save()
        res.status(201).json(saveUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;