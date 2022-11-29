const router = require('express').Router();
const User = require("../models/User")
const CryptoJS = require('crypto-js')
const jwt = require("jsonwebtoken")

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

    try {
        const savedUser =  await newUser.save()
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/register", async (req, res) => {
    res.send('This is the register page')
})

//Login
router.get("/login", async (req, res) => {
    res.send('This is the login page')
})

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(401).json("Incorrect username or password!");
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_KEY
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== req.body.password) {
      res.status(401).json("Incorrect username or password!");
      return;
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      {expiresIn:"3h"}
    );

    const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken});

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;